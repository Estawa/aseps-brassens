import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { analyser, styleDe, styleCadre, styleVersCss } from "./format.jsx";
import { mdVersTableau, tableauVersMd, FenetreTableau } from "./tableau.jsx";

// =====================================================================
// v1.7.0 — Éditeur visuel (sans balises)
// On écrit directement sur le texte mis en forme, comme dans Word.
// En coulisses, le texte est toujours enregistré dans le même format
// qu'avant (Markdown + petites balises), donc l'affichage du site,
// la synchronisation et les anciens textes ne changent pas.
// =====================================================================

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const FORMATS = new Set(["B", "STRONG", "I", "EM", "U", "SPAN", "FONT", "MARK", "S", "SMALL", "BIG"]);
const BLOCS = new Set(["P", "DIV", "H1", "H2", "H3", "H4", "H5", "H6", "LI", "UL", "OL", "BLOCKQUOTE", "PRE", "TABLE"]);

// ---------- Texte enregistré -> HTML de l'éditeur ----------
function arbreVersHtml(noeuds) {
  return noeuds.map((n) => {
    if (typeof n === "string") return esc(n).replace(/\n/g, "<br>");
    const int = arbreVersHtml(n.enfants);
    if (n.nom === "b") return `<strong>${int}</strong>`;
    if (n.nom === "i") return `<em>${int}</em>`;
    if (n.nom === "u") return `<u>${int}</u>`;
    const v = n.val ? ` data-v="${esc(n.val)}"` : "";
    if (n.nom === "cadre") {
      const bloc = n.enfants.some((e) => typeof e === "string" && e.includes("\n"));
      return `<${bloc ? "div" : "span"} data-f="cadre"${v} style="${styleVersCss(styleCadre(n.val, bloc))}">${int}</${bloc ? "div" : "span"}>`;
    }
    return `<span data-f="${n.nom}"${v} style="${styleVersCss(styleDe(n))}">${int}</span>`;
  }).join("");
}
const enLigneHtml = (t) => arbreVersHtml(analyser(t));

const cellules = (l) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
function tableauHtml(md) {
  const t = mdVersTableau(md) || { entete: [], lignes: [] };
  const lignes = t.lignes.filter((r) => r.some((c) => c.trim()));
  return `<div class="cours-table-wrap" style="margin:0"><table class="cours-table"><thead><tr>${t.entete.map((c) => `<th>${enLigneHtml(c)}</th>`).join("")}</tr></thead>`
    + `<tbody>${lignes.map((r) => `<tr>${r.map((c, k) => `<td data-label="${esc(t.entete[k] || "")}">${enLigneHtml(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`
    + `<div class="widget-actions"><button type="button" data-action="modifier">✎ Modifier le tableau</button><button type="button" data-action="supprimer">🗑 Supprimer</button></div>`;
}
const widgetTableau = (md) => `<div class="widget-tableau" contenteditable="false" data-tableau="${esc(md)}">${tableauHtml(md)}</div>`;

function mdVersHtml(md) {
  const lignes = (md || "").split("\n");
  const out = [];
  let i = 0;
  while (i < lignes.length) {
    const l = lignes[i];
    if (!l.trim()) { i++; continue; }
    const cadre = l.trim().match(/^:::\s*cadre(?::([a-z0-9#-]*))?\s*$/i);
    if (cadre) {
      const int = []; i++; let prof = 0;
      while (i < lignes.length) {
        const t = lignes[i].trim();
        if (/^:::\s*cadre/i.test(t)) prof++;
        else if (t === ":::") { if (prof === 0) break; prof--; }
        int.push(lignes[i]); i++;
      }
      i++;
      const v = cadre[1] ? ` data-v="${esc(cadre[1])}"` : "";
      out.push(`<div data-cadre-bloc="1"${v} style="${styleVersCss(styleCadre(cadre[1], true))}">${mdVersHtml(int.join("\n")) || "<p><br></p>"}</div>`);
      continue;
    }
    if (l.trim() === ":::") { i++; continue; }
    if (l.startsWith("### ")) { out.push(`<h4>${enLigneHtml(l.slice(4))}</h4>`); i++; continue; }
    if (l.trim().startsWith("|")) {
      const bloc = [];
      while (i < lignes.length && lignes[i].trim().startsWith("|")) { bloc.push(lignes[i]); i++; }
      out.push(widgetTableau(bloc.join("\n")));
      continue;
    }
    if (/^- /.test(l) || /^\d+\. /.test(l)) {
      const num = /^\d+\. /.test(l);
      const motif = num ? /^\d+\. / : /^- /;
      const items = [];
      while (i < lignes.length && motif.test(lignes[i])) {
        let h = enLigneHtml(lignes[i].replace(motif, "")); i++;
        const sous = [];
        while (i < lignes.length && /^\s+- /.test(lignes[i])) { sous.push(`<li>${enLigneHtml(lignes[i].replace(/^\s+- /, ""))}</li>`); i++; }
        if (sous.length) h += `<ul>${sous.join("")}</ul>`;
        items.push(`<li>${h}</li>`);
      }
      out.push(`<${num ? "ol" : "ul"}>${items.join("")}</${num ? "ol" : "ul"}>`);
      continue;
    }
    const para = [l.trim().replace(/^- /, "")]; i++;
    while (i < lignes.length && lignes[i].trim() && !/^(### |\||- |\d+\. |:::)/.test(lignes[i].trim())) { para.push(lignes[i]); i++; }
    out.push(`<p>${enLigneHtml(para.join(" "))}</p>`);
  }
  return out.join("");
}

// ---------- HTML de l'éditeur -> texte enregistré ----------
function enrober(x, o, f) {
  if (!x.trim()) return x;
  const a = x.match(/^\s*/)[0], b = x.match(/\s*$/)[0];
  return a + o + x.trim() + f + b;
}
function inline(n, simple) {
  if (n.nodeType === 3) return n.nodeValue.replace(/ /g, " ").replace(/​/g, "");
  if (n.nodeType !== 1) return "";
  const tag = n.tagName;
  if (tag === "BR") return "\n";
  if (n.dataset && n.dataset.tableau != null) return "";
  let x = [...n.childNodes].map((c) => inline(c, simple)).join("");
  const st = n.style || {};
  const f = n.dataset?.f;
  if (simple && f === "cadre" && tag === "DIV") {
    // encadré de plusieurs lignes dans un bloc texte
    const int = x.replace(/^\n/, "").replace(/\n$/, "");
    return int.trim() ? `\n{cadre${n.dataset.v ? ":" + n.dataset.v : ""}}${int}{/cadre}` : "";
  }
  if (f) x = enrober(x, `{${f}${n.dataset.v ? ":" + n.dataset.v : ""}}`, `{/${f}}`);
  else if (tag === "SPAN" || tag === "FONT") {
    // mises en forme posées par le navigateur lui-même
    if (/underline/.test(st.textDecoration || st.textDecorationLine || "")) x = enrober(x, "{u}", "{/u}");
    if (st.fontStyle === "italic") x = enrober(x, "*", "*");
    if (/bold|[6-9]00/.test(st.fontWeight || "")) x = enrober(x, "**", "**");
  }
  if (tag === "U") x = enrober(x, "{u}", "{/u}");
  if (tag === "I" || tag === "EM") x = enrober(x, "*", "*");
  if (tag === "B" || tag === "STRONG") x = enrober(x, "**", "**");
  if (simple && (tag === "DIV" || tag === "P") && !f) {
    // une ligne (le navigateur crée un <div> à chaque Entrée)
    const seulBr = n.childNodes.length === 1 && n.firstChild.nodeName === "BR";
    return "\n" + (seulBr ? "" : x.replace(/\n$/, ""));
  }
  return x;
}

function serialiserSimple(el) {
  return [...el.childNodes].map((c) => inline(c, true)).join("").replace(/^\n/, "").replace(/\s+$/, "");
}

function serialiserBlocs(parent) {
  const out = [];
  let tampon = [];
  const vider = () => {
    if (!tampon.length) return;
    tampon.map((c) => inline(c)).join("").split(/\n+/).map((t) => t.trim()).filter(Boolean).forEach((t) => out.push(t));
    tampon = [];
  };
  for (const n of parent.childNodes) {
    if (n.nodeType === 3 || (n.nodeType === 1 && !BLOCS.has(n.tagName) && n.dataset?.tableau == null)) { tampon.push(n); continue; }
    if (n.nodeType !== 1) continue;
    vider();
    const tag = n.tagName;
    if (n.dataset.tableau != null) out.push(n.dataset.tableau);
    else if (n.dataset.cadreBloc != null || (n.dataset.f === "cadre" && tag === "DIV")) {
      const int = serialiserBlocs(n).join("\n\n");
      if (int.trim()) out.push(`:::cadre${n.dataset.v ? ":" + n.dataset.v : ""}\n${int}\n:::`);
    } else if (/^H[1-6]$/.test(tag)) {
      const t = inline(n).replace(/\n+/g, " ").trim();
      if (t) out.push("### " + t);
    } else if (tag === "UL" || tag === "OL") {
      const items = [];
      let k = 0;
      for (const li of n.children) {
        if (li.tagName !== "LI") continue;
        const sous = [...li.children].filter((c) => c.tagName === "UL" || c.tagName === "OL");
        const t = [...li.childNodes].filter((c) => !sous.includes(c)).map((c) => inline(c)).join("").replace(/\n+/g, " ").trim();
        if (!t) continue;
        k++;
        items.push((tag === "OL" ? `${k}. ` : "- ") + t);
        sous.forEach((s) => [...s.children].forEach((sl) => { const st = inline(sl).replace(/\n+/g, " ").trim(); if (st) items.push("  - " + st); }));
      }
      if (items.length) out.push(items.join("\n"));
    } else if ([...n.children].some((c) => BLOCS.has(c.tagName) || c.dataset?.tableau != null)) {
      out.push(...serialiserBlocs(n));
    } else {
      inline(n).split(/\n+/).map((t) => t.trim()).filter(Boolean).forEach((t) => out.push(t));
    }
  }
  vider();
  return out;
}

// ---------- L'éditeur ----------
// value / onChange(texte) à chaque frappe / onCommit(texte) à la sortie et après chaque bouton
// simple : bloc « Texte » ou case de tableau (pas de sous-titres, listes, tableaux)
// uneLigne : case de tableau (Entrée -> onEntree)
export const EditeurVisuel = forwardRef(function EditeurVisuel(
  { value, onChange, onCommit, simple = false, uneLigne = false, placeholder = "", onEntree, onCollerSpecial, onFocus, style, className = "", ...reste },
  refExterne
) {
  const el = useRef(null);
  const dernier = useRef(null); // dernier texte émis
  const plage = useRef(null); // dernière sélection dans l'éditeur
  const [fenetreTab, setFenetreTab] = useState(null); // { widget | null }

  const serialiser = () => (simple ? serialiserSimple(el.current) : serialiserBlocs(el.current).join("\n\n"));
  const majVide = () => { if (el.current) el.current.dataset.vide = el.current.textContent.trim() || el.current.querySelector("[data-tableau]") ? "0" : "1"; };
  const emettre = (commit = false) => {
    const t = serialiser();
    dernier.current = t;
    majVide();
    onChange && onChange(t);
    if (commit && onCommit) onCommit(t);
  };

  // charge le texte dans l'éditeur (au début ou si le texte change de l'extérieur)
  useEffect(() => {
    if (!el.current || value === dernier.current) return;
    const v = value || "";
    el.current.innerHTML = simple ? enLigneHtml(v) : (mdVersHtml(v) || "<p><br></p>");
    dernier.current = v;
    majVide();
  }, [value, simple]);

  // mémorise la sélection (les listes déroulantes de la barre la font perdre)
  useEffect(() => {
    const surSel = () => {
      const s = document.getSelection();
      if (s && s.rangeCount && el.current && el.current.contains(s.getRangeAt(0).commonAncestorContainer)) plage.current = s.getRangeAt(0).cloneRange();
    };
    document.addEventListener("selectionchange", surSel);
    return () => document.removeEventListener("selectionchange", surSel);
  }, []);

  const restaurer = () => {
    const s = document.getSelection();
    const dedans = s.rangeCount && el.current.contains(s.getRangeAt(0).commonAncestorContainer);
    if (!dedans && plage.current) { el.current.focus({ preventScroll: true }); s.removeAllRanges(); s.addRange(plage.current); }
    else if (!dedans) el.current.focus();
    return s.rangeCount ? s.getRangeAt(0) : null;
  };
  const selectionner = (debut, fin) => {
    if (!debut) return;
    const r = document.createRange();
    r.setStartBefore(debut); r.setEndAfter(fin || debut);
    const s = document.getSelection(); s.removeAllRanges(); s.addRange(r);
    plage.current = r.cloneRange();
  };

  const blocDe = (n) => {
    let x = n.nodeType === 3 ? n.parentNode : n;
    while (x && x !== el.current && !(BLOCS.has(x.tagName) && !(x.dataset?.f))) x = x.parentNode;
    return x || el.current;
  };
  // découpe la sélection en morceaux, un par paragraphe / ligne
  const morceaux = (r) => {
    const racine = r.commonAncestorContainer.nodeType === 3 ? r.commonAncestorContainer.parentNode : r.commonAncestorContainer;
    const textes = [];
    if (r.commonAncestorContainer.nodeType === 3) textes.push(r.commonAncestorContainer);
    else {
      const w = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) if (r.intersectsNode(w.currentNode) && !w.currentNode.parentNode.closest("[data-tableau]")) textes.push(w.currentNode);
    }
    const groupes = [];
    for (const t of textes) {
      const a = t === r.startContainer ? r.startOffset : 0;
      const b = t === r.endContainer ? r.endOffset : t.length;
      if (a >= b) continue;
      const bloc = blocDe(t);
      const g = groupes[groupes.length - 1];
      if (g && g.bloc === bloc) { g.finNoeud = t; g.finOff = b; }
      else groupes.push({ bloc, debutNoeud: t, debutOff: a, finNoeud: t, finOff: b });
    }
    return groupes.map((g) => { const x = document.createRange(); x.setStart(g.debutNoeud, g.debutOff); x.setEnd(g.finNoeud, g.finOff); return { r: x, bloc: g.bloc }; });
  };

  const isoler = (noeud, bloc) => {
    let p = noeud.parentNode;
    while (p && p !== bloc && p !== el.current && FORMATS.has(p.tagName)) {
      const apres = p.cloneNode(false);
      while (noeud.nextSibling) apres.appendChild(noeud.nextSibling);
      p.parentNode.insertBefore(noeud, p.nextSibling);
      if (apres.childNodes.length) noeud.parentNode.insertBefore(apres, noeud.nextSibling);
      if (!p.textContent) p.remove();
      p = noeud.parentNode;
    }
  };
  const nettoyer = () => {
    el.current.querySelectorAll("span,b,strong,i,em,u,font").forEach((x) => { if (!x.textContent && !x.querySelector("br")) x.remove(); });
  };

  const envelopper = (nom, val) => {
    const r = restaurer();
    if (!r || r.collapsed) { alert("Sélectionne d'abord le texte à mettre en forme."); return; }
    const crees = [];
    for (const { r: m } of morceaux(r)) {
      const frag = m.extractContents();
      frag.querySelectorAll?.(`[data-f="${nom}"]`).forEach((x) => x.replaceWith(...x.childNodes));
      const sp = document.createElement("span");
      sp.dataset.f = nom;
      if (val) sp.dataset.v = val;
      sp.setAttribute("style", styleVersCss(nom === "cadre" ? styleCadre(val, false) : styleDe({ nom, val })));
      sp.appendChild(frag);
      m.insertNode(sp);
      crees.push(sp);
    }
    nettoyer();
    selectionner(crees[0], crees[crees.length - 1]);
    emettre(true);
  };

  const blocsHaut = (r) => [...el.current.childNodes].filter((n) => r.intersectsNode(n) && (n.nodeType === 1 || n.nodeValue.trim()));

  const encadrer = (val) => {
    const r = restaurer();
    if (!r || r.collapsed) { alert("Sélectionne d'abord le texte à encadrer."); return; }
    const hauts = blocsHaut(r);
    const plusieurs = simple ? hauts.some((n) => n.nodeName === "BR" || n.nodeName === "DIV" || n.nodeName === "P") && !uneLigne : hauts.length > 1;
    if (!plusieurs) { envelopper("cadre", val); return; }
    const div = document.createElement("div");
    if (simple) div.dataset.f = "cadre"; else div.dataset.cadreBloc = "1";
    if (val) div.dataset.v = val;
    div.setAttribute("style", styleVersCss(styleCadre(val, true)));
    hauts[0].parentNode.insertBefore(div, hauts[0]);
    hauts.forEach((n) => div.appendChild(n));
    selectionner(div);
    emettre(true);
  };

  const effacer = () => {
    const r = restaurer();
    if (!r || r.collapsed) { alert("Sélectionne d'abord le texte dont tu veux retirer la mise en forme."); return; }
    // encadrés de plusieurs lignes touchés par la sélection : retirés
    el.current.querySelectorAll("[data-cadre-bloc], div[data-f='cadre']").forEach((d) => { if (r.intersectsNode(d)) d.replaceWith(...d.childNodes); });
    const r2 = restaurer();
    const crees = [];
    for (const { r: m, bloc } of morceaux(r2)) {
      const texte = m.extractContents().textContent;
      const tn = document.createTextNode(texte);
      m.insertNode(tn);
      isoler(tn, bloc);
      crees.push(tn);
    }
    // gras / italique / souligné posés par le navigateur
    nettoyer();
    if (crees.length) selectionner(crees[0], crees[crees.length - 1]);
    emettre(true);
  };

  const cmd = (nom, val) => {
    if (!el.current) return;
    if (nom === "b" || nom === "i" || nom === "u") {
      restaurer();
      document.execCommand("styleWithCSS", false, false);
      document.execCommand(nom === "b" ? "bold" : nom === "i" ? "italic" : "underline");
      emettre(true);
      return;
    }
    if (nom === "effacer") return effacer();
    if (nom === "cadre") return encadrer(val);
    if (simple && ["titre", "ul", "ol", "tableau"].includes(nom)) return;
    if (nom === "titre") {
      const r = restaurer();
      const b = r && blocDe(r.startContainer);
      document.execCommand("formatBlock", false, b && /^H[1-6]$/.test(b.tagName) ? "<p>" : "<h4>");
      emettre(true);
      return;
    }
    if (nom === "ul" || nom === "ol") {
      restaurer();
      document.execCommand(nom === "ul" ? "insertUnorderedList" : "insertOrderedList");
      emettre(true);
      return;
    }
    if (nom === "tableau") { restaurer(); setFenetreTab({ widget: null }); return; }
    envelopper(nom, val);
  };

  useImperativeHandle(refExterne, () => ({ cmd, texte: () => (el.current ? serialiser() : value || ""), focus: () => {
      if (!el.current) return;
      el.current.focus();
      const r = document.createRange(); r.selectNodeContents(el.current); r.collapse(false);
      const s = document.getSelection(); s.removeAllRanges(); s.addRange(r);
    }, element: () => el.current }));

  // tableaux : clic sur « Modifier » / « Supprimer »
  const surClic = (e) => {
    const w = e.target.closest?.("[data-tableau]");
    if (!w) return;
    e.preventDefault();
    const action = e.target.closest("[data-action]")?.dataset.action;
    if (action === "supprimer") {
      if (confirm("Supprimer ce tableau ?")) { w.remove(); emettre(true); }
    } else setFenetreTab({ widget: w });
  };
  const validerTableau = (t) => {
    const md = tableauVersMd(t);
    const w = fenetreTab?.widget;
    setFenetreTab(null);
    if (w) { w.dataset.tableau = md; w.innerHTML = tableauHtml(md); }
    else {
      const tmp = document.createElement("div");
      tmp.innerHTML = widgetTableau(md) + "<p><br></p>";
      const r = plage.current;
      const b = r ? blocDe(r.endContainer) : null;
      let haut = b;
      while (haut && haut.parentNode && haut.parentNode !== el.current) haut = haut.parentNode;
      const nodes = [...tmp.childNodes];
      if (haut && haut !== el.current) nodes.reverse().forEach((n) => haut.after(n));
      else nodes.forEach((n) => el.current.appendChild(n));
    }
    emettre(true);
  };

  const surTouche = (e) => {
    if (e.key === "Enter" && uneLigne) { e.preventDefault(); onEntree && onEntree(); return; }
    if ((e.ctrlKey || e.metaKey) && ["b", "i", "u"].includes(e.key.toLowerCase())) { e.preventDefault(); cmd(e.key.toLowerCase()); }
  };
  const surColler = (e) => {
    if (onCollerSpecial && onCollerSpecial(e)) return;
    e.preventDefault();
    let t = e.clipboardData.getData("text/plain");
    if (uneLigne) t = t.replace(/\s*\n\s*/g, " ");
    document.execCommand("insertText", false, t);
  };

  return (
    <>
      <div
        ref={el}
        contentEditable
        suppressContentEditableWarning
        className={"editeur-visuel " + (simple ? "ev-simple " : "cours-corps ") + className}
        data-placeholder={placeholder}
        onInput={() => emettre(false)}
        onBlur={() => { const t = serialiser(); dernier.current = t; onCommit && onCommit(t); }}
        onFocus={(e) => { document.execCommand("defaultParagraphSeparator", false, simple ? "div" : "p"); onFocus && onFocus(e); }}
        onKeyDown={surTouche}
        onPaste={surColler}
        onClick={surClic}
        style={style}
        {...reste}
      />
      {fenetreTab && (
        <FenetreTableau
          titreFenetre={fenetreTab.widget ? "Modifier le tableau" : "Nouveau tableau"}
          initial={fenetreTab.widget ? mdVersTableau(fenetreTab.widget.dataset.tableau) : null}
          onValider={validerTableau}
          onFermer={() => setFenetreTab(null)}
        />
      )}
    </>
  );
});
