import React, { useState } from "react";
import { Bold, Italic, Underline, Highlighter, Palette, Square, Type, Eraser } from "lucide-react";

// =====================================================================
// v1.6.0 — Mise en forme du texte (gras, italique, souligné, tailles,
// surlignage, encadré, couleur, police)
//
// Le texte reste du texte simple, avec de petites balises posées par
// les boutons de la barre d'outils :
//   **gras**   *italique*   {u}souligné{/u}
//   {taille:grand}…{/taille}          petit | grand | tresgrand
//   {couleur:rouge}…{/couleur}        voir COULEURS (ou #rrggbb)
//   {surligne:jaune}…{/surligne}      voir SURLIGNES
//   {police:manuscrite}…{/police}     voir POLICES
//   {cadre}…{/cadre}                  encadré dans une phrase
//   :::cadre:orange  …  :::           encadré de plusieurs lignes (parties dépliables)
// =====================================================================

export const TAILLES = [
  { id: "petit", label: "Petit", css: "0.85em" },
  { id: "", label: "Normal", css: null },
  { id: "grand", label: "Grand", css: "1.25em" },
  { id: "tresgrand", label: "Très grand", css: "1.6em" },
];
export const POLICES = [
  { id: "", label: "Police du site", css: null },
  { id: "classique", label: "Classique (Georgia)", css: "Georgia, 'Times New Roman', serif" },
  { id: "titre", label: "Titre (Oswald)", css: "'Oswald', sans-serif" },
  { id: "arrondie", label: "Arrondie (Nunito)", css: "'Nunito', sans-serif" },
  { id: "manuscrite", label: "Manuscrite (Caveat)", css: "'Caveat', cursive" },
  { id: "machine", label: "Machine à écrire", css: "'Courier New', Courier, monospace" },
];
export const COULEURS = [
  { id: "noir", label: "Noir", hex: "#101826" },
  { id: "rouge", label: "Rouge", hex: "#c62828" },
  { id: "orange", label: "Orange", hex: "#e8651a" },
  { id: "vert", label: "Vert", hex: "#2e7d32" },
  { id: "turquoise", label: "Turquoise", hex: "#00897b" },
  { id: "bleu", label: "Bleu", hex: "#1565c0" },
  { id: "violet", label: "Violet", hex: "#6a1b9a" },
  { id: "gris", label: "Gris", hex: "#6b6656" },
];
export const SURLIGNES = [
  { id: "jaune", label: "Jaune", hex: "#fff176" },
  { id: "vert", label: "Vert", hex: "#c8f2c2" },
  { id: "bleu", label: "Bleu", hex: "#cfe6ff" },
  { id: "rose", label: "Rose", hex: "#ffd3e6" },
  { id: "orange", label: "Orange", hex: "#ffe0c7" },
];
export const CADRES = [
  { id: "", label: "Foncé", bord: "#101826", fond: "#ffffff" },
  { id: "orange", label: "Orange", bord: "#ff7a29", fond: "#fff4ec" },
  { id: "vert", label: "Turquoise", bord: "#1fb6a6", fond: "#eefaf8" },
  { id: "rouge", label: "Rouge", bord: "#c62828", fond: "#fdeeee" },
  { id: "bleu", label: "Bleu", bord: "#1565c0", fond: "#eef5fd" },
];

const hexOk = (v) => /^#[0-9a-f]{3,8}$/i.test(v || "");
const couleurDe = (liste, v) => liste.find((c) => c.id === v)?.hex || (hexOk(v) ? v : null);
export const cadreDe = (v) => CADRES.find((c) => c.id === (v || "")) || CADRES[0];

// ---------- Lecture du texte ----------
const BALISES = "b|i|u|taille|couleur|surligne|police|cadre";
const RE_BALISE = new RegExp(`(\\{\\/?(?:${BALISES})(?::[#a-zA-Z0-9-]*)?\\})`, "g");
const RE_UNE = new RegExp(`^\\{(\\/?)(${BALISES})(?::([#a-zA-Z0-9-]*))?\\}$`);

function analyser(texte) {
  // gras / italique (Markdown) -> balises, pour qu'ils puissent contenir d'autres mises en forme
  const t = String(texte ?? "")
    .replace(/\*\*([^*]+?)\*\*/g, "{b}$1{/b}")
    .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\*)/g, "$1{i}$2{/i}");
  const racine = { enfants: [] };
  const pile = [racine];
  for (const m of t.split(RE_BALISE)) {
    if (!m) continue;
    const b = m.match(RE_UNE);
    const haut = pile[pile.length - 1];
    if (!b) { haut.enfants.push(m); continue; }
    const [, ferme, nom, val] = b;
    if (!ferme) {
      const n = { nom, val, enfants: [] };
      haut.enfants.push(n);
      pile.push(n);
    } else {
      const k = pile.map((x) => x.nom).lastIndexOf(nom);
      if (k > 0) pile.length = k; // ferme la balise (et celles oubliées à l'intérieur)
      // balise fermante sans ouvrante : ignorée
    }
  }
  return racine.enfants;
}

function styleDe(n) {
  switch (n.nom) {
    case "u": return { textDecoration: "underline", textUnderlineOffset: 3 };
    case "taille": { const c = TAILLES.find((x) => x.id === n.val)?.css; return c ? { fontSize: c, lineHeight: 1.3 } : {}; }
    case "couleur": { const c = couleurDe(COULEURS, n.val); return c ? { color: c } : {}; }
    case "surligne": { const c = couleurDe(SURLIGNES, n.val || "jaune") || "#fff176"; return { background: c, padding: "0 3px", borderRadius: 3, boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }; }
    case "police": { const p = POLICES.find((x) => x.id === n.val); return p?.css ? { fontFamily: p.css, ...(n.val === "manuscrite" ? { fontSize: "1.25em" } : {}) } : {}; }
    default: return {};
  }
}

function rendre(noeuds, cle) {
  return noeuds.map((n, i) => {
    const k = cle + "." + i;
    if (typeof n === "string") return <React.Fragment key={k}>{n}</React.Fragment>;
    const enfants = rendre(n.enfants, k);
    if (n.nom === "b") return <strong key={k}>{enfants}</strong>;
    if (n.nom === "i") return <em key={k}>{enfants}</em>;
    if (n.nom === "cadre") {
      const c = cadreDe(n.val);
      const plusieursLignes = n.enfants.some((e) => typeof e === "string" && e.includes("\n"));
      return (
        <span key={k} className="texte-cadre" style={{ border: `2px solid ${c.bord}`, background: c.fond, borderRadius: 8, padding: plusieursLignes ? "8px 12px" : "1px 6px", display: plusieursLignes ? "block" : "inline", margin: plusieursLignes ? "6px 0" : 0, boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>
          {enfants}
        </span>
      );
    }
    return <span key={k} style={styleDe(n)}>{enfants}</span>;
  });
}

// Texte mis en forme (une ligne, un paragraphe ou un bloc texte entier)
export function formater(texte, cle = "f") {
  return rendre(analyser(texte), cle);
}

// Retire toute mise en forme d'un morceau de texte
export function sansFormat(texte) {
  return String(texte || "")
    .replace(new RegExp(`\\{\\/?(?:${BALISES})(?::[#a-zA-Z0-9-]*)?\\}`, "g"), "")
    .replace(/\*\*([^*]+?)\*\*/g, "$1")
    .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\*)/g, "$1$2")
    .replace(/^:::.*$/gm, "");
}

// ---------- Barre d'outils de mise en forme ----------
// texte : contenu actuel ; getSel() -> [debut, fin] ; appliquer(nouveau, selDebut, selFin)
// blocs : true dans les parties dépliables (un encadré sur plusieurs lignes devient un bloc « ::: »)
export const styleBouton = { display: "flex", alignItems: "center", gap: 4, border: "1px solid var(--ligne)", background: "#fff", borderRadius: 7, padding: "5px 8px", fontSize: 11.5, fontWeight: 700, color: "#4a4636", cursor: "pointer", fontFamily: "inherit", minHeight: 30 };
const garder = (e) => e.preventDefault(); // garde la sélection dans la zone de texte

export function useMiseEnForme({ texte, getSel, appliquer, blocs = false }) {
  const entourer = (ouvrant, fermant, defaut = "texte") => {
    const [a, b] = getSel();
    const choisi = texte.slice(a, b) || defaut;
    // garde les espaces autour de la sélection en dehors des balises (double-clic sur un mot)
    const debutEsp = choisi.match(/^\s*/)[0], finEsp = choisi.match(/\s*$/)[0];
    const coeur = choisi.trim() || defaut;
    const nouveau = texte.slice(0, a) + debutEsp + ouvrant + coeur + fermant + finEsp + texte.slice(b);
    const d = a + debutEsp.length + ouvrant.length;
    appliquer(nouveau, d, d + coeur.length);
  };
  const balise = (nom, val) => entourer(`{${nom}${val ? ":" + val : ""}}`, `{/${nom}}`);
  const encadrer = (val) => {
    const [a, b] = getSel();
    const choisi = texte.slice(a, b);
    if (blocs && choisi.includes("\n")) {
      // encadré de plusieurs lignes : bloc « :::cadre »
      const debutLigne = texte.lastIndexOf("\n", a - 1) + 1;
      let finLigne = texte.indexOf("\n", b > a && texte[b - 1] === "\n" ? b - 1 : b);
      if (finLigne === -1) finLigne = texte.length;
      const coeur = texte.slice(debutLigne, finLigne).replace(/\n+$/, "");
      const bloc = `:::cadre${val ? ":" + val : ""}\n${coeur}\n:::`;
      const avant = texte.slice(0, debutLigne), apres = texte.slice(finLigne);
      const pre = avant && !avant.endsWith("\n\n") ? (avant.endsWith("\n") ? "\n" : "\n\n") : "";
      const post = apres && !apres.startsWith("\n\n") ? (apres.startsWith("\n") ? "\n" : "\n\n") : "";
      const nouveau = avant + pre + bloc + post + apres;
      const d = avant.length + pre.length;
      appliquer(nouveau, d, d + bloc.length);
    } else balise("cadre", val);
  };
  const effacer = () => {
    const [a, b] = getSel();
    if (a === b) { alert("Sélectionne d'abord le texte dont tu veux retirer la mise en forme."); return; }
    const net = sansFormat(texte.slice(a, b));
    appliquer(texte.slice(0, a) + net + texte.slice(b), a, a + net.length);
  };
  // raccourcis clavier Ctrl/Cmd + B, I, U
  const surTouche = (e) => {
    if (!(e.ctrlKey || e.metaKey)) return;
    const k = e.key.toLowerCase();
    if (k === "b") { e.preventDefault(); entourer("**", "**", "texte en gras"); }
    else if (k === "i") { e.preventDefault(); entourer("*", "*", "texte en italique"); }
    else if (k === "u") { e.preventDefault(); balise("u"); }
  };
  return { entourer, balise, encadrer, effacer, surTouche };
}

function Pastilles({ liste, onChoisir, fondKey = "hex", bordKey }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: 8, background: "#fff", border: "1px solid var(--ligne)", borderRadius: 10 }}>
      {liste.map((c) => (
        <button key={c.id || "def"} type="button" title={c.label} onMouseDown={garder} onClick={() => onChoisir(c.id)}
          style={{ display: "flex", alignItems: "center", gap: 5, border: `2px solid ${bordKey ? c[bordKey] : "var(--ligne)"}`, background: bordKey ? c.fond : "#fff", borderRadius: 8, padding: "4px 8px", cursor: "pointer", fontSize: 11.5, fontWeight: 600, fontFamily: "inherit", color: "#4a4636" }}>
          {!bordKey && <span style={{ width: 16, height: 16, borderRadius: 4, background: c[fondKey], border: "1px solid rgba(0,0,0,0.15)" }} />}
          {c.label}
        </button>
      ))}
    </div>
  );
}

export function BarreFormat({ outils, avant = null, apres = null }) {
  const [palette, setPalette] = useState(null); // "couleur" | "surligne" | "cadre"
  const basculer = (p) => setPalette((x) => (x === p ? null : p));
  const choixSelect = { ...styleBouton, padding: "4px 6px", fontWeight: 600 };
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, alignItems: "center" }}>
        {avant}
        <button type="button" style={styleBouton} onMouseDown={garder} onClick={() => outils.entourer("**", "**", "texte en gras")} title="Gras (Ctrl+B)"><Bold size={14} /></button>
        <button type="button" style={styleBouton} onMouseDown={garder} onClick={() => outils.entourer("*", "*", "texte en italique")} title="Italique (Ctrl+I)"><Italic size={14} /></button>
        <button type="button" style={styleBouton} onMouseDown={garder} onClick={() => outils.balise("u")} title="Souligné (Ctrl+U)"><Underline size={14} /></button>
        <select value="" onChange={(e) => { const v = e.target.value; e.target.value = ""; if (v) outils.balise("taille", v); }} style={choixSelect} title="Taille du texte">
          <option value="">Taille…</option>
          {TAILLES.filter((t) => t.id).map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>
        <select value="" onChange={(e) => { const v = e.target.value; e.target.value = ""; if (v) outils.balise("police", v); }} style={choixSelect} title="Police d'écriture">
          <option value="">Police…</option>
          {POLICES.filter((p) => p.id).map((p) => <option key={p.id} value={p.id} style={{ fontFamily: p.css }}>{p.label}</option>)}
        </select>
        <button type="button" style={{ ...styleBouton, ...(palette === "couleur" ? { borderColor: "var(--piste)" } : {}) }} onMouseDown={garder} onClick={() => basculer("couleur")} title="Couleur du texte"><Palette size={14} /> Couleur</button>
        <button type="button" style={{ ...styleBouton, ...(palette === "surligne" ? { borderColor: "var(--piste)" } : {}) }} onMouseDown={garder} onClick={() => basculer("surligne")} title="Surligner"><Highlighter size={14} /> Surligner</button>
        <button type="button" style={{ ...styleBouton, ...(palette === "cadre" ? { borderColor: "var(--piste)" } : {}) }} onMouseDown={garder} onClick={() => basculer("cadre")} title="Encadrer le texte sélectionné"><Square size={14} /> Encadré</button>
        <button type="button" style={styleBouton} onMouseDown={garder} onClick={outils.effacer} title="Retirer la mise en forme du texte sélectionné"><Eraser size={14} /></button>
        {apres}
      </div>
      {palette === "couleur" && <Pastilles liste={COULEURS} onChoisir={(v) => { outils.balise("couleur", v); setPalette(null); }} />}
      {palette === "surligne" && <Pastilles liste={SURLIGNES} onChoisir={(v) => { outils.balise("surligne", v); setPalette(null); }} />}
      {palette === "cadre" && <Pastilles liste={CADRES} bordKey="bord" onChoisir={(v) => { outils.encadrer(v); setPalette(null); }} />}
    </div>
  );
}

// Icône réutilisée par l'éditeur du bloc texte
export const IconeTexte = Type;
