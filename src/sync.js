// ---------- Synchronisation en ligne (Firestore) ----------
// Le site utilise un espace séparé (collection « aseps ») dans le projet Firebase d'EPS Pro.
// Les données d'EPS Pro (collection « profs ») ne sont jamais lues ni modifiées.
//
// Organisation de la collection « aseps » :
//   accueil      → page d'accueil
//   liens        → liens externes
//   documents    → documents à télécharger
//   index        → liste ordonnée des identifiants de rubriques
//   rub_<id>     → une rubrique (avec sa page), un document par rubrique
//   migrations   → mises à jour de contenu déjà appliquées en ligne (v1.3.0)
//   art_<id>     → une publication (v1.8.0 : Résultats sportifs, Vie de l'AS…), un document par
//                  publication pour que deux collègues puissent publier en même temps
// Chaque document contient { json: "<données en JSON>", maj: <date> } :
// le JSON en texte évite les limites de Firestore sur les tableaux imbriqués.
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, onSnapshot, writeBatch, setDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAh2sS6lbXv1S_70fGqkTQXt8qjS-xl8hc",
  authDomain: "eps-pro-1460c.firebaseapp.com",
  projectId: "eps-pro-1460c",
  storageBucket: "eps-pro-1460c.firebasestorage.app",
  messagingSenderId: "651231276995",
  appId: "1:651231276995:web:9a0a4bee757ffe4d6a1776",
};

const COLLECTION = "aseps";
const TAILLE_MAX = 950000; // un document Firestore est limité à ~1 Mo

let db = null;
try {
  const app = initializeApp(firebaseConfig, "aseps");
  db = getFirestore(app);
} catch (e) {
  console.warn("Firebase indisponible", e);
  db = null;
}

export const syncDisponible = () => !!db;

// Ce qui a été envoyé (ou reçu) en dernier, pour n'écrire que ce qui a changé
const dernier = new Map();

// Écoute les données en ligne. rappel({ existe, rubriques, pageAccueil, liens, documents }) ; erreur(e)
export function ecouterSite(rappel, erreur) {
  if (!db) return () => {};
  return onSnapshot(
    collection(db, COLLECTION),
    (snap) => {
      if (snap.metadata.hasPendingWrites) return; // nos propres écritures, déjà affichées
      const docs = {};
      snap.forEach((d) => {
        const data = d.data();
        docs[d.id] = data.json;
        dernier.set(d.id, data.json);
      });
      const articles = [];
      Object.keys(docs).filter((k) => k.startsWith("art_")).forEach((k) => { try { articles.push(JSON.parse(docs[k])); } catch {} });
      if (!docs.index) {
        rappel({ existe: false, acces: docs.acces ? JSON.parse(docs.acces) : null, articles });
        return;
      }
      try {
        const ids = JSON.parse(docs.index);
        const rubriques = ids.filter((id) => docs["rub_" + id]).map((id) => JSON.parse(docs["rub_" + id]));
        rappel({
          existe: true,
          acces: docs.acces ? JSON.parse(docs.acces) : null,
          rubriques,
          pageAccueil: docs.accueil ? JSON.parse(docs.accueil) : null,
          liens: docs.liens ? JSON.parse(docs.liens) : null,
          documents: docs.documents ? JSON.parse(docs.documents) : null,
          migrations: docs.migrations ? JSON.parse(docs.migrations) : null,
          articles,
        });
      } catch (e) {
        erreur && erreur(e);
      }
    },
    (e) => erreur && erreur(e)
  );
}

// Envoie l'état du site ; seules les parties modifiées sont écrites.
// force = true : tout réécrire (première publication ou « republier depuis cet appareil »).
export async function publierSite({ rubriques, pageAccueil, liens, documents }, force = false) {
  if (!db) throw new Error("Connexion à la base en ligne impossible.");
  const maj = Date.now();
  const voulu = new Map();
  voulu.set("accueil", JSON.stringify(pageAccueil));
  voulu.set("liens", JSON.stringify(liens));
  voulu.set("documents", JSON.stringify(documents));
  rubriques.forEach((r) => voulu.set("rub_" + r.id, JSON.stringify(r)));
  voulu.set("index", JSON.stringify(rubriques.map((r) => r.id)));

  const trop = [...voulu].filter(([, v]) => v.length > TAILLE_MAX).map(([k]) => k);
  if (trop.length) {
    const noms = trop.map((k) => (k.startsWith("rub_") ? "rubrique « " + (rubriques.find((r) => "rub_" + r.id === k)?.titre || k) + " »" : k));
    throw new Error("Trop de photos/vidéos importées dans : " + noms.join(", ") + ". Retire des fichiers importés ou remplace-les par des liens (URL).");
  }

  const batch = writeBatch(db);
  let n = 0;
  voulu.forEach((json, id) => {
    if (force || dernier.get(id) !== json) {
      batch.set(doc(db, COLLECTION, id), { json, maj });
      n++;
    }
  });
  // rubriques supprimées
  [...dernier.keys()].filter((id) => id.startsWith("rub_") && !voulu.has(id)).forEach((id) => {
    batch.delete(doc(db, COLLECTION, id));
    n++;
  });
  if (n === 0) return 0;
  await batch.commit();
  voulu.forEach((json, id) => dernier.set(id, json));
  [...dernier.keys()].filter((id) => id.startsWith("rub_") && !voulu.has(id)).forEach((id) => dernier.delete(id));
  return n;
}

// Marqueur des mises à jour de contenu déjà appliquées à la version en ligne (« aseps/migrations »)
export async function ecrireMigrations(migrations) {
  if (!db) throw new Error("Connexion à la base en ligne impossible.");
  const json = JSON.stringify(migrations);
  await writeBatch(db).set(doc(db, COLLECTION, "migrations"), { json, maj: Date.now() }).commit();
  dernier.set("migrations", json);
}

// Codes d'accès (administrateur + collègues), enregistrés à part dans « aseps/acces ».
// Les codes ne sont jamais stockés en clair : seule leur empreinte (SHA-256) est enregistrée.
export async function ecrireAcces(acces) {
  if (!db) throw new Error("Connexion à la base en ligne impossible.");
  const json = JSON.stringify(acces);
  await writeBatch(db).set(doc(db, COLLECTION, "acces"), { json, maj: Date.now() }).commit();
  dernier.set("acces", json);
}

export async function empreintePin(pin) {
  const donnees = new TextEncoder().encode("aseps-brassens:" + pin);
  const h = await crypto.subtle.digest("SHA-256", donnees);
  return Array.from(new Uint8Array(h)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ---------- Publications (v1.8.0) : écrites une par une, directement ----------
export async function enregistrerArticle(article) {
  if (!db) throw new Error("Connexion à la base en ligne impossible.");
  const json = JSON.stringify(article);
  if (json.length > TAILLE_MAX) throw new Error("Cette publication est trop lourde (photos importées sans connexion au service d'images). Retire quelques photos puis recommence.");
  await setDoc(doc(db, COLLECTION, "art_" + article.id), { json, maj: Date.now() });
  dernier.set("art_" + article.id, json);
}
export async function supprimerArticleEnLigne(id) {
  if (!db) throw new Error("Connexion à la base en ligne impossible.");
  await deleteDoc(doc(db, COLLECTION, "art_" + id));
  dernier.delete("art_" + id);
}

// ---------- Max Pro (v1.9.0) : challenges et classements publiés par l'appli Max Pro ----------
// Max Pro écrit lui-même le document « aseps/maxpro » (pseudos uniquement) quand un professeur
// est connecté ; le site se contente de le lire. rappel(donnees | null)
export function ecouterMaxPro(rappel) {
  if (!db) { rappel(null); return () => {}; }
  return onSnapshot(
    doc(db, COLLECTION, "maxpro"),
    (snap) => {
      if (!snap.exists()) { rappel(null); return; }
      try {
        const d = snap.data();
        rappel({ ...JSON.parse(d.json), maj: d.maj || null });
      } catch (e) {
        rappel(null);
      }
    },
    () => rappel(null)
  );
}
