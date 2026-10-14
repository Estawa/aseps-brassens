import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Home, LayoutList, FolderOpen, Lock, Unlock, Plus, Trash2, Pencil,
  ChevronUp, ChevronDown, ChevronRight, ExternalLink, Image as ImageIcon,
  Video, FileText, Upload, X, Link2, ArrowLeft, Menu, Images, Type, LayoutTemplate, GripVertical, LayoutGrid,
  ChevronLeft, Copy, Undo2, Monitor, Smartphone, Check, Square, BookOpen,
} from "lucide-react";
import { COURS, BlocCours, blocsCoursPourPage } from "./cours.jsx";

const uid = () => Math.random().toString(36).slice(2, 10);
const APP_VERSION = "0.6.0";

// ---------- Stockage local persistant ----------
function lsLire(cle, defaut) {
  try {
    const v = localStorage.getItem("aseps_" + cle);
    return v ? JSON.parse(v) : defaut;
  } catch {
    return defaut;
  }
}
function lsEcrire(cle, valeur) {
  try {
    localStorage.setItem("aseps_" + cle, JSON.stringify(valeur));
  } catch (e) {
    console.warn("Stockage local plein ou indisponible", e);
    alert("⚠️ La mémoire du navigateur est pleine : la dernière modification n'a pas pu être enregistrée.\n\nAstuce : supprime des photos/vidéos importées ou utilise plutôt des liens (URL).");
  }
}

function lireDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
// Les photos importées sont réduites (1600 px max, JPEG) pour ne pas saturer la mémoire du navigateur.
async function fichierVersDataUrl(file) {
  const dataUrl = await lireDataUrl(file);
  if (!file.type || !file.type.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") return dataUrl;
  if (file.type === "image/png" && file.size < 300000) return dataUrl; // petits PNG (logos) : transparence conservée
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = dataUrl;
    });
    const max = 1600;
    const ratio = Math.min(1, max / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * ratio);
    canvas.height = Math.round(img.height * ratio);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const compresse = canvas.toDataURL("image/jpeg", 0.82);
    return compresse.length < dataUrl.length ? compresse : dataUrl;
  } catch (e) {
    return dataUrl;
  }
}
function estFonce(couleur) {
  if (!couleur) return true;
  const hex = couleur.replace("#", "");
  if (hex.length !== 6) return true;
  const r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 140;
}

// ---------- Données de départ ----------
function blocTexte(texte) { return { id: uid(), type: "texte", texte }; }
function blocLiens(liens) { return { id: uid(), type: "liens", liens: liens.map((l) => ({ id: uid(), ...l })) }; }

const PAGE_ACCUEIL_SEED = {
  blocs: [
    {
      id: uid(), type: "bandeau", fondType: "couleur", fondCouleur: "#101826", fondImage: "", diaporamaImages: [],
      titre: "L'EPS au lycée Georges-Brassens",
      texte: "Ressources d'enseignement, actualités de l'Association Sportive et documents utiles, rassemblés par l'équipe EPS.",
    },
  ],
};

// Rubrique « Association Sportive du Lycée » (textes de départ à compléter depuis l'éditeur)
const SEED_AS = [
  {
    id: "as", titre: "Association Sportive du Lycée", parentId: null, ordre: 7,
    page: { blocs: [blocTexte("L'Association Sportive (AS) du lycée Georges-Brassens permet aux élèves de pratiquer des activités sportives en dehors des cours d'EPS, de participer aux compétitions UNSS et de représenter le lycée. Retrouve ici les informations pratiques, les résultats de nos équipes et les photos des rencontres.")] },
  },
  { id: "as-presentation", titre: "Présentation et inscriptions", parentId: "as", ordre: 0, page: { blocs: [blocTexte("Activités proposées, horaires des entraînements, enseignants responsables et modalités d'inscription (licence UNSS) : informations à compléter.")] } },
  { id: "as-resultats", titre: "Résultats sportifs", parentId: "as", ordre: 1, page: { blocs: [blocTexte("Les résultats de nos équipes et de nos élèves en compétitions UNSS (district, départemental, académique, France) seront publiés ici au fil de l'année.")] } },
  { id: "as-photos", titre: "Photos et vidéos", parentId: "as", ordre: 2, page: { blocs: [blocTexte("Les photos et vidéos des entraînements, rencontres et compétitions de l'AS.")] } },
];

const SEED_RUBRIQUES = [
  { id: "musculation", titre: "Musculation", parentId: null, ordre: 0, page: { blocs: [] } },
  { id: "musculation-chezsoi", titre: "Muscu chez soi", parentId: "musculation", ordre: 0, page: { blocs: [blocTexte("Séances de musculation à réaliser à la maison, sans matériel.")] } },
  { id: "musculation-hiit", titre: "Entraînement HIIT", parentId: "musculation", ordre: 1, page: { blocs: [blocTexte("Séances d'entraînement fractionné à haute intensité.")] } },
  { id: "musculation-jeu", titre: "Jeu de l'Oie", parentId: "musculation", ordre: 2, page: { blocs: [blocTexte("Version ludique d'une séance de musculation.")] } },
  { id: "musculation-theorie", titre: "Théorie", parentId: "musculation", ordre: 3, page: { blocs: [blocTexte("Les notions théoriques à connaître pour construire ton projet d'entraînement. Clique sur une partie pour l'ouvrir."), ...blocsCoursPourPage("musculation-theorie", uid)] } },
  { id: "course-duree", titre: "Course de durée", parentId: null, ordre: 1, page: { blocs: [] } },
  { id: "course-duree-theorie", titre: "Théorie", parentId: "course-duree", ordre: 0, page: { blocs: [blocTexte("Les notions théoriques pour comprendre comment le corps produit l'énergie, calculer tes allures et construire ton projet de course. Clique sur une partie pour l'ouvrir."), ...blocsCoursPourPage("course-duree-theorie", uid)] } },
  { id: "escalade", titre: "Escalade", parentId: null, ordre: 2, page: { blocs: [] } },
  { id: "escalade-theorie", titre: "Théorie", parentId: "escalade", ordre: 0, page: { blocs: [blocTexte("Sécurité, matériel, nœuds, assurage, technique et lecture de voie : tout ce qu'il faut savoir pour grimper et assurer en sécurité. Clique sur une partie pour l'ouvrir."), ...blocsCoursPourPage("escalade-theorie", uid)] } },
  { id: "escalade-evaluation", titre: "Évaluation et tableau de performance", parentId: "escalade", ordre: 1, page: { blocs: [blocTexte("Comment tu es évalué en escalade et comment lire le tableau de performance."), ...blocsCoursPourPage("escalade-evaluation", uid)] } },
  { id: "volley", titre: "Volley-ball", parentId: null, ordre: 3, page: { blocs: [] } },
  { id: "volley-theorie", titre: "Théorie", parentId: "volley", ordre: 0, page: { blocs: [blocTexte("Le volley-ball en 4 contre 4 sur un terrain de 7 m × 7 m par camp : ce qu'on attend en Terminale, le règlement, la technique, les rôles et la tactique. Clique sur une partie pour l'ouvrir."), ...blocsCoursPourPage("volley-theorie", uid)] } },
  { id: "volley-evaluation", titre: "Évaluation de fin de cycle", parentId: "volley", ordre: 1, page: { blocs: [blocTexte("Comment se déroule et se note l'épreuve de volley-ball au bac (champ d'apprentissage 4)."), ...blocsCoursPourPage("volley-evaluation", uid)] } },
  { id: "badminton", titre: "Badminton", parentId: null, ordre: 4, page: { blocs: [] } },
  { id: "badminton-theorie", titre: "Théorie", parentId: "badminton", ordre: 0, page: { blocs: [blocTexte("Le badminton en simple : ce qu'on attend en Terminale, le règlement, les frappes, les déplacements et la tactique. Clique sur une partie pour l'ouvrir."), ...blocsCoursPourPage("badminton-theorie", uid)] } },
  { id: "badminton-evaluation", titre: "Évaluation de fin de cycle", parentId: "badminton", ordre: 1, page: { blocs: [blocTexte("Comment se déroule et se note l'épreuve de badminton au bac (champ d'apprentissage 4)."), ...blocsCoursPourPage("badminton-evaluation", uid)] } },
  { id: "sopra", titre: "Sopra Flashmob", parentId: null, ordre: 5, page: { blocs: [] } },
  {
    id: "sopra-flashmob", titre: "En mode flashmob", parentId: "sopra", ordre: 0,
    page: { blocs: [blocTexte("Chorégraphie collective sur Sopra."), blocLiens([{ label: "Playlist Chorés (YouTube)", url: "https://www.youtube.com/playlist?list=PL7ZFD8B4khX1Iw7hNSVHNJPJZM8U9A4BY" }])] },
  },
  { id: "sportsante", titre: "Sport & Santé", parentId: null, ordre: 6, page: { blocs: [] } },
  { id: "sportsante-alim", titre: "L'alimentation", parentId: "sportsante", ordre: 0, page: { blocs: [blocTexte("Repères sur l'alimentation du sportif. Clique sur une partie pour l'ouvrir."), ...blocsCoursPourPage("sportsante-alim", uid)] } },
  { id: "echauffement", titre: "L'échauffement", parentId: "sportsante", ordre: 1, page: { blocs: [blocTexte("Comment s'échauffer correctement selon l'activité pratiquée. Commence par les principes communs, puis ouvre la partie de ton activité."), ...blocsCoursPourPage("echauffement", uid)] } },
  ...SEED_AS,
];

const SEED_LIENS = [
  { id: uid(), label: "YouTube ASEPS", url: "https://www.youtube.com/channel/UCR3ucMg6p3Z2CmQjc-Ccevw/" },
  { id: uid(), label: "Site du lycée", url: "http://www.lyc-brassens-courcouronnes.ac-versailles.fr/" },
  { id: uid(), label: "Pronote", url: "http://pronote.lycee-brassens.dyndns.org/" },
  { id: uid(), label: "EPS académie", url: "http://eps.ac-versailles.fr/" },
];

// ---------- Petits utilitaires ----------
function construireArbre(rubriques) {
  const racines = rubriques.filter((r) => !r.parentId).sort((a, b) => a.ordre - b.ordre);
  return racines.map((r) => ({
    ...r,
    enfants: rubriques.filter((e) => e.parentId === r.id).sort((a, b) => a.ordre - b.ordre),
  }));
}

// ---------- Diaporama (photos défilantes) ----------
function Diaporama({ images, vitesse = 4, style, fondu = true }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!images || images.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % images.length), Math.max(1.5, vitesse) * 1000);
    return () => clearInterval(t);
  }, [images, vitesse]);
  if (!images || images.length === 0) return null;
  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }}>
      {images.map((img, idx) => (
        <img
          key={img.id || idx}
          src={img.url}
          alt={img.legende || ""}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: idx === i ? 1 : 0, transition: fondu ? "opacity 0.9s ease" : "none",
          }}
        />
      ))}
    </div>
  );
}

// ---------- Mise en page : grille de 12 colonnes ----------
// Chaque bloc porte sa propre mise en page :
//   largeur : nombre de colonnes occupées sur 12 (ordinateur/tablette) — 12 = pleine largeur
//   alignV  : "haut" | "milieu" | "bas" (alignement vertical dans sa ligne)
// Sur téléphone, tous les blocs passent automatiquement en pleine largeur, dans l'ordre.
const LARGEURS = [
  { v: 3, l: "¼" }, { v: 4, l: "⅓" }, { v: 6, l: "½" }, { v: 8, l: "⅔" }, { v: 9, l: "¾" }, { v: 12, l: "Plein" },
];
function libelleLargeur(n) {
  const p = LARGEURS.find((x) => x.v === n);
  return p ? p.l : `${n}/12`;
}
const ALIGN_SELF = { haut: "start", milieu: "center", bas: "end" };
// Largeur sur téléphone : pleine (12), moitié (6) ou tiers (4) de l'écran
const LARGEURS_MOBILE = [{ v: 12, l: "Plein" }, { v: 6, l: "½" }, { v: 4, l: "⅓" }, { v: 3, l: "¼" }];
function libelleLargeurMobile(n) {
  const p = LARGEURS_MOBILE.find((x) => x.v === n);
  return p ? p.l : "Plein";
}

// ---------- Galerie photos : grille (photos réduites) ou défilement horizontal ----------
function Galerie({ bloc, edition }) {
  const [ouverte, setOuverte] = useState(null); // index de la photo affichée en grand
  const images = bloc.images || [];
  const uniforme = (bloc.recadrage || "uniforme") === "uniforme";
  const classe = (bloc.affichage === "defilement" ? "galerie-defil" : "galerie-grille");
  return (
    <>
      <div className={classe} style={{ "--n-o": bloc.parLigneOrdi || 4, "--n-t": bloc.parLigneTel || 2 }}>
        {images.map((img, i) => (
          <figure key={img.id || i} className="galerie-item" onClick={() => !edition && setOuverte(i)}>
            <img src={img.url} alt={img.legende || ""} loading="lazy" style={{ width: "100%", display: "block", borderRadius: 10, border: "1px solid var(--ligne)", aspectRatio: uniforme ? "4 / 3" : "auto", objectFit: "cover", background: "#eee" }} />
            {img.legende && <figcaption style={{ fontSize: 11, color: "#6b6656", marginTop: 4, lineHeight: 1.3 }}>{img.legende}</figcaption>}
          </figure>
        ))}
      </div>
      {ouverte !== null && images[ouverte] && (
        <div onClick={() => setOuverte(null)} style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(10,14,22,0.92)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <img src={images[ouverte].url} alt={images[ouverte].legende || ""} style={{ maxWidth: "100%", maxHeight: "82vh", borderRadius: 8, objectFit: "contain" }} />
          {images[ouverte].legende && <div style={{ color: "#fff", fontSize: 13, marginTop: 10, textAlign: "center" }}>{images[ouverte].legende}</div>}
          <div style={{ display: "flex", gap: 10, marginTop: 14 }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOuverte((ouverte - 1 + images.length) % images.length)} style={{ ...iconBtn, width: 44, height: 40 }}><ChevronLeft size={18} /></button>
            <span style={{ color: "#fff", fontSize: 13, alignSelf: "center", minWidth: 50, textAlign: "center" }}>{ouverte + 1} / {images.length}</span>
            <button onClick={() => setOuverte((ouverte + 1) % images.length)} style={{ ...iconBtn, width: 44, height: 40 }}><ChevronRight size={18} /></button>
            <button onClick={() => setOuverte(null)} style={{ ...iconBtn, width: 44, height: 40 }}><X size={18} /></button>
          </div>
        </div>
      )}
    </>
  );
}

function RenduBlocs({ blocs }) {
  return (
    <div className="grille">
      {(blocs || []).map((b) => (
        <div
          key={b.id}
          className={"cellule" + (b.type === "espace" ? " espace-bloc" : "")}
          style={{ "--span": b.largeur || 12, "--span-m": b.largeurMobile || 12, alignSelf: ALIGN_SELF[b.alignV] || "stretch" }}
        >
          <RenduBloc bloc={b} />
        </div>
      ))}
    </div>
  );
}

function VideEdition({ texte }) {
  return (
    <div style={{ border: "2px dashed #d8d3c6", borderRadius: 12, padding: "22px 14px", textAlign: "center", color: "#9a9384", fontSize: 12.5, fontStyle: "italic", background: "rgba(255,255,255,0.6)" }}>
      {texte}
    </div>
  );
}

function RenduBloc({ bloc, edition = false }) {
  if (bloc.type === "bandeau") {
    const fondImg = bloc.fondType === "image" && bloc.fondImage ? bloc.fondImage : null;
    const clair = !estFonce(bloc.fondType === "couleur" ? bloc.fondCouleur : "#101826");
    return (
      <div style={{ position: "relative", minHeight: 200, height: "100%", display: "flex", alignItems: "flex-end", overflow: "hidden", borderRadius: 14, background: bloc.fondType === "couleur" ? (bloc.fondCouleur || "#101826") : "#101826" }}>
        {fondImg && <img src={fondImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
        {bloc.fondType === "diaporama" && bloc.diaporamaImages?.length > 0 && (
          <Diaporama images={bloc.diaporamaImages} vitesse={bloc.vitesse} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        )}
        {(fondImg || bloc.fondType === "diaporama") && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,24,38,0.15), rgba(16,24,38,0.75))" }} />}
        <div style={{ position: "relative", padding: "34px 24px 28px", width: "100%", textAlign: bloc.alignTexte || "left", color: clair ? "#101826" : "#fff" }}>
          {bloc.titre && <div className="display" style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.15 }}>{bloc.titre}</div>}
          {bloc.texte && <div style={{ marginTop: 8, fontSize: 14, opacity: 0.85, maxWidth: bloc.alignTexte === "center" ? "none" : 560 }}>{bloc.texte}</div>}
          {edition && !bloc.titre && !bloc.texte && <div style={{ opacity: 0.6, fontStyle: "italic", fontSize: 13 }}>Bandeau sans titre — clique pour le remplir</div>}
        </div>
      </div>
    );
  }
  if (bloc.type === "texte") {
    if (!bloc.texte) return edition ? <VideEdition texte="Bloc texte vide — clique pour écrire" /> : null;
    return <div style={{ padding: "4px 2px", fontSize: 14.5, lineHeight: 1.65, color: "#101826", whiteSpace: "pre-wrap", textAlign: bloc.alignTexte || "left" }}>{bloc.texte}</div>;
  }
  if (bloc.type === "image") {
    if (!bloc.url) return edition ? <VideEdition texte="Photo à choisir — clique pour l'importer" /> : null;
    return (
      <figure style={{ margin: 0 }}>
        <img src={bloc.url} alt={bloc.legende || ""} style={{ width: "100%", borderRadius: 12, border: "1px solid var(--ligne)", display: "block" }} />
        {bloc.legende && <figcaption style={{ fontSize: 11.5, color: "#6b6656", marginTop: 6, textAlign: bloc.alignTexte || "left" }}>{bloc.legende}</figcaption>}
      </figure>
    );
  }
  if (bloc.type === "video") {
    if (!bloc.url) return edition ? <VideEdition texte="Vidéo à choisir — clique pour l'importer" /> : null;
    return (
      <figure style={{ margin: 0 }}>
        <video src={bloc.url} controls style={{ width: "100%", borderRadius: 12, border: "1px solid var(--ligne)", display: "block", background: "#000" }} />
        {bloc.legende && <figcaption style={{ fontSize: 11.5, color: "#6b6656", marginTop: 6, textAlign: bloc.alignTexte || "left" }}>{bloc.legende}</figcaption>}
      </figure>
    );
  }
  if (bloc.type === "diaporama") {
    if (!bloc.images || bloc.images.length === 0) return edition ? <VideEdition texte="Diaporama vide — clique pour ajouter des photos" /> : null;
    return <Diaporama images={bloc.images} vitesse={bloc.vitesse} style={{ width: "100%", aspectRatio: "16/9", borderRadius: 12, border: "1px solid var(--ligne)" }} />;
  }
  if (bloc.type === "galerie") {
    if (!bloc.images || bloc.images.length === 0) return edition ? <VideEdition texte="Galerie vide — clique pour ajouter des photos" /> : null;
    return <Galerie bloc={bloc} edition={edition} />;
  }
  if (bloc.type === "liens") {
    if (!bloc.liens || bloc.liens.length === 0) return edition ? <VideEdition texte="Aucun lien — clique pour en ajouter" /> : null;
    const justify = { left: "flex-start", center: "center", right: "flex-end" }[bloc.alignTexte || "left"];
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: justify }}>
        {bloc.liens.map((l) => (
          <a key={l.id} href={l.url} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 600, color: "#101826", background: "#fff", border: "1px solid var(--ligne)", borderRadius: 8, padding: "7px 10px", textDecoration: "none" }}>
            <ExternalLink size={12} /> {l.label}
          </a>
        ))}
      </div>
    );
  }
  if (bloc.type === "cours") return <BlocCours bloc={bloc} edition={edition} />;
  if (bloc.type === "espace") {
    const h = bloc.hauteur || 40;
    if (edition) {
      return (
        <div style={{ height: Math.max(h, 44), border: "2px dashed #d8d3c6", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#b3ac9c", fontSize: 11.5, fontStyle: "italic" }}>
          Espace vide (invisible pour les visiteurs, ignoré sur téléphone)
        </div>
      );
    }
    return <div style={{ height: h }} />;
  }
  return null;
}

// ---------- En-tête / navigation publique ----------
function EnTete({ arbre, ecran, allerA, adminDeverrouille, allerAdmin }) {
  const [menuOuvert, setMenuOuvert] = useState(false);
  return (
    <header style={{ background: "var(--ink)", color: "#fff", position: "sticky", top: 0, zIndex: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", maxWidth: 1140, margin: "0 auto" }}>
        <button onClick={() => { allerA({ type: "accueil" }); setMenuOuvert(false); }} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: 0 }}>
          <span className="display" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1 }}>ASEPS</span>
          <span style={{ fontSize: 10.5, opacity: 0.65, letterSpacing: 0.4 }}>Lycée Georges-Brassens</span>
        </button>
        <button onClick={() => setMenuOuvert((v) => !v)} style={{ background: "none", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, color: "#fff", padding: 7, cursor: "pointer" }}>
          <Menu size={18} />
        </button>
      </div>
      {menuOuvert && (
        <nav style={{ borderTop: "1px solid rgba(255,255,255,0.12)", padding: "6px 10px 12px", maxWidth: 1140, margin: "0 auto" }}>
          <button onClick={() => { allerA({ type: "accueil" }); setMenuOuvert(false); }} style={navBtnStyle(ecran.type === "accueil")}>
            <Home size={14} /> Accueil
          </button>
          {arbre.map((r) => (
            <div key={r.id} style={{ marginTop: 2 }}>
              <button onClick={() => { allerA({ type: "rubrique", id: r.id }); setMenuOuvert(false); }} style={navBtnStyle(ecran.type === "rubrique" && ecran.id === r.id)}>
                <LayoutList size={14} /> {r.titre}
              </button>
              {r.enfants.map((s) => (
                <button key={s.id} onClick={() => { allerA({ type: "rubrique", id: s.id }); setMenuOuvert(false); }} style={{ ...navBtnStyle(ecran.type === "rubrique" && ecran.id === s.id), paddingLeft: 30, fontSize: 12.5 }}>
                  {s.titre}
                </button>
              ))}
            </div>
          ))}
          <button onClick={() => { allerA({ type: "documents" }); setMenuOuvert(false); }} style={navBtnStyle(ecran.type === "documents")}>
            <FolderOpen size={14} /> Documents
          </button>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", margin: "8px 0" }} />
          <button onClick={() => { allerAdmin(); setMenuOuvert(false); }} style={navBtnStyle(ecran.type === "admin")}>
            {adminDeverrouille ? <Unlock size={14} /> : <Lock size={14} />} Administration
          </button>
        </nav>
      )}
    </header>
  );
}
function navBtnStyle(actif) {
  return {
    display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left",
    background: actif ? "rgba(255,122,41,0.18)" : "none", border: "none", color: actif ? "var(--piste)" : "#fff",
    padding: "9px 10px", borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: "pointer",
  };
}

// ---------- Page d'accueil publique ----------
function PageAccueil({ pageAccueil, arbre, liens, allerA, zoneBlocs }) {
  return (
    <div className="page-contenu">
      {zoneBlocs || <RenduBlocs blocs={pageAccueil.blocs} />}
      <div style={{ paddingTop: 22 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#6b6656", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
          Enseignements
        </div>
        <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
          {arbre.map((r, i) => (
            <button
              key={r.id}
              onClick={() => allerA({ type: "rubrique", id: r.id })}
              style={{
                textAlign: "left", border: "1px solid var(--ligne)", borderRadius: 12, padding: "14px 16px",
                background: TUILE_COULEURS[i % TUILE_COULEURS.length], cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
            >
              <div>
                <div className="display" style={{ fontSize: 16, fontWeight: 600, color: "#101826" }}>{r.titre}</div>
                {r.enfants.length > 0 && <div style={{ fontSize: 11.5, color: "#6b6656", marginTop: 2 }}>{r.enfants.length} page{r.enfants.length > 1 ? "s" : ""}</div>}
              </div>
              <ChevronRight size={18} color="#101826" />
            </button>
          ))}
        </div>

        {liens.length > 0 && (
          <>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#6b6656", textTransform: "uppercase", letterSpacing: 0.5, margin: "22px 0 10px" }}>
              Liens
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {liens.map((l) => (
                <a key={l.id} href={l.url} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 600, color: "#101826", background: "#fff", border: "1px solid var(--ligne)", borderRadius: 8, padding: "7px 10px", textDecoration: "none" }}>
                  <ExternalLink size={12} /> {l.label}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
const TUILE_COULEURS = ["var(--piste-soft)", "var(--teal-soft)", "#fdeecb", "#e6e6fb"];

// ---------- Page d'une rubrique / sous-rubrique ----------
function PageRubrique({ rubrique, sousRubriques, allerA, parent, zoneBlocs }) {
  return (
    <div className="page-contenu">
      {parent && (
        <div style={{ paddingBottom: 4 }}>
          <button onClick={() => allerA({ type: "rubrique", id: parent.id })} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#6b6656", fontSize: 12, cursor: "pointer", padding: 0 }}>
            <ArrowLeft size={13} /> {parent.titre}
          </button>
        </div>
      )}
      <div style={{ paddingBottom: 14 }}>
        <div className="display" style={{ fontSize: 24, fontWeight: 600 }}>{rubrique.titre}</div>
      </div>

      {zoneBlocs || <RenduBlocs blocs={rubrique.page.blocs} />}

      {sousRubriques.length > 0 && (
        <div style={{ display: "grid", gap: 8, marginTop: 18, gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
          {sousRubriques.map((s) => (
            <button key={s.id} onClick={() => allerA({ type: "rubrique", id: s.id })} style={{ textAlign: "left", border: "1px solid var(--ligne)", borderRadius: 10, padding: "11px 14px", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>{s.titre}</span>
              <ChevronRight size={16} color="#6b6656" />
            </button>
          ))}
        </div>
      )}

      {!zoneBlocs && (rubrique.page.blocs || []).length === 0 && sousRubriques.length === 0 && (
        <div style={{ color: "#9a9384", fontSize: 13, fontStyle: "italic" }}>Cette page n'a pas encore de contenu.</div>
      )}
    </div>
  );
}

// ---------- Page Documents (publique) ----------
function PageDocuments({ documents }) {
  return (
    <div className="page-contenu">
      <div className="display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 14 }}>Documents</div>
      {documents.length === 0 ? (
        <div style={{ color: "#9a9384", fontSize: 13, fontStyle: "italic" }}>Aucun document disponible pour le moment.</div>
      ) : (
        <div style={{ display: "grid", gap: 8 }}>
          {documents.map((d) => (
            <a key={d.id} href={d.data} download={d.nom} style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid var(--ligne)", borderRadius: 10, padding: "11px 14px", background: "#fff", textDecoration: "none", color: "#101826" }}>
              <FileText size={16} color="var(--piste)" />
              <span style={{ fontSize: 13.5, fontWeight: 600, flex: 1 }}>{d.nom}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Cadenas d'accès admin ----------
function CadenasAdmin({ pinAttendu, onDeverrouille, onAnnuler }) {
  const [pin, setPin] = useState("");
  const [erreur, setErreur] = useState(false);
  const valider = (val) => {
    const suivant = pin + val;
    if (suivant.length < 4) { setPin(suivant); return; }
    if (suivant === pinAttendu) { onDeverrouille(); }
    else { setErreur(true); setTimeout(() => { setPin(""); setErreur(false); }, 450); }
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(16,24,38,0.92)", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
      <button onClick={onAnnuler} style={{ position: "absolute", top: 16, left: 16, background: "none", border: "none", color: "#fff", opacity: 0.7, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
        <ArrowLeft size={15} /> Retour
      </button>
      <Lock size={26} style={{ marginBottom: 10 }} />
      <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 20 }}>Code d'administration</div>
      <div style={{ display: "flex", gap: 12, marginBottom: 26 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ width: 13, height: 13, borderRadius: "50%", background: i < pin.length ? "#fff" : "rgba(255,255,255,0.25)", border: erreur ? "1.5px solid var(--piste)" : "none" }} />
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 60px)", gap: 12 }}>
        {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((d, i) => d === "" ? <div key={i} /> : (
          <button key={i} onClick={() => d === "⌫" ? setPin(pin.slice(0, -1)) : valider(d)} style={{ width: 60, height: 60, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 19, cursor: "pointer" }}>{d}</button>
        ))}
      </div>
    </div>
  );
}

// ---------- Espace admin : gestion des rubriques ----------
function AdminRubriques({ rubriques, setRubriques, ongletChoisi, setOngletChoisi, pageAccueilChoisie, setPageAccueilChoisie }) {
  const arbre = useMemo(() => construireArbre(rubriques), [rubriques]);

  const ajouterRubrique = (parentId) => {
    const titre = prompt(parentId ? "Nom de la nouvelle sous-rubrique :" : "Nom de la nouvelle rubrique :");
    if (!titre || !titre.trim()) return;
    const freres = rubriques.filter((r) => r.parentId === (parentId || null));
    const nouvelle = { id: uid(), titre: titre.trim(), parentId: parentId || null, ordre: freres.length, page: { blocs: [] } };
    setRubriques([...rubriques, nouvelle]);
  };
  const renommer = (id) => {
    const r = rubriques.find((x) => x.id === id);
    const titre = prompt("Nouveau nom :", r.titre);
    if (!titre || !titre.trim()) return;
    setRubriques(rubriques.map((x) => x.id === id ? { ...x, titre: titre.trim() } : x));
  };
  const supprimer = (id) => {
    const enfants = rubriques.filter((x) => x.parentId === id);
    if (!confirm(enfants.length > 0 ? "Supprimer cette rubrique ET ses sous-rubriques ?" : "Supprimer cette rubrique ?")) return;
    const idsASupprimer = new Set([id, ...enfants.map((e) => e.id)]);
    setRubriques(rubriques.filter((x) => !idsASupprimer.has(x.id)));
    if (ongletChoisi && idsASupprimer.has(ongletChoisi)) setOngletChoisi(null);
  };
  const deplacer = (id, sens) => {
    const r = rubriques.find((x) => x.id === id);
    const freres = rubriques.filter((x) => x.parentId === r.parentId).sort((a, b) => a.ordre - b.ordre);
    const idx = freres.findIndex((x) => x.id === id);
    const cible = sens === "haut" ? idx - 1 : idx + 1;
    if (cible < 0 || cible >= freres.length) return;
    const a = freres[idx], b = freres[cible];
    setRubriques(rubriques.map((x) => x.id === a.id ? { ...x, ordre: b.ordre } : x.id === b.id ? { ...x, ordre: a.ordre } : x));
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#6b6656", textTransform: "uppercase", letterSpacing: 0.5 }}>Pages du site</div>
        <button onClick={() => ajouterRubrique(null)} style={boutonPrimaire}>
          <Plus size={13} /> Rubrique
        </button>
      </div>

      <button
        onClick={() => { setPageAccueilChoisie(true); setOngletChoisi(null); }}
        style={{ width: "100%", textAlign: "left", border: `1px solid ${pageAccueilChoisie ? "var(--piste)" : "var(--ligne)"}`, background: pageAccueilChoisie ? "var(--piste-soft)" : "#fff", borderRadius: 9, padding: "9px 11px", fontSize: 13, fontWeight: 700, color: "#101826", cursor: "pointer", marginBottom: 10, display: "flex", alignItems: "center", gap: 7 }}
      >
        <Home size={13} /> Page d'accueil
      </button>

      <div style={{ display: "grid", gap: 8 }}>
        {arbre.map((r) => (
          <div key={r.id}>
            <LigneRubrique
              rubrique={r} niveau={0} actif={!pageAccueilChoisie && ongletChoisi === r.id}
              onChoisir={() => { setOngletChoisi(r.id); setPageAccueilChoisie(false); }} onRenommer={() => renommer(r.id)}
              onSupprimer={() => supprimer(r.id)} onMonter={() => deplacer(r.id, "haut")} onDescendre={() => deplacer(r.id, "bas")}
              onAjouterEnfant={() => ajouterRubrique(r.id)}
            />
            {r.enfants.map((s) => (
              <LigneRubrique
                key={s.id} rubrique={s} niveau={1} actif={!pageAccueilChoisie && ongletChoisi === s.id}
                onChoisir={() => { setOngletChoisi(s.id); setPageAccueilChoisie(false); }} onRenommer={() => renommer(s.id)}
                onSupprimer={() => supprimer(s.id)} onMonter={() => deplacer(s.id, "haut")} onDescendre={() => deplacer(s.id, "bas")}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
function LigneRubrique({ rubrique, niveau, actif, onChoisir, onRenommer, onSupprimer, onMonter, onDescendre, onAjouterEnfant }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: niveau * 18 }}>
      <button onClick={onChoisir} style={{ flex: 1, textAlign: "left", border: `1px solid ${actif ? "var(--piste)" : "var(--ligne)"}`, background: actif ? "var(--piste-soft)" : "#fff", borderRadius: 9, padding: "9px 11px", fontSize: 13, fontWeight: 600, color: "#101826", cursor: "pointer" }}>
        {rubrique.titre}
      </button>
      <button onClick={onMonter} title="Monter" style={iconBtn}><ChevronUp size={13} /></button>
      <button onClick={onDescendre} title="Descendre" style={iconBtn}><ChevronDown size={13} /></button>
      {onAjouterEnfant && <button onClick={onAjouterEnfant} title="Ajouter une sous-rubrique" style={iconBtn}><Plus size={13} /></button>}
      <button onClick={onRenommer} title="Renommer" style={iconBtn}><Pencil size={13} /></button>
      <button onClick={onSupprimer} title="Supprimer" style={{ ...iconBtn, color: "#c24b4b" }}><Trash2 size={13} /></button>
    </div>
  );
}
const iconBtn = { border: "1px solid var(--ligne)", background: "#fff", borderRadius: 7, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6b6656", flexShrink: 0 };
const boutonPrimaire = { display: "flex", alignItems: "center", gap: 5, border: "none", background: "var(--piste)", color: "#fff", borderRadius: 8, padding: "7px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" };
const champLabel = { fontSize: 11.5, fontWeight: 700, color: "#6b6656", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 6 };
const champStyle = (largeur) => ({ width: largeur, padding: "7px 9px", borderRadius: 7, border: "1px solid var(--ligne)", fontSize: 12.5, fontFamily: "inherit" });

const TYPES_BLOC = [
  { id: "bandeau", label: "Bandeau (titre + fond)", Icon: LayoutTemplate },
  { id: "texte", label: "Texte", Icon: Type },
  { id: "image", label: "Photo", Icon: ImageIcon },
  { id: "video", label: "Vidéo", Icon: Video },
  { id: "diaporama", label: "Diaporama photos", Icon: Images },
  { id: "galerie", label: "Galerie photos (plusieurs par ligne)", Icon: LayoutGrid },
  { id: "liens", label: "Liens externes", Icon: Link2 },
  { id: "cours", label: "Cours (partie prête)", Icon: BookOpen },
  { id: "espace", label: "Espace vide", Icon: Square },
];
function nouveauBloc(type) {
  const base = { id: uid(), type, largeur: 12 };
  if (type === "bandeau") return { ...base, fondType: "couleur", fondCouleur: "#101826", fondImage: "", diaporamaImages: [], vitesse: 4, titre: "", texte: "" };
  if (type === "texte") return { ...base, largeur: 6, texte: "" };
  if (type === "image") return { ...base, largeur: 6, url: "", legende: "" };
  if (type === "video") return { ...base, largeur: 6, url: "", legende: "" };
  if (type === "diaporama") return { ...base, images: [], vitesse: 4 };
  if (type === "galerie") return { ...base, images: [], affichage: "grille", parLigneOrdi: 4, parLigneTel: 2, recadrage: "uniforme" };
  if (type === "liens") return { ...base, liens: [] };
  if (type === "cours") return { ...base, partie: "", ouvert: false };
  if (type === "espace") return { ...base, largeur: 4, hauteur: 40 };
  return base;
}

// ---------- Éditeur visuel : la page elle-même, modifiable ----------
function GrilleEdition({ blocs, onChange, selectionId, setSelectionId, apercuMobile }) {
  const grilleRef = useRef(null);
  const dragId = useRef(null);
  const [cible, setCible] = useState(null); // { id, cote: "avant" | "apres" }
  const [redim, setRedim] = useState(null); // { id, span } pendant le redimensionnement

  const deplacer = (id, delta) => {
    const idx = blocs.findIndex((b) => b.id === id);
    const dest = idx + delta;
    if (idx < 0 || dest < 0 || dest >= blocs.length) return;
    const copie = [...blocs];
    [copie[idx], copie[dest]] = [copie[dest], copie[idx]];
    onChange(copie);
  };
  const placer = (srcId, cibleId, cote) => {
    if (srcId === cibleId) return;
    const copie = [...blocs];
    const idxSrc = copie.findIndex((b) => b.id === srcId);
    if (idxSrc < 0) return;
    const [retire] = copie.splice(idxSrc, 1);
    let idxDst = copie.findIndex((b) => b.id === cibleId);
    if (idxDst < 0) return;
    if (cote === "apres") idxDst += 1;
    copie.splice(idxDst, 0, retire);
    onChange(copie);
  };
  const dupliquer = (id) => {
    const idx = blocs.findIndex((b) => b.id === id);
    const copie = [...blocs];
    const clone = JSON.parse(JSON.stringify(blocs[idx]));
    clone.id = uid();
    copie.splice(idx + 1, 0, clone);
    onChange(copie);
    setSelectionId(clone.id);
  };
  const supprimer = (id) => {
    if (!confirm("Supprimer ce bloc ?\n(Tu pourras revenir en arrière avec « Annuler ».)")) return;
    onChange(blocs.filter((b) => b.id !== id));
    if (selectionId === id) setSelectionId(null);
  };
  // Sur téléphone (ou en aperçu téléphone), le bouton de largeur règle la largeur « téléphone »
  const largeurMobileSuivante = (b) => {
    const ordre = [12, 6, 4, 3];
    const idx = ordre.indexOf(b.largeurMobile || 12);
    onChange(blocs.map((x) => x.id === b.id ? { ...x, largeurMobile: ordre[(idx + 1) % ordre.length] } : x));
  };
  const largeurSuivante = (b) => {
    const actuelle = b.largeur || 12;
    const suivante = LARGEURS.find((x) => x.v > actuelle);
    onChange(blocs.map((x) => x.id === b.id ? { ...x, largeur: suivante ? suivante.v : LARGEURS[0].v } : x));
  };

  // Redimensionnement : on tire la poignée orange à droite du bloc, la largeur s'aimante sur les 12 colonnes.
  const debutRedim = (b) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    const grille = grilleRef.current;
    const rect = grille.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(grille).columnGap) || 18;
    const pas = (rect.width - 11 * gap) / 12 + gap;
    const x0 = e.clientX;
    const span0 = b.largeur || 12;
    let span = span0;
    setRedim({ id: b.id, span });
    const bouger = (ev) => {
      span = Math.max(1, Math.min(12, Math.round(span0 + (ev.clientX - x0) / pas)));
      setRedim({ id: b.id, span });
    };
    const lacher = () => {
      window.removeEventListener("pointermove", bouger);
      window.removeEventListener("pointerup", lacher);
      setRedim(null);
      if (span !== span0) onChange(blocs.map((x) => x.id === b.id ? { ...x, largeur: span } : x));
    };
    window.addEventListener("pointermove", bouger);
    window.addEventListener("pointerup", lacher);
  };

  const modeTelephone = () => apercuMobile || window.innerWidth <= 760;

  return (
    <div ref={grilleRef} className={"grille" + (apercuMobile ? " apercu-mobile" : "") + (redim ? " en-redim" : "")}>
      {blocs.length === 0 && (
        <div className="cellule" style={{ "--span": 12 }}>
          <VideEdition texte="Page vide — choisis un type de bloc dans la barre en bas puis « Ajouter »." />
        </div>
      )}
      {blocs.map((b, i) => {
        const span = redim && redim.id === b.id ? redim.span : (b.largeur || 12);
        const meta = TYPES_BLOC.find((t) => t.id === b.type);
        const classes = ["cellule", "en-edition"];
        if (b.type === "espace") classes.push("espace-bloc");
        if (selectionId === b.id) classes.push("selectionne");
        if (cible && cible.id === b.id) classes.push(cible.cote === "avant" ? "cible-avant" : "cible-apres");
        return (
          <div
            key={b.id}
            data-bloc={b.id}
            className={classes.join(" ")}
            style={{ "--span": span, "--span-m": b.largeurMobile || 12, alignSelf: ALIGN_SELF[b.alignV] || "stretch" }}
            onClick={() => setSelectionId(b.id)}
            onDragOver={(e) => {
              if (!dragId.current) return;
              e.preventDefault();
              const r = e.currentTarget.getBoundingClientRect();
              const cote = modeTelephone() && (b.largeurMobile || 12) === 12
                ? (e.clientY < r.top + r.height / 2 ? "avant" : "apres")
                : (e.clientX < r.left + r.width / 2 ? "avant" : "apres");
              if (!cible || cible.id !== b.id || cible.cote !== cote) setCible({ id: b.id, cote });
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (dragId.current && dragId.current !== b.id) placer(dragId.current, b.id, (cible && cible.id === b.id && cible.cote) || "avant");
              dragId.current = null;
              setCible(null);
            }}
          >
            <div className="barre-bloc" onClick={(e) => e.stopPropagation()}>
              <span
                className="poignee"
                draggable
                title="Glisser pour déplacer le bloc"
                onDragStart={(e) => {
                  dragId.current = b.id;
                  e.dataTransfer.effectAllowed = "move";
                  e.dataTransfer.setData("text/plain", b.id);
                  const cellule = e.currentTarget.closest(".cellule");
                  if (cellule && e.dataTransfer.setDragImage) e.dataTransfer.setDragImage(cellule, 24, 16);
                }}
                onDragEnd={() => { dragId.current = null; setCible(null); }}
              >
                <GripVertical size={13} />
              </span>
              <button onClick={() => deplacer(b.id, -1)} disabled={i === 0} title="Placer avant (vers la gauche / le haut)"><ChevronLeft size={13} /></button>
              <button onClick={() => deplacer(b.id, 1)} disabled={i === blocs.length - 1} title="Placer après (vers la droite / le bas)"><ChevronRight size={13} /></button>
              {modeTelephone()
                ? <button onClick={() => largeurMobileSuivante(b)} title="Largeur sur téléphone (pleine → ½ → ⅓ → ¼)">📱 {libelleLargeurMobile(b.largeurMobile || 12)}</button>
                : <button onClick={() => largeurSuivante(b)} title="Changer la largeur (¼ → ⅓ → ½ → ⅔ → ¾ → pleine)">{libelleLargeur(span)}</button>}
              <span className="etiquette">{meta ? meta.label : b.type}</span>
              <span style={{ flex: 1 }} />
              <button onClick={() => setSelectionId(b.id)} title="Modifier le contenu"><Pencil size={12} /></button>
              <button onClick={() => dupliquer(b.id)} title="Dupliquer"><Copy size={12} /></button>
              <button onClick={() => supprimer(b.id)} title="Supprimer" style={{ color: "#c24b4b" }}><Trash2 size={12} /></button>
            </div>
            <div style={{ pointerEvents: "none", height: b.type === "bandeau" ? "100%" : undefined }}>
              <RenduBloc bloc={b} edition />
            </div>
            <div className="poignee-largeur" title="Tirer pour élargir / rétrécir" onPointerDown={debutRedim(b)} onClick={(e) => e.stopPropagation()} />
            {redim && redim.id === b.id && <div className="bulle-largeur">{span}/12 · {libelleLargeur(span)}</div>}
          </div>
        );
      })}
    </div>
  );
}

// Panneau latéral : réglages de placement + contenu du bloc sélectionné
function PanneauBloc({ bloc, majBloc, fermer }) {
  const meta = TYPES_BLOC.find((t) => t.id === bloc.type);
  const largeur = bloc.largeur || 12;
  const choix = (actif) => ({
    flex: 1, padding: "7px 0", borderRadius: 7, fontSize: 11.5, fontWeight: 700, cursor: "pointer",
    border: `1.5px solid ${actif ? "var(--piste)" : "var(--ligne)"}`, background: actif ? "var(--piste)" : "#fff", color: actif ? "#fff" : "#6b6656",
  });
  const avecAlignTexte = ["bandeau", "texte", "image", "video", "liens"].includes(bloc.type);
  return (
    <div className="panneau-bloc" onClick={(e) => e.stopPropagation()}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 16px", borderBottom: "1px solid var(--ligne)" }}>
        {meta && <meta.Icon size={16} color="var(--piste)" />}
        <div className="display" style={{ fontSize: 17, fontWeight: 600, flex: 1 }}>{meta ? meta.label : "Bloc"}</div>
        <button onClick={fermer} title="Fermer" style={iconBtn}><X size={14} /></button>
      </div>
      <div style={{ overflowY: "auto", padding: 16, display: "grid", gap: 18, alignContent: "start" }}>
        <section style={{ display: "grid", gap: 12 }}>
          <div style={champLabel}>Place sur la page</div>
          <div>
            <div style={{ fontSize: 12, color: "#6b6656", marginBottom: 6 }}>Largeur</div>
            <div style={{ display: "flex", gap: 5 }}>
              {LARGEURS.map((x) => (
                <button key={x.v} onClick={() => majBloc({ largeur: x.v })} style={choix(largeur === x.v)}>{x.l}</button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <button onClick={() => majBloc({ largeur: Math.max(1, largeur - 1) })} style={iconBtn} title="Une colonne de moins">−</button>
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 2 }}>
                {Array.from({ length: 12 }, (_, k) => (
                  <div key={k} onClick={() => majBloc({ largeur: k + 1 })} title={`${k + 1}/12`} style={{ height: 14, borderRadius: 3, cursor: "pointer", background: k < largeur ? "var(--piste)" : "var(--ligne)" }} />
                ))}
              </div>
              <button onClick={() => majBloc({ largeur: Math.min(12, largeur + 1) })} style={iconBtn} title="Une colonne de plus">+</button>
              <span style={{ fontSize: 12, fontWeight: 700, width: 38, textAlign: "right" }}>{largeur}/12</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#6b6656", marginBottom: 6 }}>Position verticale dans la ligne</div>
            <div style={{ display: "flex", gap: 5 }}>
              {[["", "Étiré"], ["haut", "Haut"], ["milieu", "Milieu"], ["bas", "Bas"]].map(([v, l]) => (
                <button key={l} onClick={() => majBloc({ alignV: v || undefined })} style={choix((bloc.alignV || "") === v)}>{l}</button>
              ))}
            </div>
          </div>
          {avecAlignTexte && (
            <div>
              <div style={{ fontSize: 12, color: "#6b6656", marginBottom: 6 }}>{bloc.type === "image" || bloc.type === "video" ? "Alignement de la légende" : "Alignement du texte"}</div>
              <div style={{ display: "flex", gap: 5 }}>
                {[["left", "Gauche"], ["center", "Centre"], ["right", "Droite"]].map(([v, l]) => (
                  <button key={v} onClick={() => majBloc({ alignTexte: v })} style={choix((bloc.alignTexte || "left") === v)}>{l}</button>
                ))}
              </div>
            </div>
          )}
          {bloc.type === "espace" && (
            <label style={{ fontSize: 12, color: "#6b6656", display: "grid", gap: 6 }}>
              Hauteur : {bloc.hauteur || 40} px
              <input type="range" min={10} max={400} step={10} value={bloc.hauteur || 40} onChange={(e) => majBloc({ hauteur: Number(e.target.value) })} />
            </label>
          )}
          {bloc.type === "espace" ? (
            <div style={{ fontSize: 11.5, color: "#9a9384", lineHeight: 1.45 }}>
              📱 Les espaces vides sont masqués sur téléphone.
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 12, color: "#6b6656", marginBottom: 6 }}>📱 Largeur sur téléphone</div>
              <div style={{ display: "flex", gap: 5 }}>
                {LARGEURS_MOBILE.map((x) => (
                  <button key={x.v} onClick={() => majBloc({ largeurMobile: x.v })} style={choix((bloc.largeurMobile || 12) === x.v)}>{x.l}</button>
                ))}
              </div>
              <div style={{ fontSize: 11.5, color: "#9a9384", lineHeight: 1.45, marginTop: 6 }}>
                Pour mettre des blocs côte à côte sur téléphone : deux sur ½, trois sur ⅓ ou quatre sur ¼. Pour plusieurs photos, le bloc « Galerie photos » est plus pratique. Vérifie le rendu avec l'aperçu 📱 de la barre du bas.
              </div>
            </div>
          )}
        </section>
        {bloc.type !== "espace" && (
          <section style={{ display: "grid", gap: 10, borderTop: "1px solid var(--ligne)", paddingTop: 16 }}>
            <div style={champLabel}>Contenu</div>
            <EditeurContenuBloc key={bloc.id} bloc={bloc} majBloc={majBloc} />
          </section>
        )}
      </div>
    </div>
  );
}

// Barre flottante du mode édition
function BarreEdition({ onAjouter, onAnnuler, peutAnnuler, apercuMobile, setApercuMobile, onTerminer, selectionActive }) {
  const [type, setType] = useState("texte");
  return (
    <div className={"barre-edition" + (selectionActive ? " decale" : "")}>
      <select value={type} onChange={(e) => setType(e.target.value)} title="Type de bloc à ajouter">
        {TYPES_BLOC.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
      </select>
      <button className="principal" onClick={() => onAjouter(type)} title={selectionActive ? "Ajouter après le bloc sélectionné" : "Ajouter à la fin de la page"}>
        <Plus size={14} /> Ajouter
      </button>
      <button onClick={onAnnuler} disabled={!peutAnnuler} title="Annuler la dernière modification (Ctrl+Z)"><Undo2 size={14} /> Annuler</button>
      <button className={apercuMobile ? "" : "actif"} onClick={() => setApercuMobile(false)} title="Aperçu ordinateur"><Monitor size={14} /></button>
      <button className={apercuMobile ? "actif" : ""} onClick={() => setApercuMobile(true)} title="Aperçu téléphone"><Smartphone size={14} /></button>
      <button onClick={onTerminer} title="Quitter le mode édition"><Check size={14} /> Terminer</button>
    </div>
  );
}

function EditeurContenuBloc({ bloc, majBloc }) {
  const [local, setLocal] = useState(bloc);
  useEffect(() => setLocal(bloc), [bloc.id]);

  if (bloc.type === "bandeau") {
    const importerFond = async (file) => majBloc({ fondImage: await fichierVersDataUrl(file) });
    const importerDiapo = async (files) => {
      const nouvelles = await Promise.all(Array.from(files).map(async (f) => ({ id: uid(), url: await fichierVersDataUrl(f) })));
      majBloc({ diaporamaImages: [...(bloc.diaporamaImages || []), ...nouvelles] });
    };
    return (
      <div style={{ display: "grid", gap: 10 }}>
        <input value={local.titre} onChange={(e) => setLocal({ ...local, titre: e.target.value })} onBlur={() => majBloc({ titre: local.titre })} placeholder="Titre du bandeau" style={{ ...champStyle("100%"), fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 600 }} />
        <textarea value={local.texte} onChange={(e) => setLocal({ ...local, texte: e.target.value })} onBlur={() => majBloc({ texte: local.texte })} rows={2} placeholder="Texte court (optionnel)" style={{ ...champStyle("100%"), resize: "vertical" }} />
        <div>
          <div style={champLabel}>Type de fond</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
            {[["couleur", "Couleur"], ["image", "Image"], ["diaporama", "Diaporama"]].map(([v, l]) => (
              <button key={v} onClick={() => majBloc({ fondType: v })} style={{ flex: 1, padding: "6px 0", borderRadius: 7, fontSize: 11.5, fontWeight: 700, cursor: "pointer", border: `1.5px solid ${bloc.fondType === v ? "var(--piste)" : "var(--ligne)"}`, background: bloc.fondType === v ? "var(--piste)" : "#fff", color: bloc.fondType === v ? "#fff" : "#6b6656" }}>{l}</button>
            ))}
          </div>
          {bloc.fondType === "couleur" && (
            <input type="color" value={bloc.fondCouleur} onChange={(e) => majBloc({ fondCouleur: e.target.value })} style={{ width: 44, height: 34, border: "1px solid var(--ligne)", borderRadius: 7, padding: 2, cursor: "pointer" }} />
          )}
          {bloc.fondType === "image" && (
            <div>
              <label style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "var(--piste)", cursor: "pointer" }}>
                <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && importerFond(e.target.files[0])} style={{ display: "none" }} />
                <Upload size={13} /> Choisir une image
              </label>
              {bloc.fondImage && <img src={bloc.fondImage} alt="" style={{ display: "block", marginTop: 8, width: 100, height: 60, objectFit: "cover", borderRadius: 8, border: "1px solid var(--ligne)" }} />}
            </div>
          )}
          {bloc.fondType === "diaporama" && (
            <div>
              <label style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "var(--piste)", cursor: "pointer", marginBottom: 8 }}>
                <input type="file" accept="image/*" multiple onChange={(e) => e.target.files.length && importerDiapo(e.target.files)} style={{ display: "none" }} />
                <Upload size={13} /> Ajouter des photos
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                {(bloc.diaporamaImages || []).map((img) => (
                  <div key={img.id} style={{ position: "relative" }}>
                    <img src={img.url} alt="" style={{ width: 54, height: 54, objectFit: "cover", borderRadius: 6, border: "1px solid var(--ligne)" }} />
                    <button onClick={() => majBloc({ diaporamaImages: bloc.diaporamaImages.filter((i) => i.id !== img.id) })} style={{ position: "absolute", top: -5, right: -5, background: "#c24b4b", border: "none", borderRadius: "50%", width: 16, height: 16, color: "#fff", cursor: "pointer", fontSize: 10, lineHeight: "16px" }}>×</button>
                  </div>
                ))}
              </div>
              <label style={{ fontSize: 11.5, color: "#6b6656", display: "flex", alignItems: "center", gap: 6 }}>
                Vitesse (secondes) :
                <input type="number" min={2} max={20} value={bloc.vitesse || 4} onChange={(e) => majBloc({ vitesse: Number(e.target.value) })} style={{ width: 50, padding: "4px 6px", borderRadius: 6, border: "1px solid var(--ligne)" }} />
              </label>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (bloc.type === "cours") {
    const groupes = {};
    Object.entries(COURS).forEach(([cle, c]) => { (groupes[c.cours] = groupes[c.cours] || []).push([cle, c]); });
    return (
      <div style={{ display: "grid", gap: 10 }}>
        <select value={bloc.partie || ""} onChange={(e) => majBloc({ partie: e.target.value })} style={champStyle("100%")}>
          <option value="">— Choisir une partie de cours —</option>
          {Object.entries(groupes).map(([nom, parties]) => (
            <optgroup key={nom} label={nom}>
              {parties.map(([cle, c]) => <option key={cle} value={cle}>{c.titre}</option>)}
            </optgroup>
          ))}
        </select>
        <label style={{ fontSize: 12, color: "#6b6656", display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={!!bloc.ouvert} onChange={(e) => majBloc({ ouvert: e.target.checked })} />
          Partie dépliée à l'ouverture de la page
        </label>
        <div style={{ fontSize: 11.5, color: "#9a9384", lineHeight: 1.45 }}>
          Le texte de ces parties est intégré au site (tableaux compris). Pour le modifier, demande une mise à jour du site ; tu peux en revanche déplacer, retirer ou ajouter des blocs autour (photos, vidéos…).
        </div>
      </div>
    );
  }

  if (bloc.type === "texte") {
    return <textarea value={local.texte} onChange={(e) => setLocal({ ...local, texte: e.target.value })} onBlur={() => majBloc({ texte: local.texte })} rows={4} placeholder="Contenu du texte…" style={{ ...champStyle("100%"), resize: "vertical" }} />;
  }

  if (bloc.type === "image" || bloc.type === "video") {
    const accept = bloc.type === "image" ? "image/*" : "video/*";
    const importer = async (file) => majBloc({ url: await fichierVersDataUrl(file) });
    return (
      <div style={{ display: "grid", gap: 8 }}>
        {bloc.url && (bloc.type === "image" ? <img src={bloc.url} alt="" style={{ width: "100%", maxWidth: 220, borderRadius: 8, border: "1px solid var(--ligne)" }} /> : <video src={bloc.url} style={{ width: "100%", maxWidth: 220, borderRadius: 8, border: "1px solid var(--ligne)" }} />)}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "var(--piste)", cursor: "pointer" }}>
            <input type="file" accept={accept} onChange={(e) => e.target.files[0] && importer(e.target.files[0])} style={{ display: "none" }} />
            <Upload size={13} /> Importer
          </label>
          <input value={local.url} onChange={(e) => setLocal({ ...local, url: e.target.value })} onBlur={() => majBloc({ url: local.url })} placeholder="…ou coller une URL" style={champStyle(180)} />
        </div>
        <input value={local.legende} onChange={(e) => setLocal({ ...local, legende: e.target.value })} onBlur={() => majBloc({ legende: local.legende })} placeholder="Légende (optionnel)" style={champStyle("100%")} />
      </div>
    );
  }

  if (bloc.type === "galerie") {
    const importer = async (files) => {
      const nouvelles = await Promise.all(Array.from(files).map(async (f) => ({ id: uid(), url: await fichierVersDataUrl(f), legende: "" })));
      majBloc({ images: [...(bloc.images || []), ...nouvelles] });
    };
    const images = bloc.images || [];
    const majImages = (liste) => majBloc({ images: liste });
    const deplacer = (i, d) => {
      const j = i + d;
      if (j < 0 || j >= images.length) return;
      const c = [...images];
      [c[i], c[j]] = [c[j], c[i]];
      majImages(c);
    };
    const choix = (actif) => ({ flex: 1, padding: "7px 0", borderRadius: 7, fontSize: 11.5, fontWeight: 700, cursor: "pointer", border: `1.5px solid ${actif ? "var(--piste)" : "var(--ligne)"}`, background: actif ? "var(--piste)" : "#fff", color: actif ? "#fff" : "#6b6656" });
    const sousTitre = { fontSize: 12, color: "#6b6656", marginBottom: 6 };
    return (
      <div style={{ display: "grid", gap: 14 }}>
        <div>
          <div style={sousTitre}>Affichage</div>
          <div style={{ display: "flex", gap: 5 }}>
            <button onClick={() => majBloc({ affichage: "grille" })} style={choix((bloc.affichage || "grille") === "grille")}>Grille (photos réduites)</button>
            <button onClick={() => majBloc({ affichage: "defilement" })} style={choix(bloc.affichage === "defilement")}>Défilement ↔</button>
          </div>
          <div style={{ fontSize: 11.5, color: "#9a9384", marginTop: 6, lineHeight: 1.45 }}>
            {bloc.affichage === "defilement"
              ? "Les photos restent sur une seule ligne ; on les fait glisser du doigt (ou avec la molette / la barre) pour voir les suivantes."
              : "Toutes les photos sont visibles, réduites pour tenir côte à côte ; elles passent à la ligne suivante si besoin."}
          </div>
        </div>
        <div>
          <div style={sousTitre}>🖥️ Photos par ligne sur ordinateur</div>
          <div style={{ display: "flex", gap: 5 }}>
            {[1, 2, 3, 4, 5, 6].map((n) => <button key={n} onClick={() => majBloc({ parLigneOrdi: n })} style={choix((bloc.parLigneOrdi || 4) === n)}>{n}</button>)}
          </div>
        </div>
        <div>
          <div style={sousTitre}>📱 Photos par ligne sur téléphone</div>
          <div style={{ display: "flex", gap: 5 }}>
            {[1, 2, 3, 4].map((n) => <button key={n} onClick={() => majBloc({ parLigneTel: n })} style={choix((bloc.parLigneTel || 2) === n)}>{n}</button>)}
          </div>
        </div>
        <div>
          <div style={sousTitre}>Forme des photos</div>
          <div style={{ display: "flex", gap: 5 }}>
            <button onClick={() => majBloc({ recadrage: "uniforme" })} style={choix((bloc.recadrage || "uniforme") === "uniforme")}>Même taille (recadrées)</button>
            <button onClick={() => majBloc({ recadrage: "entiere" })} style={choix(bloc.recadrage === "entiere")}>Photo entière</button>
          </div>
        </div>
        <div>
          <div style={sousTitre}>Photos ({images.length})</div>
          <div style={{ display: "grid", gap: 6 }}>
            {images.map((img, i) => (
              <div key={img.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <img src={img.url} alt="" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6, border: "1px solid var(--ligne)", flexShrink: 0 }} />
                <input defaultValue={img.legende || ""} onBlur={(e) => majImages(images.map((x) => x.id === img.id ? { ...x, legende: e.target.value } : x))} placeholder="Légende (optionnel)" style={{ ...champStyle("100%"), minWidth: 0 }} />
                <button onClick={() => deplacer(i, -1)} disabled={i === 0} title="Avant" style={iconBtn}><ChevronUp size={13} /></button>
                <button onClick={() => deplacer(i, 1)} disabled={i === images.length - 1} title="Après" style={iconBtn}><ChevronDown size={13} /></button>
                <button onClick={() => majImages(images.filter((x) => x.id !== img.id))} title="Retirer" style={{ ...iconBtn, color: "#c24b4b" }}><Trash2 size={12} /></button>
              </div>
            ))}
          </div>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "var(--piste)", cursor: "pointer", marginTop: 10 }}>
            <input type="file" accept="image/*" multiple onChange={(e) => e.target.files.length && importer(e.target.files)} style={{ display: "none" }} />
            <Upload size={13} /> Ajouter des photos (plusieurs à la fois possible)
          </label>
        </div>
      </div>
    );
  }

  if (bloc.type === "diaporama") {
    const importer = async (files) => {
      const nouvelles = await Promise.all(Array.from(files).map(async (f) => ({ id: uid(), url: await fichierVersDataUrl(f), legende: "" })));
      majBloc({ images: [...(bloc.images || []), ...nouvelles] });
    };
    const majLegende = (id, legende) => majBloc({ images: bloc.images.map((i) => i.id === id ? { ...i, legende } : i) });
    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 8, marginBottom: 8 }}>
          {(bloc.images || []).map((img) => (
            <div key={img.id} style={{ position: "relative" }}>
              <img src={img.url} alt="" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 8, border: "1px solid var(--ligne)" }} />
              <button onClick={() => majBloc({ images: bloc.images.filter((i) => i.id !== img.id) })} style={{ position: "absolute", top: 3, right: 3, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: 5, padding: 3, cursor: "pointer", display: "flex" }}><X size={11} color="#fff" /></button>
            </div>
          ))}
        </div>
        <label style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "var(--piste)", cursor: "pointer", marginBottom: 8 }}>
          <input type="file" accept="image/*" multiple onChange={(e) => e.target.files.length && importer(e.target.files)} style={{ display: "none" }} />
          <Upload size={13} /> Ajouter des photos
        </label>
        <div>
          <label style={{ fontSize: 11.5, color: "#6b6656", display: "flex", alignItems: "center", gap: 6 }}>
            Vitesse (secondes) :
            <input type="number" min={2} max={20} value={bloc.vitesse || 4} onChange={(e) => majBloc({ vitesse: Number(e.target.value) })} style={{ width: 50, padding: "4px 6px", borderRadius: 6, border: "1px solid var(--ligne)" }} />
          </label>
        </div>
      </div>
    );
  }

  if (bloc.type === "liens") {
    return <EditeurLiensBloc bloc={bloc} majBloc={majBloc} />;
  }

  return null;
}
function EditeurLiensBloc({ bloc, majBloc }) {
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const ajouter = () => {
    if (!label.trim() || !url.trim()) return;
    majBloc({ liens: [...(bloc.liens || []), { id: uid(), label: label.trim(), url: url.trim() }] });
    setLabel(""); setUrl("");
  };
  const supprimer = (id) => majBloc({ liens: bloc.liens.filter((l) => l.id !== id) });
  return (
    <div>
      <div style={{ display: "grid", gap: 6, marginBottom: 8 }}>
        {(bloc.liens || []).map((l) => (
          <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--ligne)", borderRadius: 8, padding: "7px 10px" }}>
            <Link2 size={13} color="#6b6656" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{l.label}</div>
              <div style={{ fontSize: 11, color: "#9a9384", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.url}</div>
            </div>
            <button onClick={() => supprimer(l.id)} style={{ ...iconBtn, color: "#c24b4b" }}><Trash2 size={12} /></button>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Libellé" style={champStyle(120)} />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" style={champStyle(180)} />
        <button onClick={ajouter} style={boutonPrimaire}><Plus size={13} /> Ajouter</button>
      </div>
    </div>
  );
}

// ---------- Espace admin : documents & liens globaux ----------
function AdminDocuments({ documents, setDocuments }) {
  const importer = async (file) => {
    const dataUrl = await lireDataUrl(file);
    setDocuments([...documents, { id: uid(), nom: file.name, data: dataUrl, dateAjout: new Date().toISOString() }]);
  };
  const supprimer = (id) => setDocuments(documents.filter((d) => d.id !== id));
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={champLabel}>Documents à télécharger</div>
        <label style={boutonPrimaire}>
          <input type="file" onChange={(e) => e.target.files[0] && importer(e.target.files[0])} style={{ display: "none" }} />
          <Upload size={13} /> Ajouter
        </label>
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        {documents.map((d) => (
          <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--ligne)", borderRadius: 8, padding: "8px 10px" }}>
            <FileText size={14} color="var(--piste)" />
            <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600 }}>{d.nom}</span>
            <button onClick={() => supprimer(d.id)} style={{ ...iconBtn, color: "#c24b4b" }}><Trash2 size={12} /></button>
          </div>
        ))}
        {documents.length === 0 && <div style={{ fontSize: 12.5, color: "#9a9384", fontStyle: "italic" }}>Aucun document.</div>}
      </div>
    </div>
  );
}
function AdminLiens({ liens, setLiens }) {
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const ajouter = () => {
    if (!label.trim() || !url.trim()) return;
    setLiens([...liens, { id: uid(), label: label.trim(), url: url.trim() }]);
    setLabel(""); setUrl("");
  };
  const supprimer = (id) => setLiens(liens.filter((l) => l.id !== id));
  return (
    <div>
      <div style={champLabel}>Liens externes (page d'accueil)</div>
      <div style={{ display: "grid", gap: 6, margin: "8px 0 10px" }}>
        {liens.map((l) => (
          <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--ligne)", borderRadius: 8, padding: "7px 10px" }}>
            <Link2 size={13} color="#6b6656" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{l.label}</div>
              <div style={{ fontSize: 11, color: "#9a9384", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.url}</div>
            </div>
            <button onClick={() => supprimer(l.id)} style={{ ...iconBtn, color: "#c24b4b" }}><Trash2 size={12} /></button>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Libellé" style={champStyle(120)} />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" style={champStyle(180)} />
        <button onClick={ajouter} style={boutonPrimaire}><Plus size={13} /> Ajouter</button>
      </div>
    </div>
  );
}

// ---------- Espace admin (racine) ----------
function BoutonMiseEnPage({ nbBlocs, onClick }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={onClick} style={{ ...boutonPrimaire, justifyContent: "center", padding: "12px 14px", fontSize: 13.5 }}>
        <Pencil size={15} /> Ouvrir la page et la mettre en page
      </button>
      <div style={{ fontSize: 12, color: "#6b6656", lineHeight: 1.5 }}>
        {nbBlocs} bloc{nbBlocs > 1 ? "s" : ""} sur cette page. L'édition se fait directement sur la page : glisse les blocs, tire leur bord droit pour changer la largeur, clique sur un bloc pour modifier son contenu.
      </div>
    </div>
  );
}

function EspaceAdmin({ rubriques, setRubriques, pageAccueil, setPageAccueil, documents, setDocuments, liens, setLiens, onVerrouiller, ouvrirEditeur }) {
  const [onglet, setOnglet] = useState("rubriques");
  const [rubriqueChoisie, setRubriqueChoisie] = useState(null);
  const [pageAccueilChoisie, setPageAccueilChoisie] = useState(false);
  const rubrique = rubriques.find((r) => r.id === rubriqueChoisie);

  return (
    <div style={{ padding: 18, maxWidth: 720, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div className="display" style={{ fontSize: 20, fontWeight: 600 }}>Administration</div>
        <button onClick={onVerrouiller} style={{ display: "flex", alignItems: "center", gap: 5, border: "1px solid var(--ligne)", background: "#fff", borderRadius: 8, padding: "6px 11px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          <Lock size={13} /> Verrouiller
        </button>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {[
          { id: "rubriques", label: "Pages" },
          { id: "documents", label: "Documents" },
          { id: "liens", label: "Liens d'accueil" },
        ].map((o) => (
          <button key={o.id} onClick={() => setOnglet(o.id)} style={{ flex: 1, padding: "8px 0", borderRadius: 9, fontWeight: 700, fontSize: 12, cursor: "pointer", border: `1.5px solid ${onglet === o.id ? "var(--piste)" : "var(--ligne)"}`, background: onglet === o.id ? "var(--piste)" : "#fff", color: onglet === o.id ? "#fff" : "#6b6656" }}>
            {o.label}
          </button>
        ))}
      </div>

      {onglet === "rubriques" && (
        <div style={{ display: "grid", gap: 20 }}>
          <AdminRubriques
            rubriques={rubriques} setRubriques={setRubriques}
            ongletChoisi={rubriqueChoisie} setOngletChoisi={setRubriqueChoisie}
            pageAccueilChoisie={pageAccueilChoisie} setPageAccueilChoisie={setPageAccueilChoisie}
          />
          {pageAccueilChoisie && (
            <div style={{ borderTop: "1px solid var(--ligne)", paddingTop: 16 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#6b6656", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
                Contenu de la page d'accueil
              </div>
              <BoutonMiseEnPage nbBlocs={(pageAccueil.blocs || []).length} onClick={() => ouvrirEditeur({ type: "accueil" })} />
            </div>
          )}
          {!pageAccueilChoisie && rubrique && (
            <div style={{ borderTop: "1px solid var(--ligne)", paddingTop: 16 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#6b6656", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
                Contenu de la page « {rubrique.titre} »
              </div>
              <BoutonMiseEnPage nbBlocs={(rubrique.page.blocs || []).length} onClick={() => ouvrirEditeur({ type: "rubrique", id: rubrique.id })} />
            </div>
          )}
        </div>
      )}
      {onglet === "documents" && <AdminDocuments documents={documents} setDocuments={setDocuments} />}
      {onglet === "liens" && <AdminLiens liens={liens} setLiens={setLiens} />}
    </div>
  );
}

// ---------- Mise à jour v0.4.0 : intégration des cours (Théorie musculation + Alimentation) ----------
// Exécutée une seule fois par navigateur. Une page restée sur son texte d'origine (ou vide) est remplacée
// par le cours ; une page déjà retravaillée garde son contenu et reçoit le cours à la suite.
const TEXTES_ORIGINE = {
  "musculation-theorie": "Notions théoriques autour de la musculation.",
  "sportsante-alim": "Repères sur l'alimentation du sportif.",
  "echauffement": "Protocoles d'échauffement avant les séances d'EPS.",
};
function migrerCours(rubriques) {
  const etape = lsLire("migrationCours", 0);
  if (etape >= 4) return rubriques;
  if (etape === 2 || etape === 3) {
    const r3 = ajouterRubriquesV050(rubriques);
    lsEcrire("rubriques", r3);
    lsEcrire("migrationCours", 4);
    return r3;
  }
  const seed = Object.fromEntries(SEED_RUBRIQUES.filter((r) => TEXTES_ORIGINE[r.id]).map((r) => [r.id, r]));
  // v0.4.0 : Théorie musculation + Alimentation ; v0.4.1 : Échauffement par activité
  const aMettreAJour = etape >= 1 ? ["echauffement"] : Object.keys(TEXTES_ORIGINE);
  const remplir = (r) => {
    const blocs = r.page?.blocs || [];
    if (blocs.some((b) => b.type === "cours")) return r;
    const intact = blocs.length === 0 || (blocs.length === 1 && blocs[0].type === "texte" && blocs[0].texte === TEXTES_ORIGINE[r.id]);
    const nouveaux = JSON.parse(JSON.stringify(seed[r.id].page.blocs)).map((b) => ({ ...b, id: uid() }));
    return { ...r, page: { ...r.page, blocs: intact ? nouveaux : [...blocs, ...nouveaux.slice(1)] } };
  };
  let resultat = rubriques.map((r) => (aMettreAJour.includes(r.id) ? remplir(r) : r));

  // v0.4.1 : « L'échauffement » passe dans « Sport & Santé », juste sous « L'alimentation »
  if (etape < 2) {
    let parent = resultat.find((r) => r.id === "sportsante");
    if (!parent) {
      parent = { ...seed["sportsante-alim"], id: "sportsante", titre: "Sport & Santé", parentId: null, ordre: resultat.filter((r) => !r.parentId).length, page: { blocs: [] } };
      resultat = [...resultat, parent];
    }
    if (!resultat.some((r) => r.id === "echauffement")) resultat = [...resultat, remplir({ ...seed["echauffement"], page: { blocs: [] } })];
    const alim = resultat.find((r) => r.id === "sportsante-alim" && r.parentId === "sportsante");
    const freres = resultat.filter((r) => r.parentId === "sportsante" && r.id !== "echauffement").sort((a, b) => a.ordre - b.ordre);
    const idxAlim = alim ? freres.findIndex((r) => r.id === alim.id) : -1;
    const ordre = [...freres];
    ordre.splice(idxAlim + 1, 0, { id: "echauffement" });
    const rang = Object.fromEntries(ordre.map((r, i) => [r.id, i]));
    resultat = resultat.map((r) => (r.id === "echauffement" ? { ...r, parentId: "sportsante", ordre: rang.echauffement } : rang[r.id] !== undefined && r.parentId === "sportsante" ? { ...r, ordre: rang[r.id] } : r));
    // les anciennes sous-pages éventuelles de « L'échauffement » remontent au niveau principal (2 niveaux maximum)
    const nbRacines = resultat.filter((r) => !r.parentId).length;
    let k = 0;
    resultat = resultat.map((r) => (r.parentId === "echauffement" ? { ...r, parentId: null, ordre: nbRacines + k++ } : r));
  }
  resultat = ajouterRubriquesV050(resultat);
  lsEcrire("rubriques", resultat);
  lsEcrire("migrationCours", 4);
  return resultat;
}

// v0.5.0 / v0.6.0 : nouvelles rubriques « Course de durée », « Escalade », « Volley-ball », « Badminton » (après Musculation)
// et « Association Sportive du Lycée » (en dernier).
// Une rubrique déjà présente (même identifiant) n'est jamais écrasée.
function ajouterRubriquesV050(rubriques) {
  const existe = new Set(rubriques.map((r) => r.id));
  const NOUVELLES = ["course-duree", "escalade", "volley", "badminton", "as"];
  const nouvelles = SEED_RUBRIQUES.filter((r) => NOUVELLES.includes(r.id) || NOUVELLES.includes(r.parentId))
    .filter((r) => !existe.has(r.id))
    .map((r) => ({ ...JSON.parse(JSON.stringify(r)), page: { blocs: r.page.blocs.map((b) => ({ ...JSON.parse(JSON.stringify(b)), id: uid() })) } }));
  if (nouvelles.length === 0) return rubriques;
  let tout = [...rubriques, ...nouvelles];
  // ordre des rubriques principales : Course de durée et Escalade juste après Musculation, AS à la fin
  const racines = tout.filter((r) => !r.parentId).sort((a, b) => a.ordre - b.ordre);
  const autres = racines.filter((r) => !NOUVELLES.includes(r.id));
  const idxMuscu = autres.findIndex((r) => r.id === "musculation");
  const APRES_MUSCU = ["course-duree", "escalade", "volley", "badminton"];
  const insertion = racines.filter((r) => APRES_MUSCU.includes(r.id)).sort((a, b) => APRES_MUSCU.indexOf(a.id) - APRES_MUSCU.indexOf(b.id));
  const ordre = [...autres];
  ordre.splice(idxMuscu + 1, 0, ...insertion);
  const as = racines.find((r) => r.id === "as");
  if (as) ordre.push(as);
  const rang = Object.fromEntries(ordre.map((r, i) => [r.id, i]));
  return tout.map((r) => (!r.parentId && rang[r.id] !== undefined ? { ...r, ordre: rang[r.id] } : r));
}

// ---------- App racine ----------
export default function App() {
  const [rubriques, setRubriquesState] = useState(() => migrerCours(lsLire("rubriques", SEED_RUBRIQUES)));
  const [pageAccueil, setPageAccueilState] = useState(() => lsLire("pageAccueil", PAGE_ACCUEIL_SEED));
  const [documents, setDocumentsState] = useState(() => lsLire("documents", []));
  const [liens, setLiensState] = useState(() => lsLire("liens", SEED_LIENS));
  const [pinAdmin] = useState(() => lsLire("pinAdmin", "1234"));
  const [adminDeverrouille, setAdminDeverrouille] = useState(false);
  const [cadenasOuvert, setCadenasOuvert] = useState(false);
  const [ecran, setEcranState] = useState({ type: "accueil" });

  // Mode édition visuelle
  const [modeEdition, setModeEdition] = useState(false);
  const [selectionId, setSelectionId] = useState(null);
  const [apercuMobile, setApercuMobile] = useState(false);
  const [historique, setHistorique] = useState([]); // états précédents des blocs de la page éditée

  const setRubriques = (v) => { setRubriquesState(v); lsEcrire("rubriques", v); };
  const setPageAccueil = (v) => { setPageAccueilState(v); lsEcrire("pageAccueil", v); };
  const setDocuments = (v) => { setDocumentsState(v); lsEcrire("documents", v); };
  const setLiens = (v) => { setLiensState(v); lsEcrire("liens", v); };

  const arbre = useMemo(() => construireArbre(rubriques), [rubriques]);

  const setEcran = (e) => {
    setEcranState(e);
    setSelectionId(null);
    setHistorique([]);
    if (e.type !== "accueil" && e.type !== "rubrique") setModeEdition(false);
    window.scrollTo(0, 0);
  };
  const allerAdmin = () => {
    if (adminDeverrouille) setEcran({ type: "admin" });
    else setCadenasOuvert(true);
  };

  // Blocs de la page affichée (accueil ou rubrique)
  const rubriqueCourante = ecran.type === "rubrique" ? rubriques.find((x) => x.id === ecran.id) : null;
  const pageEditable = ecran.type === "accueil" || (ecran.type === "rubrique" && !!rubriqueCourante);
  const blocsCourants = ecran.type === "accueil" ? (pageAccueil.blocs || []) : rubriqueCourante ? (rubriqueCourante.page.blocs || []) : [];

  const ecrireBlocs = (nouveaux) => {
    if (ecran.type === "accueil") setPageAccueil({ ...pageAccueil, blocs: nouveaux });
    else if (rubriqueCourante) setRubriques(rubriques.map((r) => r.id === rubriqueCourante.id ? { ...r, page: { ...r.page, blocs: nouveaux } } : r));
  };
  const modifierBlocs = (nouveaux) => {
    setHistorique((h) => [...h.slice(-49), blocsCourants]);
    ecrireBlocs(nouveaux);
  };
  const annuler = () => {
    if (historique.length === 0) return;
    const precedent = historique[historique.length - 1];
    setHistorique((h) => h.slice(0, -1));
    ecrireBlocs(precedent);
    if (selectionId && !precedent.some((b) => b.id === selectionId)) setSelectionId(null);
  };
  const ajouterBloc = (type) => {
    const nouveau = nouveauBloc(type);
    const idx = selectionId ? blocsCourants.findIndex((b) => b.id === selectionId) : -1;
    const copie = [...blocsCourants];
    if (idx >= 0) copie.splice(idx + 1, 0, nouveau); else copie.push(nouveau);
    modifierBlocs(copie);
    setSelectionId(nouveau.id);
    setTimeout(() => {
      const el = document.querySelector(`[data-bloc="${nouveau.id}"]`);
      if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
  };
  const ouvrirEditeur = (cibleEcran) => {
    setEcran(cibleEcran);
    setModeEdition(true);
  };
  const terminerEdition = () => { setModeEdition(false); setSelectionId(null); setApercuMobile(false); setHistorique([]); };

  // Raccourcis clavier en mode édition : Ctrl+Z (annuler), Échap (fermer le panneau)
  useEffect(() => {
    if (!modeEdition) return;
    const touche = (e) => {
      const champ = e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT");
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && !champ) { e.preventDefault(); annuler(); }
      if (e.key === "Escape") setSelectionId(null);
    };
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  });

  const edition = modeEdition && adminDeverrouille && pageEditable;
  const blocSelectionne = edition && selectionId ? blocsCourants.find((b) => b.id === selectionId) : null;
  const zoneBlocs = edition ? (
    <div style={apercuMobile ? { maxWidth: 400, margin: "0 auto", border: "1px solid var(--ligne)", borderRadius: 22, padding: "14px 12px", background: "var(--craie)", boxShadow: "0 8px 30px rgba(16,24,38,0.08)" } : undefined}>
      <GrilleEdition
        blocs={blocsCourants}
        onChange={modifierBlocs}
        selectionId={selectionId}
        setSelectionId={setSelectionId}
        apercuMobile={apercuMobile}
      />
    </div>
  ) : null;

  let corps;
  if (ecran.type === "rubrique" && rubriqueCourante) {
    const r = rubriqueCourante;
    const sousRubriques = rubriques.filter((x) => x.parentId === r.id).sort((a, b) => a.ordre - b.ordre);
    const parent = r.parentId ? rubriques.find((x) => x.id === r.parentId) : null;
    corps = <PageRubrique rubrique={r} sousRubriques={sousRubriques} allerA={setEcran} parent={parent} zoneBlocs={zoneBlocs} />;
  } else if (ecran.type === "documents") {
    corps = <PageDocuments documents={documents} />;
  } else if (ecran.type === "admin" && adminDeverrouille) {
    corps = (
      <EspaceAdmin
        rubriques={rubriques} setRubriques={setRubriques}
        pageAccueil={pageAccueil} setPageAccueil={setPageAccueil}
        documents={documents} setDocuments={setDocuments}
        liens={liens} setLiens={setLiens}
        ouvrirEditeur={ouvrirEditeur}
        onVerrouiller={() => { setAdminDeverrouille(false); setModeEdition(false); setEcran({ type: "accueil" }); }}
      />
    );
  } else {
    corps = <PageAccueil pageAccueil={pageAccueil} arbre={arbre} liens={liens} allerA={setEcran} zoneBlocs={zoneBlocs} />;
  }

  return (
    <div style={{ minHeight: "100vh", paddingBottom: edition ? 110 : 30, paddingRight: blocSelectionne && window.innerWidth > 760 ? 380 : 0 }}>
      <EnTete arbre={arbre} ecran={ecran} allerA={setEcran} adminDeverrouille={adminDeverrouille} allerAdmin={allerAdmin} />
      {edition && (
        <div style={{ background: "var(--piste-soft)", borderBottom: "1px solid #f6c9a8", fontSize: 12.5, color: "#7a3a10" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "8px 20px", lineHeight: 1.5 }}>
            ✏️ <b>Mode édition</b> — glisse un bloc par sa poignée ⠿ pour le déplacer, tire la barre orange à sa droite pour changer sa largeur, clique dessus pour modifier son contenu.
          </div>
        </div>
      )}
      {corps}
      <div style={{ textAlign: "center", fontSize: 10.5, color: "#b3ac9c", marginTop: 30 }}>
        ASEPS by C. Guilhem <span style={{ opacity: 0.6 }}>· v{APP_VERSION}</span>
      </div>

      {adminDeverrouille && pageEditable && !modeEdition && (
        <button
          onClick={() => setModeEdition(true)}
          style={{ position: "fixed", right: 18, bottom: 18, zIndex: 30, ...boutonPrimaire, padding: "11px 16px", fontSize: 13.5, borderRadius: 12, boxShadow: "0 8px 24px rgba(255,122,41,0.35)" }}
        >
          <Pencil size={15} /> Modifier cette page
        </button>
      )}
      {edition && (
        <BarreEdition
          onAjouter={ajouterBloc}
          onAnnuler={annuler}
          peutAnnuler={historique.length > 0}
          apercuMobile={apercuMobile}
          setApercuMobile={setApercuMobile}
          onTerminer={terminerEdition}
          selectionActive={!!blocSelectionne}
        />
      )}
      {blocSelectionne && (
        <PanneauBloc
          bloc={blocSelectionne}
          majBloc={(patch) => modifierBlocs(blocsCourants.map((b) => b.id === blocSelectionne.id ? { ...b, ...patch } : b))}
          fermer={() => setSelectionId(null)}
        />
      )}

      {cadenasOuvert && (
        <CadenasAdmin
          pinAttendu={pinAdmin}
          onAnnuler={() => setCadenasOuvert(false)}
          onDeverrouille={() => { setAdminDeverrouille(true); setCadenasOuvert(false); setEcran({ type: "admin" }); }}
        />
      )}
    </div>
  );
}
