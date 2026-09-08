import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Home, LayoutList, FolderOpen, Lock, Unlock, Plus, Trash2, Pencil,
  ChevronUp, ChevronDown, ChevronRight, ExternalLink, Image as ImageIcon,
  Video, FileText, Upload, X, Link2, ArrowLeft, Menu, Images, Type, LayoutTemplate, GripVertical,
} from "lucide-react";

const uid = () => Math.random().toString(36).slice(2, 10);
const APP_VERSION = "0.2.0";

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

function fichierVersDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
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

const SEED_RUBRIQUES = [
  { id: "musculation", titre: "Musculation", parentId: null, ordre: 0, page: { blocs: [] } },
  { id: "musculation-chezsoi", titre: "Muscu chez soi", parentId: "musculation", ordre: 0, page: { blocs: [blocTexte("Séances de musculation à réaliser à la maison, sans matériel.")] } },
  { id: "musculation-hiit", titre: "Entraînement HIIT", parentId: "musculation", ordre: 1, page: { blocs: [blocTexte("Séances d'entraînement fractionné à haute intensité.")] } },
  { id: "musculation-jeu", titre: "Jeu de l'Oie", parentId: "musculation", ordre: 2, page: { blocs: [blocTexte("Version ludique d'une séance de musculation.")] } },
  { id: "musculation-theorie", titre: "Théorie", parentId: "musculation", ordre: 3, page: { blocs: [blocTexte("Notions théoriques autour de la musculation.")] } },
  { id: "sopra", titre: "Sopra Flashmob", parentId: null, ordre: 1, page: { blocs: [] } },
  {
    id: "sopra-flashmob", titre: "En mode flashmob", parentId: "sopra", ordre: 0,
    page: { blocs: [blocTexte("Chorégraphie collective sur Sopra."), blocLiens([{ label: "Playlist Chorés (YouTube)", url: "https://www.youtube.com/playlist?list=PL7ZFD8B4khX1Iw7hNSVHNJPJZM8U9A4BY" }])] },
  },
  { id: "echauffement", titre: "L'échauffement", parentId: null, ordre: 2, page: { blocs: [blocTexte("Protocoles d'échauffement avant les séances d'EPS.")] } },
  { id: "sportsante", titre: "Sport & Santé", parentId: null, ordre: 3, page: { blocs: [] } },
  { id: "sportsante-alim", titre: "L'alimentation", parentId: "sportsante", ordre: 0, page: { blocs: [blocTexte("Repères sur l'alimentation du sportif.")] } },
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

// ---------- Rendu public des blocs ----------
function RenduBlocs({ blocs }) {
  return (
    <div>
      {(blocs || []).map((b) => <RenduBloc key={b.id} bloc={b} />)}
    </div>
  );
}
function RenduBloc({ bloc }) {
  if (bloc.type === "bandeau") {
    const fondImg = bloc.fondType === "image" && bloc.fondImage ? bloc.fondImage : null;
    const clair = !estFonce(bloc.fondType === "couleur" ? bloc.fondCouleur : "#101826");
    return (
      <div style={{ position: "relative", minHeight: 200, display: "flex", alignItems: "flex-end", overflow: "hidden", background: bloc.fondType === "couleur" ? (bloc.fondCouleur || "#101826") : "#101826" }}>
        {fondImg && <img src={fondImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
        {bloc.fondType === "diaporama" && bloc.diaporamaImages?.length > 0 && (
          <Diaporama images={bloc.diaporamaImages} vitesse={bloc.vitesse} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        )}
        {(fondImg || bloc.fondType === "diaporama") && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,24,38,0.15), rgba(16,24,38,0.75))" }} />}
        <div style={{ position: "relative", padding: "34px 20px 28px", color: clair ? "#101826" : "#fff" }}>
          {bloc.titre && <div className="display" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.15 }}>{bloc.titre}</div>}
          {bloc.texte && <div style={{ marginTop: 8, fontSize: 13.5, opacity: 0.85, maxWidth: 480 }}>{bloc.texte}</div>}
        </div>
      </div>
    );
  }
  if (bloc.type === "texte") {
    if (!bloc.texte) return null;
    return <div style={{ padding: "16px 20px 4px", fontSize: 14, lineHeight: 1.6, color: "#101826", whiteSpace: "pre-wrap" }}>{bloc.texte}</div>;
  }
  if (bloc.type === "image") {
    if (!bloc.url) return null;
    return (
      <div style={{ padding: "10px 20px" }}>
        <img src={bloc.url} alt={bloc.legende || ""} style={{ width: "100%", borderRadius: 12, border: "1px solid var(--ligne)", display: "block" }} />
        {bloc.legende && <div style={{ fontSize: 11.5, color: "#6b6656", marginTop: 6 }}>{bloc.legende}</div>}
      </div>
    );
  }
  if (bloc.type === "video") {
    if (!bloc.url) return null;
    return (
      <div style={{ padding: "10px 20px" }}>
        <video src={bloc.url} controls style={{ width: "100%", borderRadius: 12, border: "1px solid var(--ligne)", display: "block" }} />
        {bloc.legende && <div style={{ fontSize: 11.5, color: "#6b6656", marginTop: 6 }}>{bloc.legende}</div>}
      </div>
    );
  }
  if (bloc.type === "diaporama") {
    if (!bloc.images || bloc.images.length === 0) return null;
    return (
      <div style={{ padding: "10px 20px" }}>
        <Diaporama images={bloc.images} vitesse={bloc.vitesse} style={{ width: "100%", aspectRatio: "16/9", borderRadius: 12, border: "1px solid var(--ligne)" }} />
      </div>
    );
  }
  if (bloc.type === "liens") {
    if (!bloc.liens || bloc.liens.length === 0) return null;
    return (
      <div style={{ padding: "12px 20px", display: "flex", flexWrap: "wrap", gap: 8 }}>
        {bloc.liens.map((l) => (
          <a key={l.id} href={l.url} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 600, color: "#101826", background: "#fff", border: "1px solid var(--ligne)", borderRadius: 8, padding: "7px 10px", textDecoration: "none" }}>
            <ExternalLink size={12} /> {l.label}
          </a>
        ))}
      </div>
    );
  }
  return null;
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
function PageAccueil({ pageAccueil, arbre, liens, allerA }) {
  return (
    <div>
      <RenduBlocs blocs={pageAccueil.blocs} />
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
  return (
    <div>
      {parent && (
        <div style={{ padding: "14px 20px 0" }}>
          <button onClick={() => allerA({ type: "rubrique", id: parent.id })} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#6b6656", fontSize: 12, cursor: "pointer", padding: 0 }}>
            <ArrowLeft size={13} /> {parent.titre}
          </button>
        </div>
      )}
      <div style={{ padding: "10px 20px 0" }}>
        <div className="display" style={{ fontSize: 22, fontWeight: 600 }}>{rubrique.titre}</div>
      </div>

      <RenduBlocs blocs={rubrique.page.blocs} />

      {sousRubriques.length > 0 && (
        <div style={{ display: "grid", gap: 8, margin: "6px 20px 18px" }}>
          {sousRubriques.map((s) => (
            <button key={s.id} onClick={() => allerA({ type: "rubrique", id: s.id })} style={{ textAlign: "left", border: "1px solid var(--ligne)", borderRadius: 10, padding: "11px 14px", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>{s.titre}</span>
              <ChevronRight size={16} color="#6b6656" />
            </button>
          ))}
        </div>
      )}

      {(rubrique.page.blocs || []).length === 0 && sousRubriques.length === 0 && (
        <div style={{ padding: "0 20px 20px", color: "#9a9384", fontSize: 13, fontStyle: "italic" }}>Cette page n'a pas encore de contenu.</div>
      )}
    </div>
  );
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
  { id: "liens", label: "Liens externes", Icon: Link2 },
];
function nouveauBloc(type) {
  const base = { id: uid(), type };
  if (type === "bandeau") return { ...base, fondType: "couleur", fondCouleur: "#101826", fondImage: "", diaporamaImages: [], vitesse: 4, titre: "", texte: "" };
  if (type === "texte") return { ...base, texte: "" };
  if (type === "image") return { ...base, url: "", legende: "" };
  if (type === "video") return { ...base, url: "", legende: "" };
  if (type === "diaporama") return { ...base, images: [], vitesse: 4 };
  if (type === "liens") return { ...base, liens: [] };
  return base;
}

// ---------- Espace admin : éditeur de blocs (page d'accueil ET rubriques) ----------
function AdminEditeurBlocs({ page, onChange }) {
  const blocs = page.blocs || [];
  const [typeAAjouter, setTypeAAjouter] = useState("texte");
  const dragId = useRef(null);

  const majBlocs = (nouveaux) => onChange({ ...page, blocs: nouveaux });
  const majBloc = (id, patch) => majBlocs(blocs.map((b) => b.id === id ? { ...b, ...patch } : b));
  const supprimerBloc = (id) => majBlocs(blocs.filter((b) => b.id !== id));
  const deplacerBloc = (id, sens) => {
    const idx = blocs.findIndex((b) => b.id === id);
    const cible = sens === "haut" ? idx - 1 : idx + 1;
    if (cible < 0 || cible >= blocs.length) return;
    const copie = [...blocs];
    [copie[idx], copie[cible]] = [copie[cible], copie[idx]];
    majBlocs(copie);
  };
  const ajouterBloc = () => majBlocs([...blocs, nouveauBloc(typeAAjouter)]);

  // Glisser-déposer (souris/ordinateur) — en complément des flèches (fiables aussi au tactile)
  const onDragStart = (id) => (e) => { dragId.current = id; e.dataTransfer.effectAllowed = "move"; };
  const onDragOver = (id) => (e) => { e.preventDefault(); };
  const onDrop = (id) => (e) => {
    e.preventDefault();
    if (!dragId.current || dragId.current === id) return;
    const idxSrc = blocs.findIndex((b) => b.id === dragId.current);
    const idxDst = blocs.findIndex((b) => b.id === id);
    if (idxSrc === -1 || idxDst === -1) return;
    const copie = [...blocs];
    const [retire] = copie.splice(idxSrc, 1);
    copie.splice(idxDst, 0, retire);
    majBlocs(copie);
    dragId.current = null;
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {blocs.length === 0 && <div style={{ fontSize: 12.5, color: "#9a9384", fontStyle: "italic" }}>Aucun bloc pour l'instant — ajoute-en un ci-dessous.</div>}
      {blocs.map((b) => {
        const meta = TYPES_BLOC.find((t) => t.id === b.type);
        return (
          <div
            key={b.id}
            draggable
            onDragStart={onDragStart(b.id)}
            onDragOver={onDragOver(b.id)}
            onDrop={onDrop(b.id)}
            style={{ border: "1px solid var(--ligne)", borderRadius: 10, padding: 12, background: "#fff" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <GripVertical size={14} color="#c7c1b2" style={{ cursor: "grab" }} />
              {meta?.Icon && <meta.Icon size={13} color="var(--piste)" />}
              <span style={{ fontSize: 12, fontWeight: 700, color: "#6b6656", flex: 1 }}>{meta?.label || b.type}</span>
              <button onClick={() => deplacerBloc(b.id, "haut")} title="Monter" style={iconBtn}><ChevronUp size={13} /></button>
              <button onClick={() => deplacerBloc(b.id, "bas")} title="Descendre" style={iconBtn}><ChevronDown size={13} /></button>
              <button onClick={() => supprimerBloc(b.id)} title="Supprimer" style={{ ...iconBtn, color: "#c24b4b" }}><Trash2 size={13} /></button>
            </div>
            <EditeurContenuBloc bloc={b} majBloc={(patch) => majBloc(b.id, patch)} />
          </div>
        );
      })}

      <div style={{ display: "flex", gap: 6, alignItems: "center", borderTop: blocs.length > 0 ? "1px solid var(--ligne)" : "none", paddingTop: blocs.length > 0 ? 12 : 0 }}>
        <select value={typeAAjouter} onChange={(e) => setTypeAAjouter(e.target.value)} style={champStyle(190)}>
          {TYPES_BLOC.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
        <button onClick={ajouterBloc} style={boutonPrimaire}><Plus size={13} /> Ajouter un bloc</button>
      </div>
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
function EspaceAdmin({ rubriques, setRubriques, pageAccueil, setPageAccueil, documents, setDocuments, liens, setLiens, onVerrouiller }) {
  const [onglet, setOnglet] = useState("rubriques");
  const [rubriqueChoisie, setRubriqueChoisie] = useState(null);
  const [pageAccueilChoisie, setPageAccueilChoisie] = useState(false);
  const rubrique = rubriques.find((r) => r.id === rubriqueChoisie);

  const majPageRubrique = (page) => setRubriques(rubriques.map((r) => r.id === rubrique.id ? { ...r, page } : r));

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
              <AdminEditeurBlocs page={pageAccueil} onChange={setPageAccueil} />
            </div>
          )}
          {!pageAccueilChoisie && rubrique && (
            <div style={{ borderTop: "1px solid var(--ligne)", paddingTop: 16 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#6b6656", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
                Contenu de la page « {rubrique.titre} »
              </div>
              <AdminEditeurBlocs page={rubrique.page} onChange={majPageRubrique} />
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
  const [pageAccueil, setPageAccueilState] = useState(() => lsLire("pageAccueil", PAGE_ACCUEIL_SEED));
  const [documents, setDocumentsState] = useState(() => lsLire("documents", []));
  const [liens, setLiensState] = useState(() => lsLire("liens", SEED_LIENS));
  const [pinAdmin] = useState(() => lsLire("pinAdmin", "1234"));
  const [adminDeverrouille, setAdminDeverrouille] = useState(false);
  const [cadenasOuvert, setCadenasOuvert] = useState(false);
  const [ecran, setEcran] = useState({ type: "accueil" });

  const setRubriques = (v) => { setRubriquesState(v); lsEcrire("rubriques", v); };
  const setPageAccueil = (v) => { setPageAccueilState(v); lsEcrire("pageAccueil", v); };
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
        pageAccueil={pageAccueil} setPageAccueil={setPageAccueil}
        documents={documents} setDocuments={setDocuments}
        liens={liens} setLiens={setLiens}
        onVerrouiller={() => { setAdminDeverrouille(false); setEcran({ type: "accueil" }); }}
      />
    );
  } else {
    corps = <PageAccueil pageAccueil={pageAccueil} arbre={arbre} liens={liens} allerA={setEcran} />;
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
