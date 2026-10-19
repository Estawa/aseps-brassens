import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { BarreFormat, styleBouton } from "./format.jsx";
import { EditeurVisuel } from "./visuel.jsx";
import { X, Plus, Trash2, ChevronUp, ChevronDown, Eye, EyeOff, Heading, Bold, Italic, List, ListOrdered, Table, Wand, Maximize2, Minimize2 } from "lucide-react";
import { Markdown } from "./cours.jsx";

// =====================================================================
// Page type (modèle) : génère une page sur le même principe que
// « Musculation › Théorie », « L'alimentation » ou « L'échauffement » :
//   une phrase d'introduction + des parties dépliables, chacune avec
//   ses sous-titres (### …), listes, tableaux, gras.
// =====================================================================

const uid = () => Math.random().toString(36).slice(2, 10);

function slug(texte) {
  return (texte || "page")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    .slice(0, 30) || "page";
}

export const EXEMPLE_PARTIE = `Une ou deux phrases pour présenter la partie.

### Premier sous-titre

Un paragraphe d'explication, avec un mot important en **gras**.

- premier point
- deuxième point

### Deuxième sous-titre

| Colonne 1 | Colonne 2 |
| --- | --- |
| Exemple | Explication |`;

const AIDE_PLACEHOLDER = "Texte de la partie…\n\nUtilise les boutons ci-dessus :\n### Sous-titre\n- liste à puces\n1. liste numérotée\n**gras**\n| tableau | … |";

// ---------- Zone de texte avec barre de mise en forme (éditeur visuel, sans balises) ----------
// value : texte enregistré ; onCommit(nouveau) : appelé à la sortie du champ et après chaque bouton.
// simple : bloc « Texte » (pas de sous-titres / listes / tableaux, retours à la ligne conservés)
export function ZoneTexteMd({ value, onCommit, rows = 12, placeholder, simple = false, alignTexte }) {
  const [grand, setGrand] = useState(false);
  const ed = useRef(null);
  useEffect(() => {
    if (!grand) return;
    const echap = (e) => { if (e.key === "Escape") basculerGrand(false); };
    window.addEventListener("keydown", echap);
    return () => window.removeEventListener("keydown", echap);
  }, [grand]);

  const commit = (t) => { if (t !== (value || "")) onCommit(t); };
  const basculerGrand = (v) => { if (ed.current) commit(ed.current.texte()); setGrand(v); };
  const outils = { cmd: (nom, val) => ed.current?.cmd(nom, val) };
  const bouton = styleBouton;
  const garder = (e) => e.preventDefault(); // garde la sélection dans le texte

  const barre = (
    <BarreFormat
      outils={outils}
      avant={!simple && <button type="button" style={bouton} onMouseDown={garder} onClick={() => outils.cmd("titre")} title="Transformer la ligne en sous-titre (ou revenir en texte normal)"><Heading size={13} /> Sous-titre</button>}
      apres={<>
        {!simple && <button type="button" style={bouton} onMouseDown={garder} onClick={() => outils.cmd("ul")} title="Liste à puces"><List size={13} /> Liste</button>}
        {!simple && <button type="button" style={bouton} onMouseDown={garder} onClick={() => outils.cmd("ol")} title="Liste numérotée"><ListOrdered size={13} /> 1. 2. 3.</button>}
        {!simple && <button type="button" style={bouton} onMouseDown={garder} onClick={() => outils.cmd("tableau")} title="Insérer un tableau sous la ligne où se trouve le curseur"><Table size={13} /> Tableau</button>}
        <span style={{ flex: 1 }} />
        <button type="button" style={{ ...bouton, color: "var(--piste)", borderColor: "var(--piste)" }} onMouseDown={garder} onClick={() => basculerGrand(!grand)} title={grand ? "Revenir à la petite fenêtre" : "Écrire en grand"}>
          {grand ? <Minimize2 size={13} /> : <Maximize2 size={13} />} {grand ? "Réduire" : "Agrandir"}
        </button>
      </>}
    />
  );
  const editeur = (
    <EditeurVisuel
      ref={ed}
      value={value || ""}
      onCommit={commit}
      simple={simple}
      placeholder={placeholder ?? (simple ? "Écris ton texte ici…" : "Écris le texte de la partie ici…")}
      style={{ minHeight: grand ? "100%" : rows * 20, maxHeight: grand ? "none" : 520, overflowY: "auto", textAlign: simple ? alignTexte || "left" : undefined }}
    />
  );
  const aide = (
    <div style={{ fontSize: 11, color: "#9a9384", lineHeight: 1.45 }}>
      Sélectionne le texte, puis choisis la mise en forme. La gomme retire la mise en forme de la sélection.
      {!simple && <> Clique sur un tableau pour le modifier.</>}
    </div>
  );

  if (grand) {
    return createPortal(
      <div style={{ position: "fixed", inset: 0, zIndex: 150, background: "rgba(16,24,38,0.55)", display: "flex", padding: 12 }} onMouseDown={(e) => { if (e.target === e.currentTarget) basculerGrand(false); }}>
        <div style={{ background: "#fff", borderRadius: 14, flex: 1, display: "flex", flexDirection: "column", gap: 10, padding: 14, minHeight: 0, maxWidth: 1000, margin: "0 auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
          {barre}
          <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>{editeur}</div>
          {aide}
        </div>
      </div>,
      document.body
    );
  }
  return (
    <div style={{ display: "grid", gap: 6 }}>
      {barre}
      {editeur}
      {aide}
    </div>
  );
}

// ---------- Construction des blocs d'une page à partir du modèle ----------
export function blocsDepuisModele({ intro, parties, numeroter, premiereOuverte, extras }) {
  const blocs = [];
  if (intro && intro.trim()) blocs.push({ id: uid(), type: "texte", largeur: 12, texte: intro.trim() });
  parties.filter((p) => p.titre.trim() || p.md.trim()).forEach((p, i) => {
    const titre = p.titre.trim() || "Partie " + (i + 1);
    const titreFinal = numeroter && !/^\d+[.)]\s/.test(titre) ? `${i + 1}. ${titre}` : titre;
    blocs.push({ id: uid(), type: "cours", largeur: 12, partie: "libre", titrePerso: titreFinal, mdPerso: p.md.trim(), ouvert: premiereOuverte && i === 0 });
  });
  if (extras.galerie) blocs.push({ id: uid(), type: "galerie", largeur: 12, images: [], affichage: "grille", parLigneOrdi: 4, parLigneTel: 2, recadrage: "uniforme" });
  if (extras.video) blocs.push({ id: uid(), type: "video", largeur: 6, url: "", legende: "" });
  if (extras.liens) blocs.push({ id: uid(), type: "liens", largeur: 12, liens: [] });
  return blocs;
}

// ---------- Assistant « Nouvelle page » ----------
// rubriques : toutes les rubriques ; parentImpose : id imposé (collègue → "as") ;
// auteur : { id, nom } pour les collègues ; onCreer(nouvellesRubriques, idPage)
export function AssistantPage({ rubriques, parentImpose, auteur, onCreer, onFermer }) {
  const racines = rubriques.filter((r) => !r.parentId).sort((a, b) => a.ordre - b.ordre);
  const [parent, setParent] = useState(parentImpose || (racines[0] ? racines[0].id : "__nouvelle"));
  const [nouvelleRubrique, setNouvelleRubrique] = useState("");
  const [titre, setTitre] = useState("");
  const [intro, setIntro] = useState("");
  const [numeroter, setNumeroter] = useState(true);
  const [premiereOuverte, setPremiereOuverte] = useState(true);
  const [extras, setExtras] = useState({ galerie: !!parentImpose, video: false, liens: false });
  const [parties, setParties] = useState([{ id: uid(), titre: "", md: "" }, { id: uid(), titre: "", md: "" }]);

  const majPartie = (id, patch) => setParties((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const deplacer = (i, d) => setParties((ps) => {
    const j = i + d;
    if (j < 0 || j >= ps.length) return ps;
    const c = [...ps];
    [c[i], c[j]] = [c[j], c[i]];
    return c;
  });

  const creer = () => {
    if (!titre.trim()) return alert("Donne un titre à la page.");
    if (parent === "__nouvelle" && !nouvelleRubrique.trim()) return alert("Donne un nom à la nouvelle rubrique.");
    const ajouts = [];
    let parentId = parent;
    if (parent === "__nouvelle") {
      parentId = slug(nouvelleRubrique) + "-" + uid().slice(0, 4);
      ajouts.push({ id: parentId, titre: nouvelleRubrique.trim(), parentId: null, ordre: racines.length ? Math.max(...racines.map((r) => r.ordre)) + 1 : 0, page: { blocs: [] } });
    }
    const freres = rubriques.filter((r) => r.parentId === parentId);
    const page = {
      id: slug(titre) + "-" + uid().slice(0, 4),
      titre: titre.trim(),
      parentId,
      ordre: freres.length ? Math.max(...freres.map((r) => r.ordre)) + 1 : 0,
      page: { blocs: blocsDepuisModele({ intro, parties, numeroter, premiereOuverte, extras }) },
      ...(auteur ? { auteur } : {}),
    };
    ajouts.push(page);
    onCreer(ajouts, page.id);
  };

  const etiquette = { fontSize: 11.5, fontWeight: 700, color: "#6b6656", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 6, display: "block" };
  const champ = { width: "100%", padding: "9px 10px", borderRadius: 8, border: "1px solid var(--ligne)", fontSize: 14, fontFamily: "inherit" };
  const coche = { display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#4a4636", cursor: "pointer" };
  const petit = { border: "1px solid var(--ligne)", background: "#fff", borderRadius: 7, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6b6656" };
  const nomParent = parent === "__nouvelle" ? (nouvelleRubrique.trim() || "Nouvelle rubrique") : (rubriques.find((r) => r.id === parent)?.titre || "");

  return (
    <div className="assistant-fond" onClick={onFermer}>
      <div className="assistant" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderBottom: "1px solid var(--ligne)", position: "sticky", top: 0, background: "#fff", zIndex: 2 }}>
          <Wand size={17} color="var(--piste)" />
          <div className="display" style={{ fontSize: 18, fontWeight: 600, flex: 1 }}>Nouvelle page (modèle)</div>
          <button onClick={onFermer} style={petit} title="Fermer"><X size={15} /></button>
        </div>

        <div style={{ padding: 18, display: "grid", gap: 18 }}>
          <div style={{ fontSize: 13, color: "#4a4636", lineHeight: 1.55, background: "var(--teal-soft)", borderRadius: 10, padding: "10px 12px" }}>
            La page est construite comme « L'alimentation » ou « L'échauffement » : une phrase d'introduction, puis des <b>parties dépliables</b> avec leurs sous-titres. Tu pourras ensuite tout modifier et ajouter photos ou vidéos dans le mode édition.
          </div>

          {/* 1. Emplacement */}
          <section>
            <span style={etiquette}>1. Emplacement</span>
            {parentImpose ? (
              <div style={{ fontSize: 13.5 }}>Dans la rubrique <b>{nomParent}</b></div>
            ) : (
              <div style={{ display: "grid", gap: 8 }}>
                <select value={parent} onChange={(e) => setParent(e.target.value)} style={champ}>
                  {racines.map((r) => <option key={r.id} value={r.id}>Dans « {r.titre} »</option>)}
                  <option value="__nouvelle">➕ Dans une nouvelle rubrique principale…</option>
                </select>
                {parent === "__nouvelle" && (
                  <input value={nouvelleRubrique} onChange={(e) => setNouvelleRubrique(e.target.value)} placeholder="Nom de la nouvelle rubrique (ex. Sport & Santé)" style={champ} />
                )}
              </div>
            )}
          </section>

          {/* 2. Titre + intro */}
          <section style={{ display: "grid", gap: 10 }}>
            <span style={{ ...etiquette, marginBottom: 0 }}>2. Titre et introduction</span>
            <input value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Titre de la page (ex. Le sommeil du sportif)" style={{ ...champ, fontFamily: "'Oswald', sans-serif", fontSize: 16, fontWeight: 600 }} />
            <textarea value={intro} onChange={(e) => setIntro(e.target.value)} rows={2} placeholder="Phrase d'introduction (ex. « Repères sur… Clique sur une partie pour l'ouvrir. »)" style={{ ...champ, resize: "vertical" }} />
            <div style={{ fontSize: 12, color: "#9a9384" }}>Adresse dans le menu : {nomParent} › {titre.trim() || "…"}</div>
          </section>

          {/* 3. Parties */}
          <section style={{ display: "grid", gap: 12 }}>
            <span style={{ ...etiquette, marginBottom: 0 }}>3. Parties dépliables ({parties.length})</span>
            {parties.map((p, i) => (
              <div key={p.id} style={{ border: "1px solid var(--ligne)", borderLeft: "5px solid var(--piste)", borderRadius: 10, padding: 12, display: "grid", gap: 8, background: "#fdfcf9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "var(--piste)", width: 26 }}>{numeroter ? i + 1 + "." : "•"}</span>
                  <input value={p.titre} onChange={(e) => majPartie(p.id, { titre: e.target.value })} placeholder={`Titre de la partie ${i + 1}`} style={{ ...champ, fontWeight: 600, flex: 1 }} />
                  <button onClick={() => deplacer(i, -1)} disabled={i === 0} style={petit} title="Monter"><ChevronUp size={14} /></button>
                  <button onClick={() => deplacer(i, 1)} disabled={i === parties.length - 1} style={petit} title="Descendre"><ChevronDown size={14} /></button>
                  <button onClick={() => parties.length > 1 && setParties(parties.filter((x) => x.id !== p.id))} disabled={parties.length === 1} style={{ ...petit, color: "#c24b4b" }} title="Supprimer la partie"><Trash2 size={13} /></button>
                </div>
                <ZoneTexteMd value={p.md} onCommit={(v) => majPartie(p.id, { md: v })} rows={8} />
                {!p.md.trim() && (
                  <button onClick={() => majPartie(p.id, { md: EXEMPLE_PARTIE })} style={{ justifySelf: "start", background: "none", border: "none", padding: 0, color: "var(--teal)", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                    Insérer un exemple de structure (sous-titres, liste, tableau)
                  </button>
                )}
              </div>
            ))}
            <button onClick={() => setParties([...parties, { id: uid(), titre: "", md: "" }])} style={{ justifySelf: "start", display: "flex", alignItems: "center", gap: 5, border: "1.5px dashed var(--piste)", background: "#fff", color: "var(--piste)", borderRadius: 9, padding: "8px 12px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              <Plus size={14} /> Ajouter une partie
            </button>
          </section>

          {/* 4. Options */}
          <section style={{ display: "grid", gap: 8 }}>
            <span style={{ ...etiquette, marginBottom: 0 }}>4. Options</span>
            <label style={coche}><input type="checkbox" checked={numeroter} onChange={(e) => setNumeroter(e.target.checked)} /> Numéroter les parties (1., 2., 3.…)</label>
            <label style={coche}><input type="checkbox" checked={premiereOuverte} onChange={(e) => setPremiereOuverte(e.target.checked)} /> Première partie dépliée à l'ouverture</label>
            <label style={coche}><input type="checkbox" checked={extras.galerie} onChange={(e) => setExtras({ ...extras, galerie: e.target.checked })} /> Ajouter une galerie photos (à remplir ensuite)</label>
            <label style={coche}><input type="checkbox" checked={extras.video} onChange={(e) => setExtras({ ...extras, video: e.target.checked })} /> Ajouter une vidéo (à choisir ensuite)</label>
            <label style={coche}><input type="checkbox" checked={extras.liens} onChange={(e) => setExtras({ ...extras, liens: e.target.checked })} /> Ajouter un bloc de liens externes</label>
          </section>
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", padding: "12px 18px", borderTop: "1px solid var(--ligne)", position: "sticky", bottom: 0, background: "#fff" }}>
          <button onClick={onFermer} style={{ border: "1px solid var(--ligne)", background: "#fff", borderRadius: 9, padding: "10px 14px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", color: "#6b6656" }}>Annuler</button>
          <button onClick={creer} style={{ display: "flex", alignItems: "center", gap: 6, border: "none", background: "var(--piste)", color: "#fff", borderRadius: 9, padding: "10px 16px", fontWeight: 700, fontSize: 13.5, cursor: "pointer", fontFamily: "inherit" }}>
            <Wand size={14} /> Créer la page
          </button>
        </div>
      </div>
    </div>
  );
}
