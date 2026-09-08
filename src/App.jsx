import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Home, LayoutList, FolderOpen, Settings, Lock, Unlock, Plus, Trash2, Pencil,
  ChevronUp, ChevronDown, ChevronRight, ChevronLeft, ExternalLink, Image as ImageIcon,
  Video, FileText, Upload, X, Check, Link2, Save, ArrowLeft, Menu,
} from "lucide-react";

const uid = () => Math.random().toString(36).slice(2, 10);
const APP_VERSION = "0.1.0";

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
  }
}

// ---------- Données de départ (reprise du site existant) ----------
const SEED_RUBRIQUES = [
  {
    id: "musculation", titre: "Musculation", parentId: null, ordre: 0,
    page: { texte: "", fondCouleur: "#101826", fondImage: "", medias: [], liens: [] },
  },
  {
    id: "musculation-chezsoi", titre: "Muscu chez soi", parentId: "musculation", ordre: 0,
    page: { texte: "Séances de musculation à réaliser à la maison, sans matériel.", fondCouleur: "#ffffff", fondImage: "", medias: [], liens: [] },
  },
  {
    id: "musculation-hiit", titre: "Entraînement HIIT", parentId: "musculation", ordre: 1,
    page: { texte: "Séances d'entraînement fractionné à haute intensité.", fondCouleur: "#ffffff", fondImage: "", medias: [], liens: [] },
  },
  {
    id: "musculation-jeu", titre: "Jeu de l'Oie", parentId: "musculation", ordre: 2,
    page: { texte: "Version ludique d'une séance de musculation.", fondCouleur: "#ffffff", fondImage: "", medias: [], liens: [] },
  },
  {
    id: "musculation-theorie", titre: "Théorie", parentId: "musculation", ordre: 3,
    page: { texte: "Notions théoriques autour de la musculation.", fondCouleur: "#ffffff", fondImage: "", medias: [], liens: [] },
  },
  {
    id: "sopra", titre: "Sopra Flashmob", parentId: null, ordre: 1,
    page: { texte: "", fondCouleur: "#101826", fondImage: "", medias: [], liens: [] },
  },
  {
    id: "sopra-flashmob", titre: "En mode flashmob", parentId: "sopra", ordre: 0,
    page: {
      texte: "Chorégraphie collective sur Sopra.",
      fondCouleur: "#ffffff", fondImage: "", medias: [],
      liens: [{ id: uid(), label: "Playlist Chorés (YouTube)", url: "https://www.youtube.com/playlist?list=PL7ZFD8B4khX1Iw7hNSVHNJPJZM8U9A4BY" }],
    },
  },
  {
    id: "echauffement", titre: "L'échauffement", parentId: null, ordre: 2,
    page: { texte: "Protocoles d'échauffement avant les séances d'EPS.", fondCouleur: "#ffffff", fondImage: "", medias: [], liens: [] },
  },
  {
    id: "sportsante", titre: "Sport & Santé", parentId: null, ordre: 3,
    page: { texte: "", fondCouleur: "#101826", fondImage: "", medias: [], liens: [] },
  },
  {
    id: "sportsante-alim", titre: "L'alimentation", parentId: "sportsante", ordre: 0,
    page: { texte: "Repères sur l'alimentation du sportif.", fondCouleur: "#ffffff", fondImage: "", medias: [], liens: [] },
  },
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

function fichierVersDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ---------- En-tête / navigation publique ----------
function EnTete({ arbre, ecran, allerA, adminDeverrouille, allerAdmin }) {
  const [menuOuvert, setMenuOuvert] = useState(false);
  return (
    <header style={{ background: "var(--ink)", color: "#fff", position: "sticky", top: 0, zIndex: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px" }}>
        <button onClick={() => { allerA({ type: "accueil" }); setMenuOuvert(false); }} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: 0 }}>
          <span className="display" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1 }}>ASEPS</span>
          <span style={{ fontSize: 10.5, opacity: 0.65, letterSpacing: 0.4 }}>Lycée Georges-Brassens</span>
        </button>
        <button onClick={() => setMenuOuvert((v) => !v)} style={{ background: "none", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, color: "#fff", padding: 7, cursor: "pointer" }}>
          <Menu size={18} />
        </button>
      </div>
      {menuOuvert && (
        <nav style={{ borderTop: "1px solid rgba(255,255,255,0.12)", padding: "6px 10px 12px" }}>
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
function PageAccueil({ arbre, liens, allerA }) {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #101826, #1c2940)", color: "#fff", padding: "44px 20px 36px" }}>
        <div className="display" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.1 }}>
          L'EPS au lycée<br />Georges-Brassens
        </div>
        <div style={{ marginTop: 10, fontSize: 14, opacity: 0.8, maxWidth: 480 }}>
          Ressources d'enseignement, actualités de l'Association Sportive et documents utiles,
          rassemblés par l'équipe EPS.
        </div>
      </div>

      <div style={{ padding: 20 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#6b6656", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
          Enseignements
        </div>
        <div style={{ display: "grid", gap: 10 }}>
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
function PageRubrique({ rubrique, sousRubriques, allerA, parent }) {
  const p = rubrique.page || {};
  const fondImage = p.fondImage ? `url(${p.fondImage})` : null;
  return (
    <div>
      <div
        style={{
          background: fondImage ? `${fondImage} center/cover no-repeat` : (p.fondCouleur || "#101826"),
          color: estFonce(p.fondCouleur) ? "#fff" : "#101826",
          padding: "30px 20px",
        }}
      >
        {parent && (
          <button onClick={() => allerA({ type: "rubrique", id: parent.id })} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "inherit", opacity: 0.75, fontSize: 12, cursor: "pointer", padding: 0, marginBottom: 8 }}>
            <ArrowLeft size={13} /> {parent.titre}
          </button>
        )}
        <div className="display" style={{ fontSize: 24, fontWeight: 600 }}>{rubrique.titre}</div>
      </div>

      <div style={{ padding: 20 }}>
        {p.texte && <p style={{ fontSize: 14, lineHeight: 1.6, color: "#101826", whiteSpace: "pre-wrap" }}>{p.texte}</p>}

        {sousRubriques.length > 0 && (
          <div style={{ display: "grid", gap: 8, marginTop: 6, marginBottom: 18 }}>
            {sousRubriques.map((s) => (
              <button key={s.id} onClick={() => allerA({ type: "rubrique", id: s.id })} style={{ textAlign: "left", border: "1px solid var(--ligne)", borderRadius: 10, padding: "11px 14px", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13.5, fontWeight: 600 }}>{s.titre}</span>
                <ChevronRight size={16} color="#6b6656" />
              </button>
            ))}
          </div>
        )}

        {(p.medias || []).length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10, marginBottom: 18 }}>
            {p.medias.map((m) => (
              <div key={m.id} style={{ border: "1px solid var(--ligne)", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
                {m.type === "video" ? (
                  <video src={m.url} controls style={{ width: "100%", display: "block", aspectRatio: "4/3", objectFit: "cover" }} />
                ) : (
                  <img src={m.url} alt={m.legende || ""} style={{ width: "100%", display: "block", aspectRatio: "4/3", objectFit: "cover" }} />
                )}
                {m.legende && <div style={{ fontSize: 11, padding: "5px 8px", color: "#6b6656" }}>{m.legende}</div>}
              </div>
            ))}
          </div>
        )}

        {(p.liens || []).length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {p.liens.map((l) => (
              <a key={l.id} href={l.url} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 600, color: "#101826", background: "#fff", border: "1px solid var(--ligne)", borderRadius: 8, padding: "7px 10px", textDecoration: "none" }}>
                <ExternalLink size={12} /> {l.label}
              </a>
            ))}
          </div>
        )}

        {!p.texte && sousRubriques.length === 0 && (p.medias || []).length === 0 && (p.liens || []).length === 0 && (
          <div style={{ color: "#9a9384", fontSize: 13, fontStyle: "italic" }}>Cette page n'a pas encore de contenu.</div>
        )}
      </div>
    </div>
  );
}
function estFonce(couleur) {
  if (!couleur) return true;
  const hex = couleur.replace("#", "");
  if (hex.length !== 6) return true;
  const r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 140;
}

// ---------- Page Documents (publique) ----------
function PageDocuments({ documents }) {
  return (
    <div style={{ padding: 20 }}>
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
function AdminRubriques({ rubriques, setRubriques, ongletChoisi, setOngletChoisi }) {
  const arbre = useMemo(() => construireArbre(rubriques), [rubriques]);

  const ajouterRubrique = (parentId) => {
    const titre = prompt(parentId ? "Nom de la nouvelle sous-rubrique :" : "Nom de la nouvelle rubrique :");
    if (!titre || !titre.trim()) return;
    const freres = rubriques.filter((r) => r.parentId === (parentId || null));
    const nouvelle = { id: uid(), titre: titre.trim(), parentId: parentId || null, ordre: freres.length, page: { texte: "", fondCouleur: "#ffffff", fondImage: "", medias: [], liens: [] } };
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
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "#6b6656", textTransform: "uppercase", letterSpacing: 0.5 }}>Rubriques du site</div>
        <button onClick={() => ajouterRubrique(null)} style={boutonPrimaire}>
          <Plus size={13} /> Rubrique
        </button>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {arbre.map((r) => (
          <div key={r.id}>
            <LigneRubrique
              rubrique={r} niveau={0} actif={ongletChoisi === r.id}
              onChoisir={() => setOngletChoisi(r.id)} onRenommer={() => renommer(r.id)}
              onSupprimer={() => supprimer(r.id)} onMonter={() => deplacer(r.id, "haut")} onDescendre={() => deplacer(r.id, "bas")}
              onAjouterEnfant={() => ajouterRubrique(r.id)}
            />
            {r.enfants.map((s) => (
              <LigneRubrique
                key={s.id} rubrique={s} niveau={1} actif={ongletChoisi === s.id}
                onChoisir={() => setOngletChoisi(s.id)} onRenommer={() => renommer(s.id)}
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

// ---------- Espace admin : édition d'une page ----------
function AdminEditeurPage({ rubrique, rubriques, setRubriques }) {
  const [texte, setTexte] = useState(rubrique.page.texte || "");
  const [fondCouleur, setFondCouleur] = useState(rubrique.page.fondCouleur || "#ffffff");
  const [fondImage, setFondImage] = useState(rubrique.page.fondImage || "");
  const [nouveauLienLabel, setNouveauLienLabel] = useState("");
  const [nouveauLienUrl, setNouveauLienUrl] = useState("");
  const [nouveauMediaUrl, setNouveauMediaUrl] = useState("");
  const [nouveauMediaType, setNouveauMediaType] = useState("image");
  const [nouveauMediaLegende, setNouveauMediaLegende] = useState("");

  useEffect(() => {
    setTexte(rubrique.page.texte || "");
    setFondCouleur(rubrique.page.fondCouleur || "#ffffff");
    setFondImage(rubrique.page.fondImage || "");
  }, [rubrique.id]);

  const majPage = (patch) => {
    setRubriques(rubriques.map((r) => r.id === rubrique.id ? { ...r, page: { ...r.page, ...patch } } : r));
  };

  const importerFondImage = async (file) => {
    const dataUrl = await fichierVersDataUrl(file);
    setFondImage(dataUrl);
    majPage({ fondImage: dataUrl });
  };
  const importerMediaFichier = async (file) => {
    const dataUrl = await fichierVersDataUrl(file);
    const type = file.type.startsWith("video") ? "video" : "image";
    majPage({ medias: [...(rubrique.page.medias || []), { id: uid(), type, url: dataUrl, legende: "" }] });
  };
  const ajouterMediaUrl = () => {
    if (!nouveauMediaUrl.trim()) return;
    majPage({ medias: [...(rubrique.page.medias || []), { id: uid(), type: nouveauMediaType, url: nouveauMediaUrl.trim(), legende: nouveauMediaLegende.trim() }] });
    setNouveauMediaUrl(""); setNouveauMediaLegende("");
  };
  const supprimerMedia = (id) => majPage({ medias: (rubrique.page.medias || []).filter((m) => m.id !== id) });
  const ajouterLien = () => {
    if (!nouveauLienLabel.trim() || !nouveauLienUrl.trim()) return;
    majPage({ liens: [...(rubrique.page.liens || []), { id: uid(), label: nouveauLienLabel.trim(), url: nouveauLienUrl.trim() }] });
    setNouveauLienLabel(""); setNouveauLienUrl("");
  };
  const supprimerLien = (id) => majPage({ liens: (rubrique.page.liens || []).filter((l) => l.id !== id) });

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div>
        <div style={champLabel}>Texte de la page</div>
        <textarea
          value={texte} onChange={(e) => setTexte(e.target.value)} onBlur={() => majPage({ texte })}
          rows={5} placeholder="Contenu de la page…"
          style={{ width: "100%", padding: 10, borderRadius: 9, border: "1px solid var(--ligne)", fontSize: 13.5, fontFamily: "inherit", resize: "vertical" }}
        />
      </div>

      <div>
        <div style={champLabel}>Fond de la page</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <input type="color" value={fondCouleur} onChange={(e) => { setFondCouleur(e.target.value); majPage({ fondCouleur: e.target.value }); }} style={{ width: 44, height: 36, border: "1px solid var(--ligne)", borderRadius: 7, padding: 2, cursor: "pointer" }} />
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "var(--piste)", cursor: "pointer" }}>
            <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && importerFondImage(e.target.files[0])} style={{ display: "none" }} />
            <Upload size={13} /> Image de fond
          </label>
          {fondImage && (
            <button onClick={() => { setFondImage(""); majPage({ fondImage: "" }); }} style={{ ...iconBtn, color: "#c24b4b" }} title="Retirer l'image de fond"><X size={13} /></button>
          )}
        </div>
        {fondImage && <img src={fondImage} alt="" style={{ marginTop: 8, width: 90, height: 60, objectFit: "cover", borderRadius: 8, border: "1px solid var(--ligne)" }} />}
      </div>

      <div>
        <div style={champLabel}>Photos / vidéos</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 8, marginBottom: 10 }}>
          {(rubrique.page.medias || []).map((m) => (
            <div key={m.id} style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: "1px solid var(--ligne)", aspectRatio: "1" }}>
              {m.type === "video" ? <video src={m.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <img src={m.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
              <button onClick={() => supprimerMedia(m.id)} style={{ position: "absolute", top: 3, right: 3, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: 5, padding: 3, cursor: "pointer", display: "flex" }}>
                <X size={11} color="#fff" />
              </button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "var(--piste)", cursor: "pointer" }}>
            <input type="file" accept="image/*,video/*" onChange={(e) => e.target.files[0] && importerMediaFichier(e.target.files[0])} style={{ display: "none" }} />
            <Upload size={13} /> Importer un fichier
          </label>
          <select value={nouveauMediaType} onChange={(e) => setNouveauMediaType(e.target.value)} style={champStyle(80)}>
            <option value="image">Photo</option>
            <option value="video">Vidéo</option>
          </select>
          <input value={nouveauMediaUrl} onChange={(e) => setNouveauMediaUrl(e.target.value)} placeholder="…ou coller une URL" style={champStyle(160)} />
          <input value={nouveauMediaLegende} onChange={(e) => setNouveauMediaLegende(e.target.value)} placeholder="Légende (optionnel)" style={champStyle(120)} />
          <button onClick={ajouterMediaUrl} style={boutonPrimaire}><Plus size={13} /> Ajouter</button>
        </div>
        <div style={{ fontSize: 10.5, color: "#9a9384", marginTop: 4 }}>
          Les fichiers importés sont stockés sur cet appareil ; pour un contenu partagé (dépôts des collègues), on passera par le stockage en ligne à l'étape suivante.
        </div>
      </div>

      <div>
        <div style={champLabel}>Liens externes</div>
        <div style={{ display: "grid", gap: 6, marginBottom: 10 }}>
          {(rubrique.page.liens || []).map((l) => (
            <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--ligne)", borderRadius: 8, padding: "7px 10px" }}>
              <Link2 size={13} color="#6b6656" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600 }}>{l.label}</div>
                <div style={{ fontSize: 11, color: "#9a9384", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.url}</div>
              </div>
              <button onClick={() => supprimerLien(l.id)} style={{ ...iconBtn, color: "#c24b4b" }}><Trash2 size={12} /></button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <input value={nouveauLienLabel} onChange={(e) => setNouveauLienLabel(e.target.value)} placeholder="Libellé" style={champStyle(120)} />
          <input value={nouveauLienUrl} onChange={(e) => setNouveauLienUrl(e.target.value)} placeholder="https://…" style={champStyle(180)} />
          <button onClick={ajouterLien} style={boutonPrimaire}><Plus size={13} /> Ajouter</button>
        </div>
      </div>
    </div>
  );
}
const champLabel = { fontSize: 11.5, fontWeight: 700, color: "#6b6656", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 6 };
const champStyle = (largeur) => ({ width: largeur, padding: "7px 9px", borderRadius: 7, border: "1px solid var(--ligne)", fontSize: 12.5, fontFamily: "inherit" });

// ---------- Espace admin : documents & liens globaux ----------
function AdminDocuments({ documents, setDocuments }) {
  const importer = async (file) => {
    const dataUrl = await fichierVersDataUrl(file);
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
function EspaceAdmin({ rubriques, setRubriques, documents, setDocuments, liens, setLiens, onVerrouiller }) {
  const [onglet, setOnglet] = useState("rubriques"); // rubriques | documents | liens
  const [rubriqueChoisie, setRubriqueChoisie] = useState(null);
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
          { id: "rubriques", label: "Rubriques & pages" },
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
          <AdminRubriques rubriques={rubriques} setRubriques={setRubriques} ongletChoisi={rubriqueChoisie} setOngletChoisi={setRubriqueChoisie} />
          {rubrique && (
            <div style={{ borderTop: "1px solid var(--ligne)", paddingTop: 16 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#6b6656", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
                Contenu de la page « {rubrique.titre} »
              </div>
              <AdminEditeurPage rubrique={rubrique} rubriques={rubriques} setRubriques={setRubriques} />
            </div>
          )}
        </div>
      )}
      {onglet === "documents" && <AdminDocuments documents={documents} setDocuments={setDocuments} />}
      {onglet === "liens" && <AdminLiens liens={liens} setLiens={setLiens} />}
    </div>
  );
}

// ---------- App racine ----------
export default function App() {
  const [rubriques, setRubriquesState] = useState(() => lsLire("rubriques", SEED_RUBRIQUES));
  const [documents, setDocumentsState] = useState(() => lsLire("documents", []));
  const [liens, setLiensState] = useState(() => lsLire("liens", SEED_LIENS));
  const [pinAdmin] = useState(() => lsLire("pinAdmin", "1234"));
  const [adminDeverrouille, setAdminDeverrouille] = useState(false);
  const [cadenasOuvert, setCadenasOuvert] = useState(false);
  const [ecran, setEcran] = useState({ type: "accueil" });

  const setRubriques = (v) => { setRubriquesState(v); lsEcrire("rubriques", v); };
  const setDocuments = (v) => { setDocumentsState(v); lsEcrire("documents", v); };
  const setLiens = (v) => { setLiensState(v); lsEcrire("liens", v); };

  const arbre = useMemo(() => construireArbre(rubriques), [rubriques]);

  const allerAdmin = () => {
    if (adminDeverrouille) setEcran({ type: "admin" });
    else setCadenasOuvert(true);
  };

  let corps;
  if (ecran.type === "rubrique") {
    const r = rubriques.find((x) => x.id === ecran.id);
    const sousRubriques = rubriques.filter((x) => x.parentId === r.id).sort((a, b) => a.ordre - b.ordre);
    const parent = r.parentId ? rubriques.find((x) => x.id === r.parentId) : null;
    corps = <PageRubrique rubrique={r} sousRubriques={sousRubriques} allerA={setEcran} parent={parent} />;
  } else if (ecran.type === "documents") {
    corps = <PageDocuments documents={documents} />;
  } else if (ecran.type === "admin" && adminDeverrouille) {
    corps = (
      <EspaceAdmin
        rubriques={rubriques} setRubriques={setRubriques}
        documents={documents} setDocuments={setDocuments}
        liens={liens} setLiens={setLiens}
        onVerrouiller={() => { setAdminDeverrouille(false); setEcran({ type: "accueil" }); }}
      />
    );
  } else {
    corps = <PageAccueil arbre={arbre} liens={liens} allerA={setEcran} />;
  }

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 30 }}>
      <EnTete arbre={arbre} ecran={ecran} allerA={setEcran} adminDeverrouille={adminDeverrouille} allerAdmin={allerAdmin} />
      {corps}
      <div style={{ textAlign: "center", fontSize: 10.5, color: "#b3ac9c", marginTop: 30 }}>
        ASEPS by C. Guilhem <span style={{ opacity: 0.6 }}>· v{APP_VERSION}</span>
      </div>
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
