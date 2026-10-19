import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Plus, Trash2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Check, Clipboard, Table } from "lucide-react";

// =====================================================================
// v1.5.0 — Éditeur visuel de tableaux
// On remplit les cases comme dans un tableur : plus besoin d'écrire
// les « | Colonne | … | » à la main. Le tableau est ensuite converti
// dans le même format que ceux des cours (ex. « Manger autour de la séance »),
// donc il a exactement le même rendu (ordinateur et téléphone).
// =====================================================================

// ---------- Conversions tableau <-> texte « | a | b | » ----------
const propre = (c) => String(c ?? "").replace(/\r?\n/g, " ").replace(/\|/g, "/").trim();
const cellules = (ligne) => ligne.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());

export function tableauVide(colonnes = 3, lignes = 3) {
  return {
    entete: Array.from({ length: colonnes }, (_, k) => `Colonne ${k + 1}`),
    lignes: Array.from({ length: lignes }, () => Array(colonnes).fill("")),
  };
}

export function mdVersTableau(md) {
  const l = (md || "").split("\n").filter((x) => x.trim().startsWith("|"));
  if (!l.length) return null;
  const entete = cellules(l[0]);
  const corps = l.slice(1).filter((x) => !/^\s*\|?\s*:?-{2,}/.test(x)).map(cellules);
  const n = Math.max(entete.length, ...corps.map((r) => r.length));
  const egaliser = (r) => [...r, ...Array(n - r.length).fill("")].slice(0, n);
  return { entete: egaliser(entete), lignes: corps.map(egaliser) };
}

export function tableauVersMd({ entete, lignes }) {
  const ligne = (r) => "| " + r.map((c) => propre(c) || " ").join(" | ") + " |";
  // lignes entièrement vides ignorées ; au moins une ligne pour garder un tableau valide
  const corps = lignes.filter((r) => r.some((c) => propre(c)));
  return [ligne(entete), "| " + entete.map(() => "---").join(" | ") + " |", ...(corps.length ? corps : [entete.map(() => "")]).map(ligne)].join("\n");
}

// Repère le tableau où se trouve le curseur dans un texte : { debut, fin } (indices) ou null
export function tableauAuCurseur(texte, pos) {
  const lignes = texte.split("\n");
  let i = 0, idx = 0;
  for (; i < lignes.length; i++) {
    if (pos <= idx + lignes[i].length) break;
    idx += lignes[i].length + 1;
  }
  if (i >= lignes.length || !lignes[i].trim().startsWith("|")) return null;
  let a = i, b = i;
  while (a > 0 && lignes[a - 1].trim().startsWith("|")) a--;
  while (b < lignes.length - 1 && lignes[b + 1].trim().startsWith("|")) b++;
  const debut = lignes.slice(0, a).reduce((s, x) => s + x.length + 1, 0);
  const fin = debut + lignes.slice(a, b + 1).join("\n").length;
  return { debut, fin };
}

// Colle un tableau copié depuis Excel / Word / Google Sheets (colonnes séparées par des tabulations)
function texteColleVersTableau(texte) {
  const l = texte.replace(/\r/g, "").split("\n").filter((x) => x.trim());
  if (!l.length) return null;
  if (l[0].trim().startsWith("|")) return mdVersTableau(texte);
  const sep = l[0].includes("\t") ? "\t" : l[0].includes(";") ? ";" : null;
  if (!sep) return null;
  const rangs = l.map((x) => x.split(sep).map((c) => c.trim()));
  const n = Math.max(...rangs.map((r) => r.length));
  const eg = (r) => [...r, ...Array(n - r.length).fill("")];
  return { entete: eg(rangs[0]), lignes: rangs.slice(1).map(eg) };
}

// ---------- Rendu (identique aux tableaux des cours) ----------
function enLigne(texte, cle) {
  return String(texte || "").split(/(\*\*[^*]+\*\*)/g).map((m, i) =>
    m.startsWith("**") && m.endsWith("**") && m.length > 4 ? <strong key={cle + i}>{m.slice(2, -2)}</strong> : <React.Fragment key={cle + i}>{m}</React.Fragment>
  );
}

export function RenduTableau({ bloc }) {
  const entete = bloc.entete || [];
  const lignes = (bloc.lignes || []).filter((r) => r.some((c) => String(c || "").trim()));
  return (
    <div className="tableau-bloc">
      {bloc.titre && <h4 className="cours-h" style={{ marginTop: 0 }}>{bloc.titre}</h4>}
      <div className="cours-table-wrap" style={{ marginTop: bloc.titre ? 6 : 0 }}>
        <table className="cours-table">
          <thead><tr>{entete.map((c, k) => <th key={k}>{enLigne(c, "h" + k)}</th>)}</tr></thead>
          <tbody>{lignes.map((r, ri) => <tr key={ri}>{r.map((c, k) => <td key={k} data-label={entete[k]}>{enLigne(c, ri + "-" + k)}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- Grille d'édition ----------
const petitBtn = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4, border: "1px solid var(--ligne)", background: "#fff", borderRadius: 7, padding: "5px 8px", fontSize: 11.5, fontWeight: 700, color: "#4a4636", cursor: "pointer", fontFamily: "inherit" };
const iconeBtn = { ...petitBtn, padding: 3, width: 24, height: 24 };

export function GrilleTableau({ valeur, onChange }) {
  const { entete, lignes } = valeur;
  const nCol = entete.length;
  const maj = (e, l) => onChange({ entete: e, lignes: l });
  const setCase = (ri, k, v) => maj(entete, lignes.map((r, i) => (i === ri ? r.map((c, j) => (j === k ? v : c)) : r)));
  const setEntete = (k, v) => maj(entete.map((c, j) => (j === k ? v : c)), lignes);
  const ajouterLigne = (apres = lignes.length - 1) => { const l = [...lignes]; l.splice(apres + 1, 0, Array(nCol).fill("")); maj(entete, l); };
  const supprimerLigne = (ri) => maj(entete, lignes.filter((_, i) => i !== ri));
  const deplacerLigne = (ri, d) => { const j = ri + d; if (j < 0 || j >= lignes.length) return; const l = [...lignes]; [l[ri], l[j]] = [l[j], l[ri]]; maj(entete, l); };
  const ajouterColonne = (apres = nCol - 1) => {
    const ins = (r, v) => { const c = [...r]; c.splice(apres + 1, 0, v); return c; };
    maj(ins(entete, `Colonne ${nCol + 1}`), lignes.map((r) => ins(r, "")));
  };
  const supprimerColonne = (k) => { if (nCol <= 1) return; maj(entete.filter((_, j) => j !== k), lignes.map((r) => r.filter((_, j) => j !== k))); };
  const deplacerColonne = (k, d) => {
    const j = k + d; if (j < 0 || j >= nCol) return;
    const sw = (r) => { const c = [...r]; [c[k], c[j]] = [c[j], c[k]]; return c; };
    maj(sw(entete), lignes.map(sw));
  };
  // Entrée dans la dernière case = nouvelle ligne
  const surTouche = (e, ri, k) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (ri === lignes.length - 1) ajouterLigne(ri);
      requestAnimationFrame(() => document.querySelector(`[data-case="${ri + 1}-${k}"]`)?.focus());
    }
  };
  // coller plusieurs cases d'un coup depuis Excel/Word
  const surColler = (e, ri, k) => {
    const t = e.clipboardData.getData("text");
    if (!t.includes("\t") && !t.includes("\n")) return;
    e.preventDefault();
    const rangs = t.replace(/\r/g, "").split("\n").filter((x, i, arr) => x !== "" || i < arr.length - 1).map((x) => x.split("\t"));
    let e2 = [...entete], l2 = lignes.map((r) => [...r]);
    const largeur = Math.max(nCol, k + Math.max(...rangs.map((r) => r.length)));
    e2 = [...e2, ...Array.from({ length: largeur - nCol }, (_, j) => `Colonne ${nCol + j + 1}`)];
    l2 = l2.map((r) => [...r, ...Array(largeur - nCol).fill("")]);
    rangs.forEach((r, di) => {
      r.forEach((v, dk) => {
        if (ri === -1 && di === 0) { e2[k + dk] = v.trim(); return; }
        const cible = ri === -1 ? di - 1 : ri + di;
        while (l2.length <= cible) l2.push(Array(largeur).fill(""));
        l2[cible][k + dk] = v.trim();
      });
    });
    maj(e2, l2);
  };

  const caseStyle = { width: "100%", minWidth: 110, border: "1px solid var(--ligne)", borderRadius: 6, padding: "6px 7px", fontSize: 13, fontFamily: "inherit", resize: "vertical", lineHeight: 1.35, background: "#fff" };

  return (
    <div style={{ overflowX: "auto", border: "1px solid var(--ligne)", borderRadius: 10, padding: 8, background: "#faf9f6" }}>
      <table style={{ borderCollapse: "separate", borderSpacing: 4 }}>
        <thead>
          <tr>
            <td />
            {entete.map((_, k) => (
              <td key={k} style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                <button type="button" style={iconeBtn} onClick={() => deplacerColonne(k, -1)} disabled={k === 0} title="Déplacer la colonne à gauche"><ChevronLeft size={12} /></button>{" "}
                <button type="button" style={iconeBtn} onClick={() => ajouterColonne(k)} title="Ajouter une colonne à droite"><Plus size={12} /></button>{" "}
                <button type="button" style={{ ...iconeBtn, color: "#c24b4b" }} onClick={() => supprimerColonne(k)} disabled={nCol <= 1} title="Supprimer la colonne"><Trash2 size={12} /></button>{" "}
                <button type="button" style={iconeBtn} onClick={() => deplacerColonne(k, 1)} disabled={k === nCol - 1} title="Déplacer la colonne à droite"><ChevronRight size={12} /></button>
              </td>
            ))}
          </tr>
          <tr>
            <td style={{ fontSize: 10.5, fontWeight: 700, color: "#9a9384", textTransform: "uppercase", whiteSpace: "nowrap", paddingRight: 4 }}>Titres</td>
            {entete.map((c, k) => (
              <td key={k}>
                <input value={c} onChange={(e) => setEntete(k, e.target.value)} onPaste={(e) => surColler(e, -1, k)} data-case={`-1-${k}`} placeholder={`Titre ${k + 1}`}
                  style={{ ...caseStyle, background: "var(--ink)", color: "#fff", fontWeight: 700, borderColor: "var(--ink)" }} />
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {lignes.map((r, ri) => (
            <tr key={ri}>
              <td style={{ whiteSpace: "nowrap", verticalAlign: "top" }}>
                <div style={{ display: "grid", gap: 2 }}>
                  <button type="button" style={iconeBtn} onClick={() => deplacerLigne(ri, -1)} disabled={ri === 0} title="Monter la ligne"><ChevronUp size={12} /></button>
                  <button type="button" style={iconeBtn} onClick={() => deplacerLigne(ri, 1)} disabled={ri === lignes.length - 1} title="Descendre la ligne"><ChevronDown size={12} /></button>
                </div>
              </td>
              {r.map((c, k) => (
                <td key={k} style={{ verticalAlign: "top" }}>
                  <textarea value={c} rows={2} onChange={(e) => setCase(ri, k, e.target.value)} onKeyDown={(e) => surTouche(e, ri, k)} onPaste={(e) => surColler(e, ri, k)} data-case={`${ri}-${k}`}
                    style={{ ...caseStyle, fontWeight: k === 0 ? 700 : 400 }} />
                </td>
              ))}
              <td style={{ verticalAlign: "top", whiteSpace: "nowrap" }}>
                <div style={{ display: "grid", gap: 2 }}>
                  <button type="button" style={iconeBtn} onClick={() => ajouterLigne(ri)} title="Insérer une ligne en dessous"><Plus size={12} /></button>
                  <button type="button" style={{ ...iconeBtn, color: "#c24b4b" }} onClick={() => supprimerLigne(ri)} title="Supprimer la ligne"><Trash2 size={12} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
        <button type="button" style={petitBtn} onClick={() => ajouterLigne()}><Plus size={13} /> Ligne</button>
        <button type="button" style={petitBtn} onClick={() => ajouterColonne()}><Plus size={13} /> Colonne</button>
      </div>
    </div>
  );
}

// ---------- Fenêtre plein écran d'édition d'un tableau ----------
export function FenetreTableau({ initial, titreFenetre = "Tableau", onValider, onFermer, avecTitre = false, titreInitial = "" }) {
  const [t, setT] = useState(initial || tableauVide());
  const [titre, setTitre] = useState(titreInitial || "");
  const [collage, setCollage] = useState(false);
  const zoneColle = useRef(null);

  const importerColle = () => {
    const r = texteColleVersTableau(zoneColle.current?.value || "");
    if (!r) { alert("Je n'ai pas reconnu de tableau. Copie les cases depuis Excel, Word ou Google Sheets, puis colle-les ici."); return; }
    setT(r); setCollage(false);
  };

  return createPortal(
    <div onClick={onFermer} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(16,24,38,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 14, width: "min(1100px, 100%)", maxHeight: "94vh", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid var(--ligne)" }}>
          <Table size={16} color="var(--piste)" />
          <div className="display" style={{ fontSize: 17, fontWeight: 600, flex: 1 }}>{titreFenetre}</div>
          <button type="button" onClick={onFermer} style={iconeBtn} title="Fermer sans enregistrer"><X size={14} /></button>
        </div>
        <div style={{ overflow: "auto", padding: 16, display: "grid", gap: 12, gridAutoRows: "max-content", flex: 1, minHeight: 0 }}>
          <div style={{ fontSize: 12, color: "#6b6656", lineHeight: 1.5, background: "#faf9f6", border: "1px solid var(--ligne)", borderRadius: 8, padding: "8px 10px" }}>
            Remplis les cases directement. <strong>Entrée</strong> passe à la case du dessous (et crée une ligne à la fin).
            Les boutons <strong>+</strong> ajoutent une ligne ou une colonne, la corbeille la supprime.
            Tu peux aussi <strong>coller des cases copiées depuis Excel, Word ou Google Sheets</strong>.
            Pour mettre un mot en gras : <code>**mot**</code>.
          </div>
          {avecTitre && (
            <input value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Titre au-dessus du tableau (facultatif)"
              style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid var(--ligne)", fontSize: 14, fontFamily: "inherit", fontWeight: 600 }} />
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <button type="button" style={petitBtn} onClick={() => setCollage((v) => !v)}><Clipboard size={13} /> Importer un tableau copié (Excel, Word…)</button>
          </div>
          {collage && (
            <div style={{ display: "grid", gap: 6 }}>
              <textarea ref={zoneColle} rows={5} placeholder="Colle ici les cases copiées (la première ligne devient la ligne des titres)…"
                style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid var(--ligne)", fontFamily: "inherit", fontSize: 12.5 }} />
              <button type="button" style={{ ...petitBtn, justifySelf: "start", color: "var(--teal)", borderColor: "var(--teal)" }} onClick={importerColle}><Check size={13} /> Remplacer le tableau par ce contenu</button>
            </div>
          )}
          <GrilleTableau valeur={t} onChange={setT} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#4a4636", marginBottom: 6 }}>Aperçu sur le site</div>
            <RenduTableau bloc={{ ...t, titre: avecTitre ? titre : "" }} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: "12px 16px", borderTop: "1px solid var(--ligne)" }}>
          <button type="button" onClick={onFermer} style={{ ...petitBtn, padding: "8px 14px" }}>Annuler</button>
          <button type="button" onClick={() => onValider(t, titre)} style={{ ...petitBtn, padding: "8px 14px", background: "var(--piste)", color: "#fff", borderColor: "var(--piste)" }}><Check size={14} /> Valider le tableau</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
