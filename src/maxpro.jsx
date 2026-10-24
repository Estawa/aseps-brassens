import React, { useEffect, useMemo, useState } from "react";
import { Trophy, Flame, ChevronDown, ChevronRight } from "lucide-react";
import { ecouterMaxPro } from "./sync.js";

// ---------------------------------------------------------------------------
// v1.9.0 — Bloc « Challenges et classements » (A.S. › Vie de l'A.S. › Musculation)
//
// Les données viennent de l'appli Max Pro : à chaque modification faite par un professeur,
// Max Pro publie dans « aseps/maxpro » les règles des challenges et les classements RÉELS
// (perfs vues et retenues par un professeur, résultats de challenges validés), avec les
// pseudos des élèves uniquement. Rien n'est saisi sur le site.
// ---------------------------------------------------------------------------

const couleurs = { encre: "#101826", doux: "#6b6656", piste: "var(--piste)", ligne: "var(--ligne)" };

function Onglets({ options, valeur, onChange, petit = false }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {options.map((o) => {
        const actif = o.valeur === valeur;
        return (
          <button key={o.valeur} onClick={() => onChange(o.valeur)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: petit ? "6px 11px" : "9px 16px", borderRadius: 999, cursor: "pointer",
              fontSize: petit ? 12.5 : 14, fontWeight: 700, fontFamily: "inherit",
              border: `1.5px solid ${actif ? "var(--piste)" : "var(--ligne)"}`,
              background: actif ? "var(--piste)" : "#fff", color: actif ? "#fff" : couleurs.encre,
            }}>
            {o.Icon && <o.Icon size={petit ? 13 : 16} />}{o.label}
          </button>
        );
      })}
    </div>
  );
}

function TableClassement({ lignes, sexe, vide = "Aucun résultat validé pour l'instant." }) {
  // Filtre fille / garçon : les rangs sont recalculés dans la liste filtrée (ex æquo conservés)
  const liste = useMemo(() => {
    const f = sexe ? lignes.filter((l) => l.sexe === sexe) : lignes;
    if (!sexe) return f;
    let rang = 0, prec = null;
    return f.map((l, i) => { if (l.texte !== prec) rang = i + 1; prec = l.texte; return { ...l, rang }; });
  }, [lignes, sexe]);
  if (!liste.length) return <div style={{ color: "#9a9384", fontSize: 13, fontStyle: "italic", padding: "10px 2px" }}>{vide}</div>;
  const medaille = ["#d4a017", "#9aa0a6", "#b8733a"];
  return (
    <div style={{ border: "1px solid var(--ligne)", borderRadius: 12, background: "#fff", overflow: "hidden" }}>
      {liste.map((l, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 14px", borderTop: i ? "1px solid var(--ligne)" : "none" }}>
          <span style={{ width: 26, textAlign: "center", fontWeight: 800, fontSize: 15, color: l.rang <= 3 ? medaille[l.rang - 1] : "#9a9384" }}>{l.rang}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.pseudo}</div>
            {l.sous && <div style={{ fontSize: 11.5, color: couleurs.doux }}>{l.sous}</div>}
          </div>
          <span style={{ fontWeight: 800, fontSize: 14, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>{l.texte}</span>
        </div>
      ))}
    </div>
  );
}

function ChoixListe({ valeur, onChange, options }) {
  return (
    <select value={valeur} onChange={(e) => onChange(e.target.value)}
      style={{ width: "100%", maxWidth: 420, padding: "9px 10px", borderRadius: 9, border: "1px solid var(--ligne)", fontSize: 14, fontFamily: "inherit", background: "#fff" }}>
      {options}
    </select>
  );
}

function ListeChallenges({ challenges }) {
  const [ouvert, setOuvert] = useState(null);
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {challenges.map((c) => {
        const o = ouvert === c.id;
        return (
          <div key={c.id} style={{ border: "1px solid var(--ligne)", borderRadius: 12, background: "#fff", overflow: "hidden" }}>
            <button onClick={() => setOuvert(o ? null : c.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
              <Flame size={18} color="#ff7a29" />
              <span style={{ flex: 1 }}>
                <span style={{ display: "block", fontWeight: 700, fontSize: 15, color: couleurs.encre }}>{c.nom}</span>
                <span style={{ display: "block", fontSize: 12, color: couleurs.doux }}>{c.sousTitre}</span>
              </span>
              {o ? <ChevronDown size={18} color="#6b6656" /> : <ChevronRight size={18} color="#6b6656" />}
            </button>
            {o && <div className="texte-maxpro" style={{ padding: "0 16px 14px" }} dangerouslySetInnerHTML={{ __html: c.html }} />}
          </div>
        );
      })}
    </div>
  );
}

function Classements({ donnees }) {
  const [vue, setVue] = useState("challenges");
  const [sexe, setSexe] = useState("");
  const challenges = donnees.challenges || [];
  const epreuves = donnees.epreuves || [];
  const [chId, setChId] = useState(() => (challenges.find((c) => c.lignes?.length) || challenges[0])?.id || "");
  const [epId, setEpId] = useState(epreuves[0]?.id || "");
  const [tabIdx, setTabIdx] = useState(0);
  useEffect(() => { if (!epreuves.some((e) => e.id === epId)) setEpId(epreuves[0]?.id || ""); }, [epreuves]);
  useEffect(() => setTabIdx(0), [epId]);

  const ch = challenges.find((c) => c.id === chId);
  const ep = epreuves.find((e) => e.id === epId);
  const tab = ep?.tableaux?.[Math.min(tabIdx, (ep?.tableaux?.length || 1) - 1)];
  const familles = [...new Set(epreuves.map((e) => e.famille))];

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Onglets petit valeur={vue} onChange={setVue} options={[
        { valeur: "challenges", label: "Challenges" },
        { valeur: "epreuves", label: "Par épreuve" },
        { valeur: "combine", label: "Combiné" },
      ]} />
      <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: couleurs.doux, fontWeight: 600 }}>Afficher :</span>
        <Onglets petit valeur={sexe} onChange={setSexe} options={[{ valeur: "", label: "Tous" }, { valeur: "F", label: "Filles" }, { valeur: "M", label: "Garçons" }]} />
      </div>

      {vue === "challenges" && (
        <>
          <ChoixListe valeur={chId} onChange={setChId}
            options={challenges.map((c) => <option key={c.id} value={c.id}>{c.nom}{c.lignes?.length ? ` (${c.lignes.length})` : ""}</option>)} />
          {ch && <div style={{ fontSize: 12.5, color: couleurs.doux }}>Classement : {ch.critere.toLowerCase()}</div>}
          {ch && <TableClassement lignes={ch.lignes || []} sexe={sexe} />}
        </>
      )}

      {vue === "epreuves" && (
        epreuves.length === 0 ? (
          <div style={{ color: "#9a9384", fontSize: 13, fontStyle: "italic" }}>Aucune performance retenue par un professeur pour l'instant.</div>
        ) : (
          <>
            <ChoixListe valeur={epId} onChange={setEpId}
              options={familles.map((f) => (
                <optgroup key={f} label={f}>
                  {epreuves.filter((e) => e.famille === f).map((e) => <option key={e.id} value={e.id}>{e.nom}</option>)}
                </optgroup>
              ))} />
            {ep && ep.tableaux.length > 1 && (
              <Onglets petit valeur={String(tabIdx)} onChange={(v) => setTabIdx(Number(v))}
                options={ep.tableaux.map((t, i) => ({ valeur: String(i), label: t.libelle || "Classement" }))} />
            )}
            {tab && ep.tableaux.length === 1 && tab.libelle && <div style={{ fontSize: 12.5, color: couleurs.doux }}>{tab.libelle}</div>}
            {tab && <TableClassement lignes={tab.lignes} sexe={sexe} />}
          </>
        )
      )}

      {vue === "combine" && (
        <>
          <div style={{ fontSize: 12.5, color: couleurs.doux }}>{donnees.combine?.desc}</div>
          <TableClassement lignes={donnees.combine?.lignes || []} sexe={sexe} />
        </>
      )}
    </div>
  );
}

export function BlocMaxPro({ edition = false }) {
  const [donnees, setDonnees] = useState(undefined); // undefined = chargement, null = rien de publié
  const [onglet, setOnglet] = useState("challenges");
  useEffect(() => ecouterMaxPro(setDonnees), []);

  if (donnees === undefined) return <div style={{ color: "#9a9384", fontSize: 13, fontStyle: "italic" }}>Chargement des challenges et classements…</div>;
  if (!donnees) {
    return (
      <div style={{ border: "2px dashed #d8d3c6", borderRadius: 12, padding: "18px 14px", color: "#9a9384", fontSize: 13, textAlign: "center" }}>
        Les challenges et classements de l'A.S. musculation apparaîtront ici dès qu'un professeur aura ouvert l'appli Max Pro.
      </div>
    );
  }
  const maj = donnees.maj ? new Date(donnees.maj).toLocaleString("fr-FR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) : null;
  return (
    <div style={{ display: "grid", gap: 14, pointerEvents: edition ? "none" : "auto" }}>
      <Onglets valeur={onglet} onChange={setOnglet} options={[
        { valeur: "challenges", label: "Challenges", Icon: Flame },
        { valeur: "classements", label: "Classements", Icon: Trophy },
      ]} />
      {onglet === "challenges" ? <ListeChallenges challenges={donnees.challenges || []} /> : <Classements donnees={donnees} />}
      <div style={{ fontSize: 11.5, color: "#8a8372" }}>
        Classements réels : uniquement les performances vues et validées par un enseignant (pseudos des élèves).{maj ? ` Mis à jour le ${maj}.` : ""}
      </div>
    </div>
  );
}
