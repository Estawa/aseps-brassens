import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  X, Plus, Trash2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ArrowLeft, Pencil, Check,
  Type, Heading, Info, Image as ImageIcon, Video, FileText, Table, Upload, Link2, Eye, Calendar, User,
} from "lucide-react";
import { Markdown } from "./cours.jsx";
import { ZoneTexteMd } from "./modele.jsx";
import { RenduTableau, FenetreTableau, tableauVide } from "./tableau.jsx";
import { sansFormat } from "./format.jsx";
import {
  envoyerFichier, compresserImage, imageEnDataUrl, urlReduite, idYoutube, tailleLisible,
  TAILLE_MAX_VIDEO, TAILLE_MAX_DOC,
} from "./medias.js";

// =====================================================================
// v1.8.0 — Publications (Résultats sportifs, Vie de l'A.S.…)
// Les collègues publient en 3 étapes guidées : 1. infos  2. contenu  3. vérifier et publier.
// Une publication = un titre, une date, une activité, puis des éléments
// (sous-titres, textes, informations importantes, photos, vidéos, documents, tableaux).
// =====================================================================

const uid = () => Math.random().toString(36).slice(2, 10);
const aujourdhui = () => new Date().toISOString().slice(0, 10);

export const ACTIVITES = [
  "Athlétisme", "Badminton", "Basket-ball", "Cross", "Danse", "Escalade", "Football", "Futsal", "Gymnastique",
  "Handball", "Musculation", "Natation", "Raid / Sports de nature", "Rugby", "Tennis de table", "Volley-ball", "Vie de l'AS",
];

// Pages où l'on publie : réglable par l'administrateur ; par défaut « Résultats » et « Vie de l'AS / Photos »
export function estPagePublications(r) {
  if (!r) return false;
  if (typeof r.publications === "boolean") return r.publications;
  return r.parentId === "as" && (r.id === "as-resultats" || r.id === "as-photos" || /r[ée]sultat|vie de l|photo|vid[ée]o/i.test(r.titre || ""));
}

export function dateLisible(d) {
  if (!d) return "";
  const [a, m, j] = d.split("-").map(Number);
  const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  return `${j} ${mois[m - 1]} ${a}`;
}

// ---------- Modèles proposés pour démarrer une publication ----------
const MODELES = [
  {
    id: "resultat", titre: "Résultat de compétition", texte: "Lieu, niveau, tableau des résultats, commentaire, photos",
    elements: () => [
      { id: uid(), type: "info", md: "Lieu : \n\nNiveau : district / départemental / académique / France\n\nÉlèves engagés : " },
      { id: uid(), type: "tableau", titre: "Résultats", entete: ["Équipe / élève", "Catégorie", "Classement", "Remarque"], lignes: [["", "", "", ""], ["", "", "", ""]] },
      { id: uid(), type: "texte", md: "" },
      { id: uid(), type: "photos", images: [] },
    ],
  },
  {
    id: "reportage", titre: "Photos / vidéos d'une sortie", texte: "Petit texte, photos et vidéos",
    elements: () => [
      { id: uid(), type: "texte", md: "" },
      { id: uid(), type: "photos", images: [] },
      { id: uid(), type: "video", url: "", legende: "" },
    ],
  },
  {
    id: "annonce", titre: "Information / annonce", texte: "Information importante, texte et documents à télécharger",
    elements: () => [
      { id: uid(), type: "info", md: "" },
      { id: uid(), type: "texte", md: "" },
      { id: uid(), type: "document", fichiers: [] },
    ],
  },
  { id: "vide", titre: "Page vide", texte: "J'ajoute moi-même les éléments", elements: () => [] },
];

const TYPES = [
  { id: "soustitre", label: "Sous-titre", Icon: Heading, nouveau: () => ({ texte: "" }) },
  { id: "texte", label: "Texte", Icon: Type, nouveau: () => ({ md: "" }) },
  { id: "info", label: "Information importante", Icon: Info, nouveau: () => ({ md: "" }) },
  { id: "photos", label: "Photos", Icon: ImageIcon, nouveau: () => ({ images: [] }) },
  { id: "video", label: "Vidéo", Icon: Video, nouveau: () => ({ url: "", legende: "" }) },
  { id: "document", label: "Documents", Icon: FileText, nouveau: () => ({ fichiers: [] }) },
  { id: "tableau", label: "Tableau", Icon: Table, nouveau: () => ({ titre: "", ...tableauVide(3, 3) }) },
];

// =====================================================================
// Affichage sur le site
// =====================================================================
function Photos({ images }) {
  const [ouverte, setOuverte] = useState(null);
  if (!images?.length) return null;
  const n = images.length;
  return (
    <>
      <div className="pub-photos" style={{ display: "grid", gap: 6, gridTemplateColumns: n === 1 ? "1fr" : "repeat(auto-fill, minmax(150px, 1fr))", margin: "12px 0" }}>
        {images.map((img, i) => (
          <button key={img.id} type="button" onClick={() => setOuverte(i)} style={{ padding: 0, border: "none", background: "none", cursor: "zoom-in", textAlign: "left" }}>
            <img src={urlReduite(img.url, n === 1 ? 1400 : 500)} alt={img.legende || ""} loading="lazy"
              style={{ width: "100%", aspectRatio: n === 1 ? "auto" : "4/3", objectFit: "cover", borderRadius: 10, border: "1px solid var(--ligne)", display: "block" }} />
            {img.legende && <div style={{ fontSize: 11.5, color: "#6b6656", marginTop: 3 }}>{img.legende}</div>}
          </button>
        ))}
      </div>
      {ouverte != null && createPortal(
        <div onClick={() => setOuverte(null)} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(10,14,22,0.94)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 14 }}>
          <img src={urlReduite(images[ouverte].url, 1800)} alt="" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "100%", maxHeight: "82vh", borderRadius: 8 }} />
          {images[ouverte].legende && <div style={{ color: "#fff", marginTop: 10, fontSize: 14 }}>{images[ouverte].legende}</div>}
          <div style={{ display: "flex", gap: 14, marginTop: 14, alignItems: "center", color: "#fff" }} onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setOuverte((ouverte - 1 + n) % n)} style={boutonRond}><ChevronLeft size={20} /></button>
            <span style={{ fontSize: 13 }}>{ouverte + 1} / {n}</span>
            <button type="button" onClick={() => setOuverte((ouverte + 1) % n)} style={boutonRond}><ChevronRight size={20} /></button>
            <button type="button" onClick={() => setOuverte(null)} style={boutonRond}><X size={20} /></button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
const boutonRond = { width: 42, height: 42, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.1)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };

function RenduVideo({ el }) {
  if (!el.url) return null;
  const yt = idYoutube(el.url);
  return (
    <figure style={{ margin: "12px 0" }}>
      {yt ? (
        <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: 12, overflow: "hidden", background: "#000" }}>
          <iframe src={`https://www.youtube-nocookie.com/embed/${yt}`} title={el.legende || "Vidéo"} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
        </div>
      ) : /\.(mp4|webm|mov|m4v|ogg)(\?|$)/i.test(el.url) || el.url.includes("/video/upload/") ? (
        <video src={el.url} controls playsInline preload="metadata" style={{ width: "100%", borderRadius: 12, background: "#000", display: "block" }} />
      ) : (
        <a href={el.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 700, color: "var(--piste)" }}><Video size={16} /> Voir la vidéo</a>
      )}
      {el.legende && <figcaption style={{ fontSize: 12, color: "#6b6656", marginTop: 5 }}>{el.legende}</figcaption>}
    </figure>
  );
}

function RenduDocuments({ fichiers }) {
  if (!fichiers?.length) return null;
  return (
    <div style={{ display: "grid", gap: 6, margin: "12px 0" }}>
      {fichiers.map((f) => (
        <a key={f.id} href={f.url} target="_blank" rel="noopener noreferrer" className="pub-doc"
          style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid var(--ligne)", borderRadius: 10, padding: "10px 12px", background: "#fff", color: "var(--ink)", textDecoration: "none" }}>
          <FileText size={20} color="var(--piste)" />
          <span style={{ flex: 1, fontWeight: 600, fontSize: 14 }}>{f.nom || "Document"}{f.taille ? <span style={{ fontWeight: 400, color: "#9a9384", fontSize: 12 }}> · {tailleLisible(f.taille)}</span> : null}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--piste)" }}>Ouvrir</span>
        </a>
      ))}
    </div>
  );
}

export function RenduElement({ el }) {
  switch (el.type) {
    case "soustitre": return el.texte ? <h3 className="display pub-soustitre" style={{ fontSize: 19, fontWeight: 600, margin: "20px 0 6px" }}>{el.texte}</h3> : null;
    case "texte": return el.md?.trim() ? <div className="cours-corps" style={{ padding: 0 }}><Markdown md={el.md} /></div> : null;
    case "info": return el.md?.trim() ? (
      <div style={{ border: "2px solid var(--piste)", background: "#fff4ec", borderRadius: 12, padding: "6px 14px", margin: "12px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--piste)", marginTop: 6 }}><Info size={14} /> Information</div>
        <div className="cours-corps" style={{ padding: 0 }}><Markdown md={el.md} /></div>
      </div>
    ) : null;
    case "photos": return <Photos images={el.images} />;
    case "video": return <RenduVideo el={el} />;
    case "document": return <RenduDocuments fichiers={el.fichiers} />;
    case "tableau": return (el.lignes || []).some((r) => r.some((c) => String(c).trim())) ? <div style={{ margin: "12px 0" }}><RenduTableau bloc={el} /></div> : null;
    default: return null;
  }
}

function Etiquettes({ article }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, fontSize: 12, color: "#6b6656" }}>
      {article.activite && <span style={{ background: "var(--piste-soft)", color: "#9a3f0a", fontWeight: 700, borderRadius: 999, padding: "2px 9px" }}>{article.activite}</span>}
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Calendar size={12} /> {dateLisible(article.date)}</span>
      {article.auteur && <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><User size={12} /> {article.auteur}</span>}
    </div>
  );
}

export function RenduArticle({ article }) {
  return (
    <article>
      <Etiquettes article={article} />
      <h2 className="display" style={{ fontSize: 26, fontWeight: 600, margin: "8px 0 10px", lineHeight: 1.2 }}>{article.titre || "Sans titre"}</h2>
      {(article.elements || []).map((el) => <RenduElement key={el.id} el={el} />)}
    </article>
  );
}

function couverture(a) {
  for (const el of a.elements || []) {
    if (el.type === "photos" && el.images?.length) return urlReduite(el.images[0].url, 700);
    if (el.type === "video" && idYoutube(el.url)) return `https://img.youtube.com/vi/${idYoutube(el.url)}/hqdefault.jpg`;
  }
  return null;
}
function extrait(a) {
  const el = (a.elements || []).find((e) => (e.type === "texte" || e.type === "info") && e.md?.trim());
  if (!el) return "";
  const t = sansFormat(el.md).replace(/^#+\s*/gm, "").replace(/^\|.*$/gm, "").replace(/^[-\d.]+\s/gm, "").replace(/\s+/g, " ").trim();
  return t.length > 150 ? t.slice(0, 147) + "…" : t;
}

// Liste des publications d'une page (cartes) + lecture d'une publication
export function ListePublications({ rubrique, articles, utilisateur, peutModifier, onNouvelle, onModifier, onSupprimer }) {
  const [ouvert, setOuvert] = useState(null);
  const [filtre, setFiltre] = useState("");
  const liste = articles.filter((a) => a.rubriqueId === rubrique.id).sort((a, b) => (b.date || "").localeCompare(a.date || "") || (b.cree || 0) - (a.cree || 0));
  const activites = [...new Set(liste.map((a) => a.activite).filter(Boolean))].sort();
  const visibles = filtre ? liste.filter((a) => a.activite === filtre) : liste;
  const article = ouvert && liste.find((a) => a.id === ouvert);
  const haut = useRef(null);
  useEffect(() => { if (ouvert) haut.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [ouvert]);

  if (article) {
    return (
      <div ref={haut} style={{ marginTop: 10 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 14 }}>
          <button type="button" onClick={() => setOuvert(null)} style={{ ...btn, color: "var(--ink)" }}><ArrowLeft size={14} /> Toutes les publications</button>
          <span style={{ flex: 1 }} />
          {peutModifier(article) && <button type="button" onClick={() => onModifier(article)} style={{ ...btn, color: "var(--piste)", borderColor: "var(--piste)" }}><Pencil size={14} /> Modifier</button>}
          {peutModifier(article) && <button type="button" onClick={async () => { if (await onSupprimer(article)) setOuvert(null); }} style={{ ...btn, color: "#c24b4b" }}><Trash2 size={14} /> Supprimer</button>}
        </div>
        <div style={{ background: "#fff", border: "1px solid var(--ligne)", borderRadius: 14, padding: "18px 18px 8px" }}>
          <RenduArticle article={article} />
        </div>
      </div>
    );
  }

  return (
    <section ref={haut} style={{ marginTop: 18 }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div className="display" style={{ fontSize: 19, fontWeight: 600, flex: 1 }}>Publications{liste.length ? ` (${liste.length})` : ""}</div>
        {utilisateur && (
          <button type="button" onClick={onNouvelle} style={{ ...btn, background: "var(--piste)", color: "#fff", borderColor: "var(--piste)", padding: "10px 14px", fontSize: 13.5 }}>
            <Plus size={16} /> Nouvelle publication
          </button>
        )}
      </div>
      {activites.length > 1 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {["", ...activites].map((a) => (
            <button key={a || "tout"} type="button" onClick={() => setFiltre(a)} style={{ ...btn, borderRadius: 999, padding: "5px 11px", background: filtre === a ? "var(--ink)" : "#fff", color: filtre === a ? "#fff" : "#4a4636" }}>{a || "Tout"}</button>
          ))}
        </div>
      )}
      {visibles.length === 0 ? (
        <div style={{ border: "1.5px dashed var(--ligne)", borderRadius: 12, padding: 18, textAlign: "center", color: "#9a9384", fontSize: 13.5 }}>
          Aucune publication pour l'instant.
          {utilisateur && <div style={{ marginTop: 10 }}><button type="button" onClick={onNouvelle} style={{ ...btn, margin: "0 auto", color: "var(--piste)", borderColor: "var(--piste)" }}><Plus size={14} /> Publier la première</button></div>}
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
          {visibles.map((a) => {
            const img = couverture(a);
            return (
              <button key={a.id} type="button" onClick={() => setOuvert(a.id)} className="carte-pub"
                style={{ textAlign: "left", padding: 0, border: "1px solid var(--ligne)", borderRadius: 14, background: "#fff", cursor: "pointer", overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: "inherit" }}>
                {img ? <img src={img} alt="" loading="lazy" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
                  : <div style={{ width: "100%", aspectRatio: "16/9", background: "linear-gradient(135deg, var(--ink), #2a3b5c)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Oswald', sans-serif", fontSize: 22, padding: 12, textAlign: "center" }}>{a.activite || "A.S."}</div>}
                <div style={{ padding: "10px 12px 12px", display: "grid", gap: 6 }}>
                  <Etiquettes article={{ ...a, auteur: null }} />
                  <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.25, color: "var(--ink)" }}>{a.titre || "Sans titre"}</div>
                  {extrait(a) && <div style={{ fontSize: 13, color: "#6b6656", lineHeight: 1.45 }}>{extrait(a)}</div>}
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--piste)" }}>Lire →</div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

// =====================================================================
// Assistant de publication (3 étapes)
// =====================================================================
const btn = { display: "inline-flex", alignItems: "center", gap: 6, border: "1px solid var(--ligne)", background: "#fff", borderRadius: 9, padding: "8px 12px", fontSize: 12.5, fontWeight: 700, color: "#4a4636", cursor: "pointer", fontFamily: "inherit" };
const champ = { width: "100%", padding: "10px 12px", borderRadius: 9, border: "1px solid var(--ligne)", fontSize: 15, fontFamily: "inherit", background: "#fff" };
const etiquette = { fontSize: 12.5, fontWeight: 700, color: "#4a4636", marginBottom: 5, display: "block" };
const CLE_BROUILLON = "aseps_brouillon_publication";

function Progression({ p }) {
  return (
    <div style={{ height: 6, borderRadius: 3, background: "var(--ligne)", overflow: "hidden", marginTop: 4 }}>
      <div style={{ width: Math.round(p * 100) + "%", height: "100%", background: "var(--teal)", transition: "width 0.2s" }} />
    </div>
  );
}

// Gestion des envois de fichiers : { [cle]: { nom, p } }
function useEnvois() {
  const [envois, setEnvois] = useState({});
  const debut = (nom) => { const cle = uid(); setEnvois((e) => ({ ...e, [cle]: { nom, p: 0 } })); return cle; };
  const progres = (cle, p) => setEnvois((e) => (e[cle] ? { ...e, [cle]: { ...e[cle], p } } : e));
  const fin = (cle) => setEnvois((e) => { const x = { ...e }; delete x[cle]; return x; });
  return { envois, debut, progres, fin, enCours: Object.keys(envois).length > 0 };
}

function EnvoisEnCours({ envois }) {
  const liste = Object.entries(envois);
  if (!liste.length) return null;
  return (
    <div style={{ display: "grid", gap: 6, background: "var(--teal-soft)", borderRadius: 10, padding: 10 }}>
      {liste.map(([k, e]) => (
        <div key={k} style={{ fontSize: 12 }}>Envoi de « {e.nom} »… {Math.round(e.p * 100)} %<Progression p={e.p} /></div>
      ))}
    </div>
  );
}

function EditeurPhotos({ el, maj, envois }) {
  const elRef = useRef(el); elRef.current = el;
  const ajouter = async (files) => {
    for (const f of Array.from(files)) {
      const cle = envois.debut(f.name || "photo");
      let url;
      try {
        const petit = await compresserImage(f);
        url = await envoyerFichier(petit, "image", (p) => envois.progres(cle, p));
      } catch (e) {
        console.warn("Envoi Cloudinary impossible, photo gardée dans la publication", e);
        try { url = await imageEnDataUrl(f); } catch { url = null; }
      }
      envois.fin(cle);
      if (url) maj({ images: [...(elRef.current.images || []), { id: uid(), url, legende: "" }] });
    }
  };
  const images = el.images || [];
  const majImage = (id, v) => maj({ images: images.map((i) => (i.id === id ? { ...i, ...v } : i)) });
  const deplacer = (i, d) => { const j = i + d; if (j < 0 || j >= images.length) return; const l = [...images]; [l[i], l[j]] = [l[j], l[i]]; maj({ images: l }); };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 10 }}>
      <label style={{ ...btn, justifyContent: "center", padding: "14px 12px", borderStyle: "dashed", borderWidth: 2, color: "var(--piste)", borderColor: "var(--piste)", fontSize: 14 }}>
        <input type="file" accept="image/*" multiple onChange={(e) => { e.target.files.length && ajouter(e.target.files); e.target.value = ""; }} style={{ display: "none" }} />
        <Upload size={17} /> Ajouter des photos (galerie ou appareil photo)
      </label>
      {images.length > 0 && (
        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}>
          {images.map((img, i) => (
            <div key={img.id} style={{ display: "grid", gap: 4 }}>
              <div style={{ position: "relative" }}>
                <img src={urlReduite(img.url, 400)} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 8, border: "1px solid var(--ligne)", display: "block" }} />
                <div style={{ position: "absolute", top: 4, right: 4, display: "flex", gap: 3 }}>
                  <button type="button" onClick={() => deplacer(i, -1)} title="Avant" style={miniBtn}><ChevronLeft size={13} /></button>
                  <button type="button" onClick={() => deplacer(i, 1)} title="Après" style={miniBtn}><ChevronRight size={13} /></button>
                  <button type="button" onClick={() => maj({ images: images.filter((x) => x.id !== img.id) })} title="Retirer" style={{ ...miniBtn, color: "#c24b4b" }}><X size={13} /></button>
                </div>
              </div>
              <input value={img.legende || ""} onChange={(e) => majImage(img.id, { legende: e.target.value })} placeholder="Légende (facultatif)" style={{ ...champ, fontSize: 12, padding: "5px 7px" }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
const miniBtn = { width: 24, height: 24, borderRadius: 6, border: "none", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#4a4636" };

function EditeurVideo({ el, maj, envois }) {
  const [mode, setMode] = useState(el.url && !idYoutube(el.url) && el.url.includes("cloudinary") ? "fichier" : "lien");
  const [erreur, setErreur] = useState("");
  const envoyer = async (f) => {
    setErreur("");
    if (f.size > TAILLE_MAX_VIDEO) { setErreur(`Cette vidéo est trop lourde (${tailleLisible(f.size)}, maximum 100 Mo). Mets-la sur YouTube (en « non répertoriée ») et colle le lien.`); return; }
    const cle = envois.debut(f.name || "vidéo");
    try { maj({ url: await envoyerFichier(f, "video", (p) => envois.progres(cle, p)) }); }
    catch (e) { setErreur("L'envoi de la vidéo a échoué (" + e.message + "). Tu peux la mettre sur YouTube et coller le lien."); }
    envois.fin(cle);
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 10 }}>
      <div style={{ display: "flex", gap: 6 }}>
        {[["lien", "Lien YouTube"], ["fichier", "Fichier vidéo du téléphone"]].map(([v, l]) => (
          <button key={v} type="button" onClick={() => setMode(v)} style={{ ...btn, flex: 1, justifyContent: "center", background: mode === v ? "var(--ink)" : "#fff", color: mode === v ? "#fff" : "#4a4636" }}>{l}</button>
        ))}
      </div>
      {mode === "lien" ? (
        <input value={el.url || ""} onChange={(e) => maj({ url: e.target.value.trim() })} placeholder="Colle ici le lien (ex. https://youtu.be/…)" style={champ} />
      ) : (
        <label style={{ ...btn, justifyContent: "center", padding: "14px 12px", borderStyle: "dashed", borderWidth: 2, color: "var(--piste)", borderColor: "var(--piste)", fontSize: 14 }}>
          <input type="file" accept="video/*" onChange={(e) => { e.target.files[0] && envoyer(e.target.files[0]); e.target.value = ""; }} style={{ display: "none" }} />
          <Upload size={17} /> {el.url ? "Remplacer la vidéo" : "Choisir une vidéo (100 Mo maximum)"}
        </label>
      )}
      {erreur && <div style={{ fontSize: 12.5, color: "#c24b4b" }}>{erreur}</div>}
      <input value={el.legende || ""} onChange={(e) => maj({ legende: e.target.value })} placeholder="Légende (facultatif)" style={{ ...champ, fontSize: 13 }} />
      {el.url && <RenduVideo el={el} />}
    </div>
  );
}

function EditeurDocuments({ el, maj, envois }) {
  const elRef = useRef(el); elRef.current = el;
  const [erreur, setErreur] = useState("");
  const [lien, setLien] = useState({ nom: "", url: "" });
  const fichiers = el.fichiers || [];
  const ajouter = async (files) => {
    setErreur("");
    for (const f of Array.from(files)) {
      if (f.size > TAILLE_MAX_DOC) { setErreur(`« ${f.name} » est trop lourd (${tailleLisible(f.size)}, maximum 10 Mo).`); continue; }
      const cle = envois.debut(f.name);
      try {
        const estImage = f.type.startsWith("image/");
        const url = await envoyerFichier(estImage ? await compresserImage(f) : f, estImage ? "image" : "raw", (p) => envois.progres(cle, p));
        maj({ fichiers: [...(elRef.current.fichiers || []), { id: uid(), nom: f.name.replace(/\.[^.]+$/, ""), url, taille: f.size }] });
      } catch (e) { setErreur(`L'envoi de « ${f.name} » a échoué (${e.message}).`); }
      envois.fin(cle);
    }
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 10 }}>
      <label style={{ ...btn, justifyContent: "center", padding: "14px 12px", borderStyle: "dashed", borderWidth: 2, color: "var(--piste)", borderColor: "var(--piste)", fontSize: 14 }}>
        <input type="file" multiple accept=".pdf,.doc,.docx,.odt,.xls,.xlsx,.ods,.ppt,.pptx,.odp,.txt,image/*" onChange={(e) => { e.target.files.length && ajouter(e.target.files); e.target.value = ""; }} style={{ display: "none" }} />
        <Upload size={17} /> Ajouter des documents (PDF, Word, Excel… 10 Mo max)
      </label>
      {erreur && <div style={{ fontSize: 12.5, color: "#c24b4b" }}>{erreur}</div>}
      {fichiers.map((f) => (
        <div key={f.id} style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <FileText size={18} color="var(--piste)" />
          <input value={f.nom} onChange={(e) => maj({ fichiers: fichiers.map((x) => (x.id === f.id ? { ...x, nom: e.target.value } : x)) })} style={{ ...champ, fontSize: 13, padding: "6px 8px" }} title="Nom affiché sur le site" />
          <button type="button" onClick={() => maj({ fichiers: fichiers.filter((x) => x.id !== f.id) })} style={{ ...btn, padding: 7, color: "#c24b4b" }} title="Retirer"><Trash2 size={14} /></button>
        </div>
      ))}
      <details>
        <summary style={{ fontSize: 12.5, fontWeight: 700, color: "#6b6656", cursor: "pointer" }}>…ou ajouter un lien vers un document (Drive, ENT, site de l'UNSS…)</summary>
        <div style={{ display: "grid", gap: 6, marginTop: 8 }}>
          <input value={lien.nom} onChange={(e) => setLien({ ...lien, nom: e.target.value })} placeholder="Nom affiché (ex. Convocation)" style={{ ...champ, fontSize: 13 }} />
          <input value={lien.url} onChange={(e) => setLien({ ...lien, url: e.target.value })} placeholder="Adresse (https://…)" style={{ ...champ, fontSize: 13 }} />
          <button type="button" disabled={!/^https?:\/\//.test(lien.url.trim())} onClick={() => { maj({ fichiers: [...fichiers, { id: uid(), nom: lien.nom.trim() || "Document", url: lien.url.trim() }] }); setLien({ nom: "", url: "" }); }} style={{ ...btn, justifySelf: "start" }}><Link2 size={14} /> Ajouter le lien</button>
        </div>
      </details>
    </div>
  );
}

function EditeurTableauPub({ el, maj }) {
  const [ouvert, setOuvert] = useState(false);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 8 }}>
      <RenduTableau bloc={el} />
      <button type="button" onClick={() => setOuvert(true)} style={{ ...btn, justifySelf: "start", color: "var(--piste)", borderColor: "var(--piste)" }}><Table size={14} /> Remplir / modifier le tableau</button>
      {ouvert && (
        <FenetreTableau avecTitre titreInitial={el.titre} initial={{ entete: el.entete, lignes: el.lignes }}
          onValider={(t, titre) => { maj({ entete: t.entete, lignes: t.lignes, titre }); setOuvert(false); }} onFermer={() => setOuvert(false)} />
      )}
    </div>
  );
}

function EditeurElement({ el, maj, envois }) {
  switch (el.type) {
    case "soustitre": return <input value={el.texte} onChange={(e) => maj({ texte: e.target.value })} placeholder="Ex. Les filles championnes du district" style={{ ...champ, fontFamily: "'Oswald', sans-serif", fontSize: 17, fontWeight: 600 }} />;
    case "texte": return <ZoneTexteMd value={el.md} rows={5} onCommit={(v) => maj({ md: v })} />;
    case "info": return <ZoneTexteMd value={el.md} rows={4} onCommit={(v) => maj({ md: v })} placeholder="Ex. Rendez-vous mercredi 13 h devant le gymnase, prévoir une gourde." />;
    case "photos": return <EditeurPhotos el={el} maj={maj} envois={envois} />;
    case "video": return <EditeurVideo el={el} maj={maj} envois={envois} />;
    case "document": return <EditeurDocuments el={el} maj={maj} envois={envois} />;
    case "tableau": return <EditeurTableauPub el={el} maj={maj} />;
    default: return null;
  }
}

function BarreAjout({ onAjouter }) {
  return (
    <div style={{ display: "grid", gap: 6, gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}>
      {TYPES.map((t) => (
        <button key={t.id} type="button" onClick={() => onAjouter(t)} style={{ ...btn, justifyContent: "flex-start", padding: "11px 12px", fontSize: 13 }}>
          <Plus size={13} color="var(--piste)" /><t.Icon size={15} /> {t.label}
        </button>
      ))}
    </div>
  );
}

export function AssistantPublication({ pages, initial, rubriqueId, auteur, onPublier, onFermer }) {
  const nouvelle = !initial;
  const [art, setArt] = useState(() => {
    if (initial) return JSON.parse(JSON.stringify(initial));
    return { id: uid(), rubriqueId: rubriqueId || pages[0]?.id || "", titre: "", date: aujourdhui(), activite: "", elements: [], modele: null };
  });
  const [etape, setEtape] = useState(1);
  const [envoiPub, setEnvoiPub] = useState(false);
  const [autreActivite, setAutreActivite] = useState(() => !!art.activite && !ACTIVITES.includes(art.activite));
  const envois = useEnvois();
  const modifie = useRef(false);
  const corps = useRef(null);

  // brouillon (nouvelle publication) : reprise possible si le téléphone se met en veille ou la page se ferme
  useEffect(() => {
    if (!nouvelle) return;
    try {
      const b = JSON.parse(localStorage.getItem(CLE_BROUILLON) || "null");
      if (b && (b.titre || b.elements?.length) && confirm(`Reprendre la publication commencée « ${b.titre || "sans titre"} » ?`)) { setArt(b); modifie.current = true; }
      else localStorage.removeItem(CLE_BROUILLON);
    } catch {}
  }, []);
  useEffect(() => {
    if (!nouvelle || !modifie.current) return;
    try { localStorage.setItem(CLE_BROUILLON, JSON.stringify(art)); } catch {}
  }, [art]);
  useEffect(() => { corps.current?.scrollTo({ top: 0 }); }, [etape]);

  const majArt = (v) => { modifie.current = true; setArt((a) => ({ ...a, ...v })); };
  const majEl = (id, v) => { modifie.current = true; setArt((a) => ({ ...a, elements: a.elements.map((e) => (e.id === id ? { ...e, ...v } : e)) })); };
  const ajouterEl = (t) => {
    const el = { id: uid(), type: t.id, ...t.nouveau() };
    majArt({ elements: [...art.elements, el] });
    setTimeout(() => document.getElementById("el-" + el.id)?.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
  };
  const deplacerEl = (i, d) => { const j = i + d; if (j < 0 || j >= art.elements.length) return; const l = [...art.elements]; [l[i], l[j]] = [l[j], l[i]]; majArt({ elements: l }); };
  const retirerEl = (id) => { if (confirm("Retirer cet élément ?")) majArt({ elements: art.elements.filter((e) => e.id !== id) }); };
  const choisirModele = (m) => majArt({ modele: m.id, elements: m.elements() });

  const fermer = () => {
    if (modifie.current && !confirm(nouvelle ? "Fermer ? La publication commencée est gardée en brouillon sur cet appareil." : "Fermer sans enregistrer les modifications ?")) return;
    onFermer();
  };
  const erreurInfos = !art.titre.trim() ? "Donne un titre à la publication." : !art.rubriqueId ? "Choisis la page où publier." : "";
  const publier = async () => {
    if (erreurInfos) { setEtape(1); alert(erreurInfos); return; }
    if (envois.enCours) { alert("Attends la fin de l'envoi des fichiers."); return; }
    setEnvoiPub(true);
    // éléments vides retirés
    const elements = art.elements.filter((e) => {
      if (e.type === "soustitre") return e.texte?.trim();
      if (e.type === "texte" || e.type === "info") return e.md?.trim();
      if (e.type === "photos") return e.images?.length;
      if (e.type === "video") return e.url?.trim();
      if (e.type === "document") return e.fichiers?.length;
      if (e.type === "tableau") return e.lignes?.some((r) => r.some((c) => String(c).trim()));
      return true;
    });
    const { modele, ...reste } = art;
    const final = { ...reste, titre: art.titre.trim(), elements, auteur: initial?.auteur ?? auteur.nom, auteurId: initial?.auteurId ?? auteur.id, cree: initial?.cree ?? Date.now(), maj: Date.now() };
    const ok = await onPublier(final);
    setEnvoiPub(false);
    if (ok) { try { localStorage.removeItem(CLE_BROUILLON); } catch {} onFermer(); }
  };

  const ETAPES = ["Infos", "Contenu", "Vérifier et publier"];
  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 120, background: "rgba(16,24,38,0.6)", display: "flex", justifyContent: "center", padding: "max(8px, env(safe-area-inset-top)) 8px 8px" }}>
      <div style={{ background: "var(--fond, #f6f4ef)", borderRadius: 16, width: "min(900px, 100%)", display: "flex", flexDirection: "column", minHeight: 0, height: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.35)", overflow: "hidden" }}>
        {/* En-tête + étapes */}
        <div style={{ background: "var(--ink)", color: "#fff", padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="display" style={{ fontSize: 18, fontWeight: 600, flex: 1 }}>{nouvelle ? "Nouvelle publication" : "Modifier la publication"}</div>
            <button type="button" onClick={fermer} title="Fermer" style={{ ...btn, background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,0.3)", padding: 7 }}><X size={16} /></button>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {ETAPES.map((t, i) => (
              <button key={t} type="button" onClick={() => setEtape(i + 1)} style={{ flex: 1, border: "none", borderRadius: 8, padding: "7px 4px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", background: etape === i + 1 ? "var(--piste)" : "rgba(255,255,255,0.12)", color: "#fff" }}>
                {i + 1}. {t}
              </button>
            ))}
          </div>
        </div>

        <div ref={corps} style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: 16, display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 16, alignContent: "start" }}>
          {etape === 1 && (
            <>
              {pages.length > 1 && (
                <div>
                  <span style={etiquette}>Où publier ?</span>
                  <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                    {pages.map((p) => (
                      <button key={p.id} type="button" onClick={() => majArt({ rubriqueId: p.id })} style={{ ...btn, justifyContent: "flex-start", padding: "12px 14px", fontSize: 14, borderWidth: 2, borderColor: art.rubriqueId === p.id ? "var(--piste)" : "var(--ligne)", background: art.rubriqueId === p.id ? "var(--piste-soft)" : "#fff", color: "var(--ink)" }}>
                        {art.rubriqueId === p.id ? <Check size={16} color="var(--piste)" /> : <span style={{ width: 16 }} />} {p.titre}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label style={etiquette}>Titre *</label>
                <input value={art.titre} onChange={(e) => majArt({ titre: e.target.value })} placeholder="Ex. Badminton : les minimes 2e au départemental" style={{ ...champ, fontSize: 17, fontWeight: 600 }} autoFocus={nouvelle} />
              </div>
              <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                <div>
                  <label style={etiquette}>Date</label>
                  <input type="date" value={art.date} onChange={(e) => majArt({ date: e.target.value })} style={champ} />
                </div>
                <div>
                  <label style={etiquette}>Activité</label>
                  <select value={autreActivite ? "__autre" : art.activite} onChange={(e) => { const v = e.target.value; if (v === "__autre") { setAutreActivite(true); majArt({ activite: "" }); } else { setAutreActivite(false); majArt({ activite: v }); } }} style={champ}>
                    <option value="">— Aucune —</option>
                    {ACTIVITES.map((a) => <option key={a} value={a}>{a}</option>)}
                    <option value="__autre">Autre…</option>
                  </select>
                  {autreActivite && <input value={art.activite} onChange={(e) => majArt({ activite: e.target.value })} placeholder="Nom de l'activité" style={{ ...champ, marginTop: 6 }} />}
                </div>
              </div>
              {nouvelle && (
                <div>
                  <span style={etiquette}>Pour commencer, choisis un modèle (tu pourras tout changer)</span>
                  <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
                    {MODELES.map((m) => (
                      <button key={m.id} type="button" onClick={() => choisirModele(m)} style={{ ...btn, flexDirection: "column", alignItems: "flex-start", gap: 3, padding: "11px 13px", textAlign: "left", borderWidth: 2, borderColor: art.modele === m.id ? "var(--piste)" : "var(--ligne)", background: art.modele === m.id ? "var(--piste-soft)" : "#fff" }}>
                        <span style={{ fontSize: 14, color: "var(--ink)" }}>{art.modele === m.id && "✓ "}{m.titre}</span>
                        <span style={{ fontSize: 11.5, fontWeight: 500, color: "#6b6656" }}>{m.texte}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {etape === 2 && (
            <>
              <EnvoisEnCours envois={envois.envois} />
              {art.elements.length === 0 && (
                <div style={{ fontSize: 13.5, color: "#6b6656", textAlign: "center", padding: 8 }}>Ajoute des éléments avec les boutons ci-dessous : ils s'afficheront dans cet ordre.</div>
              )}
              {art.elements.map((el, i) => {
                const t = TYPES.find((x) => x.id === el.type);
                return (
                  <div key={el.id} id={"el-" + el.id} style={{ background: "#fff", border: "1px solid var(--ligne)", borderRadius: 12, padding: 12, display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {t && <t.Icon size={16} color="var(--piste)" />}
                      <span style={{ fontWeight: 700, fontSize: 13.5, flex: 1 }}>{t?.label}</span>
                      <button type="button" onClick={() => deplacerEl(i, -1)} disabled={i === 0} title="Monter" style={{ ...btn, padding: 6 }}><ChevronUp size={14} /></button>
                      <button type="button" onClick={() => deplacerEl(i, 1)} disabled={i === art.elements.length - 1} title="Descendre" style={{ ...btn, padding: 6 }}><ChevronDown size={14} /></button>
                      <button type="button" onClick={() => retirerEl(el.id)} title="Retirer" style={{ ...btn, padding: 6, color: "#c24b4b" }}><Trash2 size={14} /></button>
                    </div>
                    <EditeurElement el={el} maj={(v) => majEl(el.id, v)} envois={envois} />
                  </div>
                );
              })}
              <div style={{ background: "#fff", border: "1.5px dashed var(--piste)", borderRadius: 12, padding: 12, display: "grid", gap: 8 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--piste)" }}>Ajouter un élément</div>
                <BarreAjout onAjouter={ajouterEl} />
              </div>
            </>
          )}

          {etape === 3 && (
            <>
              <div style={{ fontSize: 13, color: "#6b6656", display: "flex", alignItems: "center", gap: 6 }}><Eye size={15} /> Voici ce que tout le monde verra sur le site :</div>
              {erreurInfos && <div style={{ color: "#c24b4b", fontWeight: 700, fontSize: 13.5 }}>⚠️ {erreurInfos}</div>}
              <div style={{ background: "#fff", border: "1px solid var(--ligne)", borderRadius: 14, padding: "18px 18px 8px" }}>
                <RenduArticle article={{ ...art, auteur: initial?.auteur ?? auteur.nom }} />
              </div>
            </>
          )}
        </div>

        {/* Boutons du bas */}
        <div style={{ display: "flex", gap: 8, padding: "10px 14px", borderTop: "1px solid var(--ligne)", background: "#fff", paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}>
          {etape > 1 && <button type="button" onClick={() => setEtape(etape - 1)} style={{ ...btn, padding: "11px 14px" }}><ChevronLeft size={15} /> Précédent</button>}
          <span style={{ flex: 1 }} />
          {etape < 3 && <button type="button" onClick={() => setEtape(etape + 1)} style={{ ...btn, padding: "11px 16px", background: "var(--ink)", color: "#fff", borderColor: "var(--ink)" }}>Suivant <ChevronRight size={15} /></button>}
          {etape >= 2 && (
            <button type="button" onClick={publier} disabled={envoiPub || envois.enCours} style={{ ...btn, padding: "11px 16px", background: "var(--piste)", color: "#fff", borderColor: "var(--piste)", opacity: envoiPub || envois.enCours ? 0.6 : 1 }}>
              <Check size={15} /> {envoiPub ? "Publication…" : envois.enCours ? "Envoi des fichiers…" : nouvelle ? "Publier" : "Enregistrer"}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
