// =====================================================================
// v1.4.0 — Évaluations Bac général et technologique
// Contenus réécrits d'après les référentiels d'évaluation établissement du lycée
// Georges-Brassens (Académie de Versailles, session 2021), fournis par Christophe.
// Ces parties remplacent les anciennes (mêmes identifiants) et ajoutent un exemple
// de notation pour chaque APSA.
// =====================================================================

const BAC = "Bac général et technologique";

// Points de l'AFL2 et de l'AFL3 : un nombre de points fixe par degré, selon la répartition choisie
const TABLE_AFL23 = `| Degré | AFL sur 2 points | AFL sur 4 points | AFL sur 6 points |
| --- | --- | --- | --- |
| 1 | 0,5 | 1 | 1,5 |
| 2 | 1 | 2 | 3 |
| 3 | 1,5 | 3 | 4,5 |
| 4 | 2 | 4 | 6 |`;

const REPARTITION = (moment) => `### Ta répartition des 8 points (AFL2 / AFL3)

| Choix | AFL2 | AFL3 |
| --- | --- | --- |
| a | 2 points | 6 points |
| b | 4 points | 4 points |
| c | 6 points | 2 points |

Ce choix se fait **${moment}**.`;

const LIEN_PDF = "Les protocoles complets (Bac général et technologique, Bac professionnel) sont disponibles en PDF en bas de cette page. Cette page présente l'évaluation du **Bac général et technologique**.";

// =====================================================================
// RELAIS 2 × 200 m — CA1
// =====================================================================
const RLE = "Relais 2 × 200 m — évaluation (" + BAC + ")";

export const EVAL_RELAIS = {
  "rl-eval-structure": {
    cours: RLE,
    titre: "1. L'épreuve du bac : structure de la note",
    md: `Le relais fait partie du **champ d'apprentissage 1** : « Réaliser une performance motrice maximale mesurable à une échéance donnée ». La note est sur **20 points**.

| Attendu | Ce qui est évalué | Points | Quand |
| --- | --- | --- | --- |
| **AFL1** | S'engager pour produire une performance maximale à l'aide de techniques efficaces | **12 points** : élément 1 (6 pts) + élément 2 (6 pts) | Le jour de l'épreuve (CCF) |
| **AFL2** | S'entraîner, individuellement et collectivement, pour réaliser une performance | **2, 4 ou 6 points** | Au fil du cycle, éventuellement le jour de l'épreuve |
| **AFL3** | Choisir et assumer les rôles qui permettent un fonctionnement collectif solidaire | **6, 4 ou 2 points** | Au fil du cycle et le jour de l'épreuve |

### L'AFL1 en deux éléments

- **Élément 1 — La performance (/6)** : la **moyenne des deux meilleurs relais** 2 × 200 m de l'équipe, lue dans le barème filles ou garçons.
- **Élément 2 — L'efficacité technique (/6)** : l'**indice de transmission** = temps du relais − somme des deux 200 m individuels des coureurs. Plus il est **négatif**, plus le passage de témoin fait gagner de temps.

${REPARTITION("à l'issue de la 4e séance")}

### Ce que tu choisis

- **AFL1** : ton type de départ, ta place dans le relais, ta technique de transmission.
- **AFL2 / AFL3** : la répartition des 8 points.
- **AFL3** : tes **deux rôles** parmi starter, chronométreur, observateur-coach et juge de zone ; tes partenaires d'entraînement.

${LIEN_PDF}`,
  },

  "rl-eval-performance": {
    cours: RLE,
    titre: "2. Le jour de l'épreuve et le barème de l'AFL1",
    md: `### Le déroulement

- Des équipes de **2 coureurs de niveau proche**.
- Chaque équipe court **2 ou 3 relais** 2 × 200 m ; départ **au choix** (trépied ou starting-block), donné par un signal extérieur.
- À la **2e tentative**, les coureurs **changent de place**.
- Si le témoin ne franchit pas la ligne d'arrivée ou est transmis hors zone, **un essai supplémentaire** est accordé.
- Zones conventionnelles : **10 m d'élan** et **20 m de transmission**.
- Pour chaque course : un starter, deux chronométreurs, des juges de zone.
- Le **200 m individuel départ arrêté** est couru lors d'une séance précédente : il sert au calcul de l'indice de transmission.

### Le barème (élément 1 et repères individuels)

On lit le barème **par paliers** : on prend les points du premier temps qui n'est pas dépassé.

| Points (/6) | Degré | 200 m filles | Relais filles | 200 m garçons | Relais garçons |
| --- | --- | --- | --- | --- | --- |
| 0 | 1 | 52" | 1'46" | 42" | 1'23" |
| 0,25 | 1 | 51" | 1'44" | 41" | 1'22" |
| 0,5 | 1 | 50" | 1'42" | 40" | 1'21" |
| 0,75 | 1 | 49" | 1'40" | 39" | 1'20" |
| 1 | 1 | 48" | 1'38" | 38" | 1'19" |
| 1,25 | 1 | 47" | 1'36" | 37" | 1'17" – 1'18" |
| 1,5 | 2 | 46" | 1'34" | 36" | 1'15" – 1'16" |
| 1,75 | 2 | 45" | 1'32" | 35" | 1'13" – 1'14" |
| 2 | 2 | 44" | 1'30" | 34" | 1'11" – 1'12" |
| 2,25 | 2 | 43" | 1'28" | 33"5 | 1'09" – 1'10" |
| 2,5 | 2 | 42" | 1'26" | 33" | 1'07" – 1'08" |
| 2,75 | 2 | 41" | 1'24" | 32"5 | 1'05" – 1'06" |
| **3** | 2 | **40"** | **1'20"** | **32"** | **1'04"** |
| 3,25 | 3 | 39" | 1'19" | 31"5 | 1'03" |
| 3,5 | 3 | 38" | 1'18" | 31" | 1'02" |
| 3,75 | 3 | 37" | 1'17" | 30"5 | 1'01" |
| 4 | 3 | 36" | 1'16" | 30" | 1'00" |
| 4,25 | 3 | 35"5 | 1'15" | 29"5 | 59" |
| 4,5 | 3 | 35" | 1'14" | 29" | 58" |
| 4,75 | 4 | 34"5 | 1'13" | 28"5 | 57" |
| 5 | 4 | 34" | 1'12" | 28" | 56"5 |
| 5,25 | 4 | 33"5 | 1'11" | 27"5 | 56" |
| 5,5 | 4 | 33" | 1'10" | 27" | 55"5 |
| 5,75 | 4 | 32"5 | 1'09" | 26"5 | 55" |
| 6 | 4 | 32" | 1'08" | 26" | 54"5 |

En gras : le **seuil national** de performance (1'20" filles, 1'04" garçons pour le relais).

### L'élément 2 : l'indice de transmission (/6)

**Indice = temps du relais − (200 m du coureur 1 + 200 m du coureur 2)**, en secondes.

| Indice | +3,5 | +3 | +2,75 | +2,5 | +2 | +1,75 | +1,5 | +1 | +0,75 | +0,5 | +0,25 | 0 | −0,1 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Points | 0 | 0,25 | 0,5 | 0,75 | 1 | 1,25 | 1,5 | 1,75 | 2 | 2,25 | 2,5 | 2,75 | 3 |

| Indice | −0,2 | −0,3 | −0,4 | −0,5 | −0,6 | −0,7 | −0,8 | −0,9 | −1 | −1,1 | −1,2 | −1,3 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Points | 3,25 | 3,5 | 3,75 | 4 | 4,25 | 4,5 | 4,75 | 5 | 5,25 | 5,5 | 5,75 | 6 |

### Les degrés de l'élément 2

| Degré | Ce qui est observé |
| --- | --- |
| 1 | Crée peu de vitesse et la conserve mal ; la transmission ne fait pas gagner de temps ; actions juxtaposées ; le témoin peut tomber |
| 2 | Crée de la vitesse mais a du mal à la conserver ; gain de temps relatif ; actions étriquées ; le témoin ne tombe pas |
| 3 | Crée et conserve sa vitesse utile ; transmission efficace grâce à une marque adaptée et un signal vocal ; gain de temps assez net |
| 4 | Crée, conserve et transmet sa vitesse maximale ; marques permettant une prise de risque, dans la zone, pour un gain de temps important |`,
  },

  "rl-eval-fil": {
    cours: RLE,
    titre: "3. AFL2 et AFL3 : s'entraîner et assumer des rôles",
    md: `Pour l'AFL2 comme pour l'AFL3, l'enseignant te situe dans un **degré** : chaque degré donne un **nombre de points fixe**, selon la répartition que tu as choisie.

${TABLE_AFL23}

### AFL2 : s'entraîner pour réaliser une performance

Évalué au fil du cycle (carnet d'entraînement ou recueil de données) et éventuellement le jour de l'épreuve.

| Degré | Ce qui est observé |
| --- | --- |
| 1 — Entraînement inadapté | Ne s'entraîne pas assez pour progresser ; préparation et récupération très aléatoires ; échauffement insuffisant ; n'utilise pas ou peu ses données |
| 2 — Partiellement adapté | S'entraîne de façon partielle ; préparation stéréotypée ; échauffement perfectible ; commence un projet mais utilise mal ses données |
| 3 — Adapté | Répétitions de courses suffisantes, travail de la marque adapté au 200 m ; préparation et récupérations adaptées ; échauffement complet |
| 4 — Optimisé | Entraînement qui permet de vrais progrès et une prise de risque à la transmission ; échauffement varié et spécifique ; récupération optimale ; utilise ses données et celles de ses partenaires pour réguler le projet |

### AFL3 : deux rôles parmi quatre

| Rôle | Degré 1 | Degré 4 |
| --- | --- | --- |
| **Juge de zone** | Se positionne, utilise peu les drapeaux, communique de temps en temps avec le professeur | Utilise à chaque fois avec pertinence les drapeaux, reste en communication permanente avec le professeur (zone, couloir, progression du témoin) |
| **Coach / observateur** | N'encourage pas, relève peu d'éléments | Moteur pour ses camarades ; relève et utilise les informations pertinentes pour rendre le relais efficace |
| **Starter** | Donne les commandements très vite | Détache les mots, veille à l'installation des coureurs jusqu'à l'éventuel faux départ, en lien avec le chronométreur |
| **Chronométreur** | Déclenche trop tard, temps erroné, ne transmet pas le temps | Déclenche au bon moment, arrête quand les **épaules** du coureur passent la ligne, transmet le temps au professeur |

Les degrés 2 et 3 décrivent les étapes intermédiaires (voir le protocole en PDF).`,
  },

  "rl-eval-exemple": {
    cours: RLE,
    titre: "4. Exemple de notation : le binôme Cyrille et Steph",
    md: `Cyrille et Steph courent ensemble en **binôme garçons**.

### Les performances

| | Cyrille | Steph |
| --- | --- | --- |
| 200 m individuel (séance précédente) | **33"0** | **34"4** |
| Relais de l'équipe le jour de l'épreuve | 1'08"6 · 1'09"4 · 1'10"3 | (même équipe) |

### 1. L'AFL1 (commun aux deux coureurs)

| Calcul | Valeur | Lecture du barème | Points |
| --- | --- | --- | --- |
| **Élément 1** : moyenne des 2 meilleurs relais | (1'08"6 + 1'09"4) ÷ 2 = **1'09"0** | dans la case 1'09" – 1'10" | **2,25 / 6** |
| **Élément 2** : indice de transmission (meilleur relais) | 1'08"6 − (33"0 + 34"4) = 68"6 − 67"4 = **+1,2 s** | dépasse +1, ne dépasse pas +1,5 | **1,5 / 6** |
| **AFL1** | | | **3,75 / 12** |

L'indice est **positif** : le relais est **plus lent** que la somme de leurs deux 200 m. Le receveur part trop tard et le donneur freine : le passage de témoin leur fait **perdre** 1,2 seconde au lieu d'en gagner.

### 2. L'AFL2 et l'AFL3

| | Cyrille | Steph |
| --- | --- | --- |
| Répartition choisie | b : AFL2 sur 4, AFL3 sur 4 | c : AFL2 sur 6, AFL3 sur 2 |
| AFL2 | Degré 3 → **3 / 4** | Degré 3 → **4,5 / 6** |
| AFL3 | Degré 3 (juge de zone et chronométreur) → **3 / 4** | Degré 4 (starter et chronométreur) → **2 / 2** |
| **AFL2 + AFL3** | **6 / 8** | **6,5 / 8** |

### 3. La note finale

| | AFL1 | AFL2 + AFL3 | **Total** |
| --- | --- | --- | --- |
| Cyrille | 3,75 | 6 | **9,75 / 20** |
| Steph | 3,75 | 6,5 | **10,25 / 20** |

### Ce qui leur a manqué

Leur point faible est la **transmission**. Avec un indice de −0,5 s au lieu de +1,2 s (receveur qui part plus tôt, marque reculée d'1 ou 2 pieds), l'élément 2 passait de 1,5 à **4 points**, et le relais plus rapide faisait aussi monter l'élément 1 : **près de 3 points de plus** chacun.`,
  },
};

// =====================================================================
// FOOTBALL — CA4
// =====================================================================
const FTE = "Football — évaluation (" + BAC + ")";

export const EVAL_FOOT = {
  "ft-eval-structure": {
    cours: FTE,
    titre: "1. L'épreuve du bac : structure de la note",
    md: `Le football fait partie du **champ d'apprentissage 4** : « Conduire et maîtriser un affrontement collectif ou interindividuel pour gagner ». La note est sur **20 points**.

| Attendu | Ce qui est évalué | Points | Quand |
| --- | --- | --- | --- |
| **AFL1** | S'engager pour gagner une rencontre en faisant des choix techniques et tactiques pertinents au regard de l'analyse du rapport de force | **12 points** : élément 1 (8 pts) + élément 2 (4 pts) | Le jour de l'épreuve (CCF) |
| **AFL2** | Se préparer et s'entraîner pour conduire et maîtriser un affrontement | **2, 4 ou 6 points** | Au fil du cycle, éventuellement le jour de l'épreuve |
| **AFL3** | Choisir et assumer les rôles qui permettent un fonctionnement collectif solidaire | **6, 4 ou 2 points** | Au fil du cycle, éventuellement le jour de l'épreuve |

### L'AFL1 en deux éléments

- **Élément 1 (/8)** : s'engager et réaliser des actions techniques d'attaque et de défense en relation avec son projet de jeu — croisement de ton **niveau** (porteur de balle, non-porteur, défenseur) et des **points de ton équipe**.
- **Élément 2 (/4)** : faire des choix au regard de l'analyse du rapport de force — croisement du **niveau de l'équipe**, de sa capacité à **se réorganiser après les temps morts** et du **gain des matchs**.

${REPARTITION("à l'issue de la 3e séance")}

### Ce que tu choisis

- **AFL1** : avec ton équipe (fixée par le professeur à partir de la 4e séance), le **système de jeu**, la répartition des postes, l'animation offensive et défensive, la rotation des remplaçants.
- **AFL3** : tu es évalué comme **auto-arbitre** (joueur qui respecte et fait respecter les règles) et dans **un second rôle** choisi à l'issue de la 3e séance : **coach** ou **observateur** (tous deux joueurs).

${LIEN_PDF}`,
  },

  "ft-eval-deroulement": {
    cours: FTE,
    titre: "2. Le jour de l'épreuve et le barème de l'AFL1",
    md: `### Le déroulement

- **Championnat à 4 équipes**, matchs à **7 contre 7** sur un terrain de football à 7, équipes de force équilibrée.
- Règles du **football à 7 UNSS** : remises en jeu **au pied**, **hors-jeu** signalé dans la moitié de terrain adverse.
- **Règle de mixité** : un garçon ne peut prendre le ballon à une fille (non experte) qu'à sa **4e touche** de balle, sauf sur interception ou dans ses 13 m ; une fille peut récupérer le ballon dès la 1re touche adverse.
- Chaque équipe est évaluée sur **2 rencontres de 24 minutes**, avec **un temps de concertation de 3 minutes** demandé par le coach.
- Changements imposés **toutes les 6 minutes** ; chacun joue au moins 18 minutes par match. Le poste de **gardien n'est pas évalué**.
- Points d'équipe : **victoire 4**, **nul 2**, **défaite 1**.

### Élément 1 : les degrés

| Degré | Porteur de balle | Non-porteur | Défenseur |
| --- | --- | --- | --- |
| 1 | Regard sur le ballon, contrôle approximatif, nombreuses pertes | Passif, jamais démarqué | Ne se replace pas, se laisse déborder |
| 2 | Contrôle correct au sol, conduite possible sans trop de pression, passes imprécises | Demande le ballon mais souvent dans l'alignement du défenseur | Se replace dans sa zone, défend seulement sur le porteur, se fait éliminer |
| 3 | Prise de balle en mouvement, accélère, passes dans le mouvement, tirs réalistes | Se libère du marquage, se rend disponible, soutien, changements de rythme | Se replace après avoir été éliminé, ne se jette plus dans le duel |
| 4 | Contrôle orienté, conserve sous pression, élimine, crée le danger, joue en une touche | Propose des alternatives près ou loin du ballon, appels et contre-appels | Gagne ses duels, intercepte, coulisse avec ses partenaires, joue le hors-jeu |

Les repères sont adaptés pour les **filles** (voir le protocole).

### Élément 1 : les points (/8)

Dans chaque degré, l'enseignant te place **en bas, au milieu ou en haut** du degré ; les **points de l'équipe** sur les 2 matchs ajustent la note.

| Points d'équipe | Degré 1 | Degré 2 | Degré 3 | Degré 4 |
| --- | --- | --- | --- | --- |
| 2 à 5 | 0,5 · 1 · 1,5 | 2,5 · 3 · 3,5 | 4,5 · 5 · 5,5 | 6,5 · 7 · 7,5 |
| 6 à 8 | 0,75 · 1,25 · 1,75 | 2,75 · 3,25 · 3,75 | 4,75 · 5,25 · 5,75 | 6,75 · 7,25 · 7,75 |
| 9 à 12 (3 matchs) | 1 · 1,5 · 2 | 3 · 3,5 · 4 | 5 · 5,5 · 6 | 7 · 7,5 · 8 |

Avec **2 matchs**, une équipe marque de **2 points** (2 défaites) à **8 points** (2 victoires) : la ligne « 2 à 5 » comprend les 2 défaites. La ligne « 9 à 12 » ne sert que si le championnat se joue en **3 matchs** par équipe.

### Élément 2 : niveau de l'équipe et analyse (/4)

| Degré de l'équipe | Organisation collective |
| --- | --- |
| 1 | Pas de bloc équipe, joueurs centrés sur le ballon, actions isolées |
| 2 | Organisation identifiable mais qui s'effrite ; jeu dans l'axe, toujours vers l'avant |
| 3 | Bloc dans la profondeur, 2 lignes, couverture ; contre-attaque maîtrisée |
| 4 | Bloc dans la largeur et la profondeur ; alternance jeu direct / indirect ; solutions face à un bloc bas |

**Niveaux d'analyse** après les temps morts : **A** aucune utilisation, **B** régulations peu pertinentes, **C** réorganisation cohérente, **D** réorganisation cohérente et efficace.

| Points d'équipe | Degré 1 (A · B · C · D) | Degré 2 | Degré 3 | Degré 4 |
| --- | --- | --- | --- | --- |
| 2 à 5 | 0 · 0,25 · 0,5 · 0,75 | 1 · 1,25 · 1,5 · 1,75 | 2 · 2,25 · 2,5 · 2,75 | 3 · 3,25 · 3,5 · 3,75 |
| 6 à 8 | 0,25 · 0,5 · 0,75 · 1 | 1,25 · 1,5 · 1,75 · 2 | 2,25 · 2,5 · 2,75 · 3 | 3,25 · 3,5 · 3,75 · 4 |
| 9 à 12 (3 matchs) | 0,5 · 0,75 · 1 · 1,25 | 1,5 · 1,75 · 2 · 2,25 | 2,5 · 2,75 · 3 · 3,25 | 3,5 · 3,75 · 4 · 4 |`,
  },

  "ft-eval-roles": {
    cours: FTE,
    titre: "3. AFL2 et AFL3 : s'entraîner et assumer des rôles",
    md: `Chaque degré donne un **nombre de points fixe**, selon ta répartition :

${TABLE_AFL23}

### AFL2 : se préparer et s'entraîner

| Degré | Se préparer | Maintenir son engagement | Engagement dans le cycle |
| --- | --- | --- | --- |
| 1 | Principes de préparation non appliqués | Passif, concerné seulement quand le ballon arrive | S'engage peu |
| 2 | Connaissance partielle de l'échauffement | Ne tient pas l'effort dans la durée | S'engage selon ses envies |
| 3 | Connaît et applique les principes | Régule son intensité pour tenir sur la période de jeu | S'engage avec régularité |
| 4 | Connaît des exercices spécifiques et leur utilité | Tient un effort optimal sur les périodes de jeu | S'engage de façon soutenue toute la séance |

### AFL3 : auto-arbitre + coach ou observateur

| Rôle | Degré 1 | Degré 4 |
| --- | --- | --- |
| **Arbitre / joueur** | Ne se maîtrise pas, conteste, ne connaît pas le règlement | Ne commet pas de faute, s'arrête de lui-même, encourage les autres à jouer proprement |
| **Coach / joueur** | Peu actif, aucune pertinence | Analyse les forces et faiblesses, prend les temps morts avec pertinence, corrige la tactique ; discours clair et structuré |
| **Observateur / joueur** | Données fausses ou inexploitables | Analyse ses observations (faites en jouant) et propose des adaptations simples et pertinentes |

Après une intervention du coach, le professeur demande à l'équipe si elle **valide** ses analyses.`,
  },

  "ft-eval-exemple": {
    cours: FTE,
    titre: "4. Exemple de notation : Lohan",
    md: `Lohan joue milieu de terrain. Son équipe fait **1 victoire et 1 nul** : 4 + 2 = **6 points d'équipe** (ligne « 6 à 8 »).

### L'AFL1

| Élément | Ce qui a été observé | Placement | Points |
| --- | --- | --- | --- |
| **Élément 1** | Contrôle orienté, conserve le ballon sous pression, élimine et crée le danger ; appels et contre-appels ; gagne la plupart de ses duels | Degré 4, **milieu** du degré | **7,25 / 8** |
| **Élément 2** | L'équipe défend en bloc sur 2 lignes et maîtrise la contre-attaque (degré 3) ; au temps mort, elle se réorganise de façon cohérente (analyse **C**) | Degré 3, niveau C | **2,75 / 4** |
| **AFL1** | | | **10 / 12** |

### L'AFL2 et l'AFL3

Lohan a choisi la répartition **b : 4 / 4**.

| Attendu | Observation | Degré | Points |
| --- | --- | --- | --- |
| **AFL2** | Connaît et applique les principes d'échauffement, s'engage régulièrement, tient l'effort sur toute la période de jeu | 3 | **3 / 4** |
| **AFL3** | Auto-arbitre fiable (quelques fautes sans danger, s'arrête quand on lui signale une faute) et coach pertinent au temps mort | 3 | **3 / 4** |

### La note finale

| AFL1 | AFL2 | AFL3 | **Total** |
| --- | --- | --- | --- |
| 10 / 12 | 3 / 4 | 3 / 4 | **16 / 20** |

Lohan est déjà au degré 4 comme joueur. Ses points à gagner sont **collectifs** : une équipe qui alterne jeu direct et indirect (degré 4) et un temps mort **efficace** (analyse D) donnaient 3,75 au lieu de 2,75 à l'élément 2.`,
  },
};

// =====================================================================
// BASKET-BALL — CA4
// =====================================================================
const BKE = "Basket-ball — évaluation (" + BAC + ")";

export const EVAL_BASKET = {
  "bk-eval-structure": {
    cours: BKE,
    titre: "1. L'épreuve du bac : structure de la note",
    md: `Le basket-ball fait partie du **champ d'apprentissage 4** : « Conduire et maîtriser un affrontement collectif ou interindividuel pour gagner ». La note est sur **20 points**.

| Attendu | Ce qui est évalué | Points | Quand |
| --- | --- | --- | --- |
| **AFL1** | Faire des choix de jeu, de placement et de déplacement selon le rapport de force, et les réaliser comme porteur de balle, non-porteur et défenseur | **12 points** : élément 1 (8 pts) + élément 2 (4 pts) | Le jour de l'épreuve (CCF) |
| **AFL2** | Se préparer et s'entraîner pour conduire et maîtriser un affrontement | **2, 4 ou 6 points** | Au fil du cycle **et** le jour de l'épreuve |
| **AFL3** | Choisir et assumer les rôles qui permettent un fonctionnement collectif solidaire | **6, 4 ou 2 points** | Au fil du cycle **et** le jour de l'épreuve |

### L'AFL1 en deux éléments

- **Élément 1 (/8)** : actions techniques comme **porteur de balle** (/4), **non-porteur** (/2) et **défenseur** (/2). Le total place l'élève dans un degré, puis les **résultats des matchs** fixent la note dans ce degré.
- **Élément 2 (/4)** : choix au regard du rapport de force, en **attaque** (/2) et en **défense** (/2), ajustés de la même façon par les résultats.

${REPARTITION("à l'issue de la 3e séance")}

### Ce que tu choisis

- **AFL1** : ton poste dans l'équipe, l'organisation de jeu ou le système.
- **AFL3** : au moins **deux rôles** parmi arbitre (sur le terrain ou officiel de table), partenaire d'entraînement, coach, capitaine.

${LIEN_PDF}`,
  },

  "bk-eval-deroulement": {
    cours: BKE,
    titre: "2. Le jour de l'épreuve et le barème de l'AFL1",
    md: `### Le déroulement

- Matchs à **4 contre 4** sur terrain réglementaire, équipes de **4 + 1 joueurs** de force équilibrée.
- **Tournoi à 3 équipes**, 2 groupes de niveau ; matchs de **2 × 6 minutes**, mi-temps de 2 minutes, un **temps mort par mi-temps**.
- Les évaluateurs voient chaque équipe sur **2 matchs**.
- Points d'équipe : **victoire 3**, **nul 2**, **défaite 1**.

### Élément 1 : les degrés

| Degré | Porteur de balle (/4) | Non-porteur (/2) | Défenseur (/2) |
| --- | --- | --- | --- |
| 1 | Dribble vers l'avant non maîtrisé, passe en cloche, tir en position défavorable — **0 à 1** | Statique, passif — **0 à 0,5** | Statique, défend avec les bras, beaucoup de fautes — **0 à 0,5** |
| 2 | Dribble maîtrisé sans opposition, passe irrégulière, tir en appui en position favorable — **1 à 2** | Se démarque vers l'avant seulement — **0,5 à 1** | Suit son attaquant, interventions irrégulières — **0,5 à 1** |
| 3 | Dribble avec changements de direction, passe dans la course, tir adapté mais réussite faible — **2 à 3** | Se démarque vers l'avant et sur les côtés, va au rebond — **1 à 1,5** | Se place entre son attaquant et le panier, défend sans faute — **1 à 1,5** |
| 4 | Dribble qui élimine, passe tendue adaptée, tir maîtrisé en appui ou en suspension — **3 à 4** | Se démarque avec changements de direction et de rythme, appelle au bon moment — **1,5 à 2** | Se replace vite selon le porteur, défend avec les jambes, sans faute — **1,5 à 2** |

Total sur 8 : **degré 1** de 0 à 2, **degré 2** de 2 à 4, **degré 3** de 4 à 6, **degré 4** de 6 à 8.

### Élément 1 : la note selon les matchs (/8)

| Résultats (points d'équipe) | Degré 1 | Degré 2 | Degré 3 | Degré 4 |
| --- | --- | --- | --- | --- |
| 2 victoires (6) | 2 | 4 | 6 | 8 |
| 1 victoire + 1 nul (5) | 1,75 | 3,5 | 5,5 | 7,5 |
| 1 victoire + 1 défaite (4) | 1,5 | 3 | 5 | 7 |
| 2 nuls (3) | 1 | 2,75 | 4,75 | 6,75 |
| 1 nul + 1 défaite (3) | 0,5 | 2,5 | 4,5 | 6,5 |
| 2 défaites (2) | 0 | 2,25 | 4,25 | 6,25 |

### Élément 2 : choix au regard du rapport de force

| Degré | Attaque (/2) | Défense (/2) |
| --- | --- | --- |
| 1 | Aucune prise en compte de la défense | Repli tardif ou inexistant |
| 2 | Ne prend en compte que son défenseur | Repli irrégulier, ne pense qu'à son attaquant |
| 3 | S'engage de façon adaptée si le surnombre est évident | Repli régulier, prend en compte son attaquant et le porteur |
| 4 | Jeu rapide dès la récupération ; crée et utilise espaces libres et surnombres sur jeu placé | Repli rapide et efficace, prend en compte attaquant, porteur et non-porteurs |

| Résultats | Degré 1 | Degré 2 | Degré 3 | Degré 4 |
| --- | --- | --- | --- | --- |
| 2 victoires | 1 | 2 | 3 | 4 |
| 1 victoire + 1 nul | 0,75 | 1,9 | 2,9 | 3,9 |
| 1 victoire + 1 défaite | 0,5 | 1,75 | 2,75 | 3,75 |
| 2 nuls ou 1 nul + 1 défaite | 0,25 | 1,5 | 2,5 | 3,5 |
| 2 défaites | 0 | 1,25 | 2,25 | 3,25 |`,
  },

  "bk-eval-roles": {
    cours: BKE,
    titre: "3. AFL2 et AFL3 : s'entraîner et assumer des rôles",
    md: `Chaque degré donne un **nombre de points fixe**, selon ta répartition :

${TABLE_AFL23}

### AFL2 : se préparer et s'entraîner

Engagement **tout le cycle** dans les exercices spécifiques, échauffement général et spécifique avant les matchs (deuxième moitié du cycle et jour de l'épreuve).

| Degré | Intensité des exercices | Échauffement individuel et collectif |
| --- | --- | --- |
| 1 — Inadapté | Faible engagement dans les répétitions (tirs, manège) | Peu soutenu et inapproprié |
| 2 — Partiellement adapté | Engagement régulier dans les répétitions | Compte sur les autres |
| 3 — Adapté | Engagement régulier dans les différents exercices | Propose des exercices, s'échauffe complètement seul |
| 4 — Optimisé | Engagement régulier dans tous les exercices | Dirige l'échauffement sans autoritarisme, situations efficaces et bien ordonnées |

### AFL3 : au moins deux rôles

| Rôle | Degré 1 | Degré 4 |
| --- | --- | --- |
| **Arbitre / officiel de table** | Non fiable, nombreuses erreurs de score | Patron du terrain, utilise les bons gestes |
| **Partenaire d'entraînement** | Individualiste, voire perturbateur | Au service du collectif, aide et conseille |
| **Coach** | Peu sérieux, n'apporte rien | Utilise postes, forces et faiblesses ; connaît des schémas tactiques ; temps morts au bon moment |
| **Capitaine** | Aucun rôle, pas impliqué | Prend en main son équipe, motive, gère les conflits |`,
  },

  "bk-eval-exemple": {
    cours: BKE,
    titre: "4. Exemple de notation : Kevin",
    md: `Kevin joue **ailier**. Son équipe gagne ses **2 matchs** (6 points d'équipe).

### L'AFL1

| Élément | Ce qui a été observé | Points |
| --- | --- | --- |
| Porteur de balle | Change de direction en dribble, passe dans la course ; tir en appui encore irrégulier | 2,5 / 4 |
| Non-porteur | Se démarque vers l'avant et sur les côtés, va au rebond | 1,25 / 2 |
| Défenseur | Bien placé entre son attaquant et le panier, sans faute | 1,25 / 2 |
| Total → degré | 5 / 8 → **degré 3** | |
| **Élément 1** | Degré 3 avec 2 victoires | **6 / 8** |
| Attaque | S'engage quand le surnombre est évident | 1,25 / 2 |
| Défense | Repli régulier, surveille son attaquant et le porteur | 1,25 / 2 |
| **Élément 2** | 2,5 / 4 → degré 3 avec 2 victoires | **3 / 4** |
| **AFL1** | | **9 / 12** |

### L'AFL2 et l'AFL3

Kevin a choisi la répartition **b : 4 / 4**.

| Attendu | Observation | Degré | Points |
| --- | --- | --- | --- |
| **AFL2** | Engagement régulier dans tous les exercices, propose des exercices à l'échauffement | 3 | **3 / 4** |
| **AFL3** | Arbitre et officiel de table : les feuilles sont remplies mais avec quelques décalages de score | 2 | **2 / 4** |

### La note finale

| AFL1 | AFL2 | AFL3 | **Total** |
| --- | --- | --- | --- |
| 9 / 12 | 3 / 4 | 2 / 4 | **14 / 20** |

Les victoires comptent : avec **1 victoire et 1 défaite**, les mêmes observations donnaient 5 + 2,75 = 7,75 à l'AFL1, soit **12,75 / 20**. Pour aller plus haut, Kevin doit fiabiliser son **arbitrage** (degré 3 = 1 point de plus) et son **tir**.`,
  },
};

// =====================================================================
// VOLLEY-BALL — CA4
// =====================================================================
const VBE = "Volley-ball — évaluation (" + BAC + ")";

export const EVAL_VOLLEY = {
  "vb-eval-structure": {
    cours: VBE,
    titre: "1. L'épreuve du bac : structure de la note",
    md: `Le volley-ball fait partie du **champ d'apprentissage 4** : « Conduire et maîtriser un affrontement collectif ou interindividuel pour gagner ». La note est sur **20 points**.

| Attendu | Ce qui est évalué | Points | Quand |
| --- | --- | --- | --- |
| **AFL1** | S'engager pour gagner une rencontre en faisant des choix techniques et tactiques pertinents au regard de l'analyse du rapport de force | **12 points** : élément 1 (8 pts) + élément 2 (4 pts) | Le jour de l'épreuve (CCF) |
| **AFL2** | Se préparer et s'entraîner pour conduire et maîtriser un affrontement | **2, 4 ou 6 points** | Au fil du cycle, éventuellement le jour de l'épreuve |
| **AFL3** | Choisir et assumer les rôles qui permettent un fonctionnement collectif solidaire | **6, 4 ou 2 points** | Au fil du cycle, éventuellement le jour de l'épreuve |

### L'AFL1 en deux éléments

- **Élément 1 (/8)** : s'engager et réaliser des actions techniques d'attaque et de défense en relation avec son projet de jeu (porteur de balle, non-porteur, collectif).
- **Élément 2 (/4)** : faire des choix au regard de l'analyse du rapport de force (questionnement des équipes pendant la pause).

Pour chaque élément, l'enseignant place l'élève dans un **degré**, puis le **gain des matchs** fixe la note dans ce degré.

${REPARTITION("à l'issue de la 4e leçon")}

### Ce que tu choisis

- **AFL1** : équipe de niveau homogène (négociable avec l'enseignant) ; postes libres, mais **tout le monde sert** et passe au moins une rotation en **réception** ; organisation en réception, défense et attaque choisie par l'équipe.
- **AFL3** : au moins **deux rôles** parmi capitaine, entraîneur, tuteur, arbitre, observateur.

${LIEN_PDF}`,
  },

  "vb-eval-deroulement": {
    cours: VBE,
    titre: "2. Le jour de l'épreuve et le barème de l'AFL1",
    md: `### Le déroulement

- Matchs à **4 contre 4** sur un terrain de **14 m × 7 m**, équipes de force équilibrée.
- Chaque équipe dispute **au moins deux rencontres de 25 points** (tie-break) contre la **même équipe**, avec un **temps mort d'1 minute** par rencontre et un temps de concertation entre les deux.
- Filet de **2,00 m à 2,30 m** ; **2 services de suite** au maximum par joueur ; mise en jeu sans service possible pour les équipes les plus en difficulté.
- Points d'équipe : **victoire 4**, **défaite 1** (2 défaites = 2, 1 victoire et 1 défaite = 5, 2 victoires = 8).

### Élément 1 : les degrés

| Degré | Porteur de balle | Non-porteur | Collectif |
| --- | --- | --- | --- |
| 1 | Service non maîtrisé, passes et manchettes trop basses, renvois sans intention | Surpris par la passe, passif, évite le ballon | Pas de cible ni d'organisation, renvois directs |
| 2 | Service à 3 m aléatoire et haut, passes hautes mais non orientées | Passif, ne se replace pas | Réception vers le haut mais pas en zone avant ; peu de passes pour un attaquant |
| 3 | Service tendu mais aléatoire, passes et manchettes hautes vers la zone avant, attaques placées, début de smash | Déplacements actifs, jambes fléchies | Réception haute en zone avant, attaques depuis la zone avant, défense identifiable, replacement |
| 4 | Service tendu efficace (7 m), passes hautes sur le passeur, attaques placées et smashées, contre | Très actif, soutien, plonge, appelle le ballon | Adaptation à l'adversaire, attaques dangereuses et souvent smashées, rôles répartis, passeur défini |

Pour les **filles**, l'attaque smashée correspond au meilleur niveau attendu.

### Le barème selon les matchs

| Résultats (points d'équipe) | Degré 1 | Degré 2 | Degré 3 | Degré 4 |
| --- | --- | --- | --- | --- |
| **Élément 1 (/8)** — 2 défaites (2) | 0,5 | 2,5 | 4,5 | 6,5 |
| 1 victoire + 1 défaite (5) | 1,25 | 3,25 | 5,25 | 7,25 |
| 2 victoires (8) | 2 | 4 | 6 | 8 |
| **Élément 2 (/4)** — 2 défaites (2) | 0,25 | 1,25 | 2,25 | 3,25 |
| 1 victoire + 1 défaite (5) | 0,6 | 1,6 | 2,6 | 3,6 |
| 2 victoires (8) | 1 | 2 | 3 | 4 |

### Élément 2 : les degrés

| Degré | Analyse du rapport de force |
| --- | --- |
| 1 | Pas de repérage des points forts et faibles adverses, pas d'analyse |
| 2 | Analyse des points forts et faibles erronée |
| 3 | Identifie les points forts et faibles adverses mais ne propose pas de remédiation adaptée |
| 4 | Identifie les points forts et faibles adverses et propose des adaptations cohérentes avec son propre niveau |`,
  },

  "vb-eval-roles": {
    cours: VBE,
    titre: "3. AFL2 et AFL3 : s'entraîner et assumer des rôles",
    md: `Chaque degré donne un **nombre de points fixe**, selon ta répartition :

${TABLE_AFL23}

### AFL2 : se préparer et s'entraîner (tout le cycle, épreuve comprise)

| Degré | S'entraîner activement | Savoir s'échauffer |
| --- | --- | --- |
| 1 | Travaille peu, ne respecte pas les consignes | S'échauffe sans aucun sens, ne connaît pas les principes |
| 2 | Travaille par intermittence | S'échauffe de façon aléatoire, manque de régularité |
| 3 | S'entraîne sérieusement et en autonomie | S'échauffe sérieusement et connaît les principes |
| 4 | Autonome et très actif, connaît des exercices pour progresser, aide les autres | Échauffement autonome, 3 phases connues et appliquées, connaît les muscles principaux |

### AFL3 : au moins deux rôles

| Rôle | Degré 1 | Degré 4 |
| --- | --- | --- |
| **Capitaine** | Aucun rôle, pas impliqué | Prend en main son équipe, motive, gère les conflits |
| **Entraîneur** | Exercices incohérents avec le niveau de jeu | Exercices adaptés aux besoins, fait respecter les choix tactiques, trouve des solutions en match |
| **Tuteur** | Pas impliqué auprès du novice | Travail intense et conseils judicieux pour faire progresser le novice |
| **Arbitre** | Ne connaît pas les règles, passif | Connaît toutes les règles et les gestes, annonce le score, fait respecter l'ordre |
| **Observateur** | Fiche mal remplie, inexploitable | Fiche bien remplie et propositions judicieuses pour l'organisation de l'équipe |`,
  },

  "vb-eval-exemple": {
    cours: VBE,
    titre: "4. Exemple de notation : Maëly",
    md: `Maëly joue **passeuse** dans son équipe de 4. Contre la même équipe, ils gagnent **les 2 rencontres** (8 points d'équipe).

### L'AFL1

| Élément | Ce qui a été observé | Degré | Points |
| --- | --- | --- | --- |
| **Élément 1** | Passes hautes orientées vers la zone avant, service tendu mais irrégulier, déplacements actifs ; l'équipe attaque depuis la zone avant | 3 | **6 / 8** |
| **Élément 2** | À la pause, l'équipe repère que l'adversaire défend mal le fond du terrain et décide de servir systématiquement dans cette zone, ce qui fonctionne | 4 | **4 / 4** |
| **AFL1** | | | **10 / 12** |

### L'AFL2 et l'AFL3

Maëly a choisi la répartition **b : 4 / 4**.

| Attendu | Observation | Degré | Points |
| --- | --- | --- | --- |
| **AFL2** | Autonome et très active, propose des exercices de passe à son équipe, échauffement complet en 3 phases | 4 | **4 / 4** |
| **AFL3** | Capitaine et arbitre : conseille ses coéquipiers avec une attitude positive ; arbitre qui connaît les règles mais pas tous les gestes | 3 | **3 / 4** |

### La note finale

| AFL1 | AFL2 | AFL3 | **Total** |
| --- | --- | --- | --- |
| 10 / 12 | 4 / 4 | 3 / 4 | **17 / 20** |

Pour viser plus haut, Maëly doit fiabiliser son **service tendu** et donner des passes **sur un passeur défini** (degré 4 de l'élément 1 : 8 au lieu de 6).`,
  },
};

// =====================================================================
// BADMINTON — CA4
// =====================================================================
const BDE = "Badminton — évaluation (" + BAC + ")";

export const EVAL_BADMINTON = {
  "bd-eval-structure": {
    cours: BDE,
    titre: "1. L'épreuve du bac : structure de la note",
    md: `Le badminton fait partie du **champ d'apprentissage 4** : « Conduire et maîtriser un affrontement collectif ou interindividuel pour gagner ». La note est sur **20 points**.

| Attendu | Ce qui est évalué | Points | Quand |
| --- | --- | --- | --- |
| **AFL1** | S'engager et réaliser des actions techniques d'attaque et de défense (élément 1) ; faire des choix au regard de l'analyse du rapport de force (élément 2) | **12 points** : élément 1 (8 pts) + élément 2 (4 pts) | Le jour de l'épreuve (CCF) |
| **AFL2** | Se préparer à un effort spécifique, s'engager dans le cycle, maintenir un engagement physique | **2, 4 ou 6 points** | Au fil du cycle, éventuellement le jour de l'épreuve |
| **AFL3** | Rôles de gestionnaire, coach, observateur | **6, 4 ou 2 points** | Au fil du cycle, éventuellement le jour de l'épreuve |

### Comment l'AFL1 est ajusté

- **Élément 1 (/8)** : l'enseignant te place dans un **degré** ; ta note dans ce degré dépend de ton **classement parmi les élèves de ce degré**, filles et garçons séparément.
- **Élément 2 (/4)** : ta note dans le degré dépend du **nombre de victoires** dans ta poule.

${REPARTITION("à l'issue de la 3e séance")}

### Ce que tu choisis

- **AFL1** : le moment de ton **temps mort** dans le set (toi ou ton coach).
- **AFL3** : **deux rôles sur trois** : gestionnaire, coach, observateur (à l'issue de la 3e séance).

${LIEN_PDF}`,
  },

  "bd-eval-deroulement": {
    cours: BDE,
    titre: "2. Le jour de l'épreuve et le barème de l'AFL1",
    md: `### Le déroulement

- Matchs en **2 sets gagnants de 11 points**, dans des **poules de niveau homogène** de 4 ou 5 joueurs.
- Pendant le cycle, on monte ou on descend de poule selon ses résultats ; les matchs sont souvent **à thème**.
- Un **temps mort de 2 minutes** par set (joueur ou coach), et **2 minutes de concertation** avec le coach à la fin de chaque set.

### Élément 1 : les degrés (garçons)

| Degré | Ce qui est observé |
| --- | --- |
| 1 | Jeu régulier mais trajectoires tendues sur l'adversaire, au centre ; jeu réflexe ; déplacements tardifs |
| 2 | Renvois plus variés, axe central privilégié ; frappes de rupture sur volant haut au filet ; déplacements rapides mais pas toujours équilibrés |
| 3 | Trajectoires variées en profondeur et largeur et/ou en vitesse ; exploite les volants favorables au filet ; un coup prioritaire efficace ; déplacements rapides et équilibrés |
| 4 | Déplace l'adversaire avec des volants proches des lignes ; exploite les opportunités au filet et jusqu'à mi-court (smash) ; reste équilibré sous forte pression |

Pour les **filles**, les repères sont décalés (voir le protocole) : au degré 1, renvoi stabilisé en zone de confort ; au degré 4, trajectoires variées en profondeur et largeur et exploitation des situations favorables au filet.

### Élément 1 : la note selon le classement dans le degré (/8)

| Nombre d'élèves dans le degré | Bas du degré | Milieu | Haut |
| --- | --- | --- | --- |
| 3 | 3e | 2e | 1er |
| 4 | 4e | 2e, 3e | 1er |
| 5 | 4e, 5e | 2e, 3e | 1er |
| 6 | 5e, 6e | 3e, 4e | 1er, 2e |
| **Degré 1** | 0,5 | 1,25 | 2 |
| **Degré 2** | 2,5 | 3,25 | 4 |
| **Degré 3** | 4,5 | 5,25 | 6 |
| **Degré 4** | 6,5 | 7,25 | 8 |

### Élément 2 : les degrés

| Degré | Ce qui est observé |
| --- | --- |
| 1 | Adaptations aléatoires ; pas de projet, subit ; points marqués sur fautes adverses |
| 2 | Quelques adaptations ; projet débutant ou peu adapté ; prend en compte une force ou une faiblesse marquante |
| 3 | Adaptations régulières ; projet cohérent avec ses capacités et les principales forces ou faiblesses adverses |
| 4 | Adaptations permanentes ; projet clair qui tient compte de ses forces et faiblesses **et** de celles de l'adversaire |

### Élément 2 : la note selon les victoires dans la poule (/4)

| Poule de 4 : victoires | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| Degré 1 | 0,4 | 0,6 | 0,8 | 1 |
| Degré 2 | 1,4 | 1,6 | 1,8 | 2 |
| Degré 3 | 2,4 | 2,6 | 2,8 | 3 |
| Degré 4 | 3,4 | 3,6 | 3,8 | 4 |

| Poule de 5 : victoires | 0 | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- | --- |
| Degré 1 | 0,2 | 0,4 | 0,6 | 0,8 | 1 |
| Degré 2 | 1,2 | 1,4 | 1,6 | 1,8 | 2 |
| Degré 3 | 2,2 | 2,4 | 2,6 | 2,8 | 3 |
| Degré 4 | 3,2 | 3,4 | 3,6 | 3,8 | 4 |`,
  },

  "bd-eval-roles": {
    cours: BDE,
    titre: "3. AFL2 et AFL3 : s'entraîner et assumer des rôles",
    md: `Chaque degré donne un **nombre de points fixe**, selon ta répartition :

${TABLE_AFL23}

### AFL2 : se préparer et s'entraîner

| Degré | Se préparer à l'effort | Engagement dans le cycle | Maintenir l'engagement physique |
| --- | --- | --- | --- |
| 1 | Principes de préparation et de récupération non appliqués | S'engage peu | Passif, non concerné par les résultats |
| 2 | Connaissance partielle de l'échauffement spécifique | S'engage selon ses envies | Ne tient pas l'effort dans la durée |
| 3 | Connaît et applique les principes | S'engage régulièrement | Régule son intensité pour tenir sur la période de jeu |
| 4 | Connaît différents exercices spécifiques et leur utilité | S'engage de façon soutenue toute la séance | Tient un effort optimal sur les périodes de jeu |

### AFL3 : deux rôles sur trois

L'évaluation s'appuie sur ta prestation et sur les documents à remplir (feuille de score, fiche d'organisation du tournoi, fiche d'observation).

| Rôle | Degré 1 | Degré 4 |
| --- | --- | --- |
| **Gestionnaire** | Peu concerné, feuille de score peu fiable | Organise les matchs d'un tournoi, gère temps de repos, terrains et classement |
| **Coach** | Peu attentif au match de son partenaire | Encourage et donne des conseils adaptés aux capacités du partenaire ; prise de parole claire et structurée |
| **Observateur** | Données fausses ou inexploitables | Analyse les données et propose des adaptations techniques et tactiques pertinentes |`,
  },

  "bd-eval-exemple": {
    cours: BDE,
    titre: "4. Exemple de notation : Eléa",
    md: `Eléa est placée par l'enseignant au **degré 4** de l'élément 1, avec 2 autres filles de ce degré. Le jour de l'épreuve, elle joue dans une **poule de 4**.

### L'AFL1

| Élément | Ce qui a été observé | Points |
| --- | --- | --- |
| **Élément 1** | Trajectoires variées en profondeur et en largeur, volants proches des lignes, attaque au filet ; elle termine **1re des 3 filles** du degré 4 (haut du degré) | **8 / 8** |
| **Élément 2** | Projet cohérent : jouer le revers de ses adversaires (degré 3) ; **3 victoires** sur 3 matchs dans sa poule de 4 | **3 / 4** |
| **AFL1** | | **11 / 12** |

### L'AFL2 et l'AFL3

Eléa a choisi la répartition **b : 4 / 4**.

| Attendu | Observation | Degré | Points |
| --- | --- | --- | --- |
| **AFL2** | Connaît et applique les principes d'échauffement, s'engage régulièrement | 3 | **3 / 4** |
| **AFL3** | Gestionnaire et coach : organise les matchs de sa poule et tient le classement ; conseils pertinents mais pas toujours adaptés à sa partenaire | 3 | **3 / 4** |

### La note finale

| AFL1 | AFL2 | AFL3 | **Total** |
| --- | --- | --- | --- |
| 11 / 12 | 3 / 4 | 3 / 4 | **17 / 20** |

Son projet de jeu reste centré sur **une** faiblesse adverse : en tenant compte aussi de **ses propres forces** (degré 4), elle obtenait 4 / 4 à l'élément 2, soit **18 / 20**.`,
  },
};

// =====================================================================
// ESCALADE — CA2
// =====================================================================
const ESE = "Escalade — évaluation (" + BAC + ")";

const COTATIONS_ESC = `| Degré | Points de 4a / 4a-4b | 4b / 4c | 4c / 5a | 5a / 5b | 5b / 5c | 5c / 6a |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0,25 | 0,5 | 0,75 | 1 | 1,25 | 1,5 |
| 2 | 1,75 | 2 | 2,25 | 2,5 | 2,75 | 3 |
| 3 | 3,25 | 3,5 | 3,75 | 4 | 4,25 | 4,5 |
| 4 | 4,75 | 5 | 5,25 | 5,5 | 5,75 | 6 |

Dans chaque case : **cotation filles / cotation garçons**. Exemple : une voie en **5b** rapporte au degré 3 **4,25 points** à une fille (colonne 5b / 5c) et **4 points** à un garçon (colonne 5a / 5b).`;

export const EVAL_ESCALADE = {
  "esc-eval-principe": {
    cours: ESE,
    titre: "1. L'épreuve du bac : structure de la note",
    md: `L'escalade fait partie du **champ d'apprentissage 2** : « Adapter son déplacement à des environnements variés ou incertains ». La note est sur **20 points**.

| Attendu | Ce qui est évalué | Points | Quand |
| --- | --- | --- | --- |
| **AFL1** | S'engager à l'aide d'une motricité spécifique pour réaliser en sécurité et à son meilleur niveau un itinéraire : difficulté de la voie, pertinence de ce choix, efficacité du déplacement | **12 points** : deux éléments sur 6 points | Le jour de l'épreuve |
| **AFL2** | S'entraîner individuellement et collectivement pour se déplacer de manière efficiente et en toute sécurité (carnet d'entraînement) | **2, 4 ou 6 points** | Au fil du cycle |
| **AFL3** | Coopérer pour réaliser un projet de déplacement en toute sécurité : assureur en tête, assureur en moulitête, coach-contre-assureur | **6, 4 ou 2 points** | Au fil du cycle, éventuellement le jour de l'épreuve |

${REPARTITION("à l'issue de la 4e séance, une fois l'assurage en tête abordé")}

### Ce que tu choisis

- **AFL1** : la **difficulté** de ta voie et ton **mode d'évolution** : **tête** ou **moulitête**.
- **AFL3** : ton rôle parmi assureur en tête, assureur en moulitête, coach-contre-assureur.

### Le jour de l'épreuve

- Voies d'au moins **7 m** en SAE, du **4a au 6a**. Groupes de 3 : **grimpeur, assureur, coach-contre-assureur**.
- Tu désignes **2 voies de même cotation** ; l'une est **tirée au sort**, à grimper en tête ou en moulitête.
- En tête, les **2 premières dégaines** sont déjà mousquetonnées.
- Tu t'équipes avec ton assureur, vous vous **vérifiez mutuellement**, puis l'enseignant vérifie.
- Tu as **6 minutes** (le chrono démarre quand le 2e pied quitte le sol). **Une chute** est autorisée : tu repars de là ; à la 2e chute, l'épreuve s'arrête. Une erreur de mousquetonnage non corrigée (yoyo, corde à l'envers, point sauté) arrête aussi l'épreuve.
- **Moulitête** : tu grimpes en tête en étant aussi assuré par une seconde corde en moulinette.

${LIEN_PDF}`,
  },

  "esc-eval-bareme": {
    cours: ESE,
    titre: "2. Le barème de l'AFL1",
    md: `Pour chacun des deux éléments, l'enseignant te place dans un **degré**, puis la **cotation de la voie réussie** fixe tes points dans ce degré.

**En moulitête, tu ne peux pas dépasser le degré 3** (9 / 12 au maximum à l'AFL1).

### Élément 1 : lire et analyser la voie pour choisir et conduire son itinéraire (/6)

| Degré | Ce qui est observé |
| --- | --- |
| 1 | Voie au-dessus de ses capacités, profil non pris en compte ; chute ou ne termine pas dans le temps |
| 2 | Voie en deçà de ses capacités ou bien trop dure ; chute au 3e point, ou termine avec de nombreux arrêts pour lire la voie |
| 3 | Choisit la voie la plus dure réussie pendant le cycle ; quelques pauses pour lire ; sort la voie dans le temps, avec difficulté |
| 4 | Niveau et profil de voie adaptés ; sort la voie en **moins de la moitié du temps** |

### Élément 2 : adapter son déplacement, efficience et mousquetonnage (/6)

| Degré | Ce qui est observé |
| --- | --- |
| 1 | Grimpe en réaction ; tire sur les bras ; pieds « en canard » ; bras et jambes tendus, face à la paroi ; tient mal la corde ; yoyo ou corde à l'envers |
| 2 | Déplacement par à-coups ; monte ses pieds en s'équilibrant avec les mains ; utilise souvent la pointe du pied ; s'y reprend à plusieurs fois pour mousquetonner |
| 3 | Déplacement continu dans les zones moyennes ; pose de pieds précise ; accepte le déséquilibre ; utilise très souvent une position d'équilibre pour clipper ; mousquetonne des 2 mains |
| 4 | Déplacement fluide sur tout le parcours ; charge toujours ses appuis ; déséquilibres maîtrisés ; mousquetonnage ambidextre intégré à la grimpe |

### Les points selon la cotation (les deux éléments)

${COTATIONS_ESC}`,
  },

  "esc-eval-afl23": {
    cours: ESE,
    titre: "4. AFL2 et AFL3 : s'entraîner et coopérer",
    md: `Chaque degré donne un **nombre de points fixe**, selon ta répartition :

${TABLE_AFL23}

### AFL2 : s'entraîner (carnet de suivi rempli à chaque montée du trio)

| Degré | Gérer ses efforts et progresser | Tenue du carnet |
| --- | --- | --- |
| 1 — Inadapté | Peu de grimpe, choix désordonnés, efforts mal gérés | Irrégulière ou très superficielle |
| 2 — Partiellement adapté | Peu de grimpe, beaucoup d'échecs sans régulation | Régulière, mais évaluation approximative de ses montées et ressentis |
| 3 — Adapté | Grimpe régulièrement, veut progresser mais sans prise de risque ; efforts adaptés à la voie | Régulière, identifie des axes de travail pertinents |
| 4 — Optimisé | S'engage progressivement dans des voies de plus en plus dures ; régule ses efforts en permanence | Méthodique : plusieurs axes de progrès, exercices et régulations pertinents |

### AFL3 : un rôle parmi trois

| Rôle | Degré 1 | Degré 4 |
| --- | --- | --- |
| **Assureur en tête** | Sans risque mais donne le mou en retard, corde non préparée | Anticipe les besoins du grimpeur, se déplace au pied de la paroi pour l'observer |
| **Assureur en moulitête** | Lâche le brin de vie, donne beaucoup trop de mou | Parade au départ, placement le long de la paroi, tension de corde efficace |
| **Coach-contre-assureur** | Ne sait pas vérifier le matériel, aucun conseil | Anticipe les erreurs de mousquetonnage, conseils fiables sur les appuis et le choix de la voie, aide les autres |`,
  },

  "esc-eval-exemple": {
    cours: ESE,
    titre: "5. Exemple de notation : le binôme Frédéric et Thierry",
    md: `Frédéric et Thierry grimpent dans le même trio et s'assurent mutuellement. Ce sont deux **garçons**.

### Le jour de l'épreuve

| | Frédéric | Thierry |
| --- | --- | --- |
| Mode et voie tirée au sort | **Tête**, voie en **5c** | **Moulitête**, voie en **5c** |
| Déroulement | Sort la voie en 4 min 30 s avec quelques pauses pour lire | Sort la voie en 5 min 20 s avec plusieurs pauses |
| Dans le tableau de performance | **T** sur la voie en 5c | **MT** sur la voie en 5c |

### L'AFL1

| Élément | Frédéric | Thierry |
| --- | --- | --- |
| **Élément 1** — lecture de la voie | Voie la plus dure réussie du cycle, quelques pauses pour lire : degré 3, 5c → **4,25** | Voie la plus dure réussie du cycle, sortie avec difficulté : degré 3, 5c → **4,25** |
| **Élément 2** — déplacement | Pieds précis, très souvent en position d'équilibre pour clipper, mais pas encore ambidextre : degré 3, 5c → **4,25** | Monte ses pieds en s'équilibrant avec les mains, s'y reprend pour mousquetonner : degré 2, 5c → **2,75** |
| **AFL1** | **8,5 / 12** | **7 / 12** (moulitête : degré 3 au maximum) |

### L'AFL2 et l'AFL3

| | Frédéric | Thierry |
| --- | --- | --- |
| Répartition choisie | c : AFL2 sur 6, AFL3 sur 2 | a : AFL2 sur 2, AFL3 sur 6 |
| AFL2 | Carnet régulier, axes de travail identifiés, mais sans prise de risque : degré 3 → **4,5 / 6** | Carnet régulier, axes de travail identifiés : degré 3 → **1,5 / 2** |
| AFL3 | Assureur en moulitête sans risque, anticipe un peu : degré 3 → **1,5 / 2** | Assureur en tête, tension de corde contrôlée : degré 3 → **4,5 / 6** |
| **AFL2 + AFL3** | **6 / 8** | **6 / 8** |

### La note du bac

| | AFL1 | AFL2 + AFL3 | **Total** |
| --- | --- | --- | --- |
| Frédéric | 8,5 | 6 | **14,5 / 20** |
| Thierry | 7 | 6 | **13 / 20** |

### À retenir

- Thierry est **bloqué au degré 3** parce qu'il a choisi la moulitête. En tête sur la même voie en 5c, avec un déplacement de degré 3, il pouvait viser jusqu'à 4,25 + 4,25 = 8,5 à l'AFL1.
- Frédéric reste sur une voie qu'il **connaît** (5c). En visant le **6a** en tête avec le même degré, il gagnait 0,25 point par élément ; en lisant la voie en moins de la moitié du temps (degré 4 de l'élément 1), il passait à 6 points au lieu de 4,25. Son carnet doit aussi montrer une **prise de risque** progressive (degré 4 de l'AFL2 : 6 au lieu de 4,5).`,
  },
};

// =====================================================================
// GYMNASTIQUE AU SOL — CA3
// =====================================================================
const GYE = "Gymnastique — évaluation (" + BAC + ")";

export const EVAL_GYM = {
  "gy-eval-structure": {
    cours: GYE,
    titre: "1. L'épreuve du bac : structure de la note",
    md: `La gymnastique fait partie du **champ d'apprentissage 3** : « Réaliser une prestation corporelle destinée à être vue et appréciée ». Au bac, l'épreuve se passe **au sol** ; les éléments de **mini-trampoline** font partie des éléments de l'évaluation au sol. La note est sur **20 points**.

| Attendu | Ce qui est évalué | Points | Quand |
| --- | --- | --- | --- |
| **AFL1** | S'engager pour composer et réaliser un enchaînement à visée esthétique ou acrobatique destiné à être jugé : **maîtrise gestuelle** et **qualité de la composition** | **12 points** : élément 1 (8 pts) + élément 2 (4 pts) | Le jour de l'épreuve |
| **AFL2** | Se préparer et s'engager individuellement pour s'exprimer devant un public | **2, 4 ou 6 points** | Au fil du cycle, éventuellement le jour de l'épreuve |
| **AFL3** | Choisir et assumer des rôles au service de la prestation de ses camarades | **6, 4 ou 2 points** | Au fil du cycle, éventuellement le jour de l'épreuve |

${REPARTITION("à l'issue de la 3e séance")}

### Ce que tu choisis

- **AFL1** : tes **8 éléments** (dans **4 familles** obligatoires), leurs **niveaux de difficulté** (au moins **3 niveaux différents**) et l'**ordre** de ton enchaînement.
- **AFL3** : **2 rôles sur 3** : juge, meneur d'échauffement, coach (tu choisis ton binôme pour le rôle de coach).

### Attention

La note D / note E du **code UNSS** (partie 4 de la Théorie et calculateur de Gym Pro) sert à la **compétition**. Pour le bac, le code UNSS sert à **coter les difficultés** et à **relever les fautes**, mais la note se calcule avec le barème de la partie 2.

${LIEN_PDF}`,
  },

  "gy-eval-deroulement": {
    cours: GYE,
    titre: "2. Le jour de l'épreuve et le barème de l'AFL1",
    md: `### L'enchaînement

- Au moins **8 éléments différents**, issus de **4 familles sur 5** : ATR, 2 éléments acrobatiques de sens différents, saut, élément de souplesse ou de maintien.
- Des **éléments de liaison**, une **chronologie**, **deux changements de direction**.
- Les éléments de **mini-trampoline** font partie des éléments de l'évaluation au sol : ils peuvent compter parmi tes 8 éléments.
- Difficultés de **A à D** selon le **code UNSS** en vigueur.
- Durée de **30 secondes à 1 min 30**, **un seul passage**, devant un public.

### Élément 1 : réaliser et maîtriser (/8)

Valeur des éléments : **A = 0,5 · B = 0,65 · C = 0,8 · D = 1 point**. On relève toutes les **fautes d'exécution** (code UNSS : petite faute 0,2, moyenne 0,3, grosse 0,5, chute 1). Le total des fautes d'exécution donne le degré. Il manque une famille : **−2 points** ; il manque un élément : **−1 point** (retirés de la note finale).

| Degré | Exécution | Total des fautes d'exécution |
| --- | --- | --- |
| 1 | Aléatoire | Plus de 6 points |
| 2 | Globalement maîtrisée | De 5,9 à 4 points |
| 3 | Maîtrisée et stabilisée | De 3,9 à 2 points |
| 4 | Dominée | De 1,9 à 0 point |

Dans le degré, la note dépend du **niveau moyen de difficulté** de tes éléments :

| Niveau moyen des éléments | A | B | C | D |
| --- | --- | --- | --- | --- |
| Degré 1 | 0,3 | 0,7 | 1,4 | 2 |
| Degré 2 | 2,1 | 2,7 | 3,4 | 4 |
| Degré 3 | 4,1 | 4,7 | 5,4 | 6 |
| Degré 4 | 6,1 | 6,7 | 7,4 | 8 |

### Élément 2 : composer et présenter (/4)

Les **7 composantes** de l'enchaînement :

1. Présenter son enchaînement **sur feuille**.
2. Un **salut** au début et à la fin.
3. **Pas d'élément parasite**.
4. Enchaînement **sans pause**, rythmé.
5. Éléments **connus** et dans l'**ordre annoncé**, attitude engagée.
6. **Durée** entre 30 s et 1 min 30.
7. **Deux changements de direction**.

| Composantes manquantes | 3 et plus | 2 | 1 | 0 |
| --- | --- | --- | --- | --- |
| Points | 1 | 2 | 3 | 4 |`,
  },

  "gy-eval-roles": {
    cours: GYE,
    titre: "3. AFL2 et AFL3 : se préparer et assumer des rôles",
    md: `Chaque degré donne un **nombre de points fixe**, selon ta répartition :

${TABLE_AFL23}

### AFL2 : se préparer et s'engager

| Degré | Répéter et persévérer | Se préparer en sécurité |
| --- | --- | --- |
| 1 | Peu de travail, peu de répétitions | Ne s'échauffe pas sans y être obligé |
| 2 | Travail un peu juste et irrégulier | S'échauffe avec une méthode très approximative |
| 3 | Du travail, mais un petit manque d'intensité ou de régularité | Connaît l'importance de l'échauffement, méthode encore brouillonne |
| 4 | Travail intensif et persévérant | Autonome, connaît la méthode, installe le matériel spontanément |

### AFL3 : deux rôles sur trois

| Rôle | Degré 1 | Degré 4 |
| --- | --- | --- |
| **Coach** | Fiche de suivi non remplie, pas de parade | Fiche bien remplie, identifie les fautes et leur importance, connaît les composantes ; parade maîtrisée et anticipée |
| **Juge** | Peu de participation, ne connaît pas le code des fautes | Participe activement, identifie parfaitement les fautes, respecte le code de pointage |
| **Meneur d'échauffement** | N'a rien préparé | Préparation complète, 3 phases respectées (général, articulaire, spécifique), expression orale claire avec les termes justes |`,
  },

  "gy-eval-exemple": {
    cours: GYE,
    titre: "4. Exemple de notation : Camille",
    md: `Camille présente un enchaînement au sol de **1 min 05** avec 8 éléments dans 4 familles : **2 C, 4 B et 2 A**.

### Élément 1 (/8)

- **Fautes d'exécution** relevées : jambes fléchies sur la roue (0,3), pas en réception du saut (0,2), ATR mal aligné (0,3), chute sur la roulade arrière (1), pointes de pieds relâchées sur 4 éléments (4 × 0,2 = 0,8), réception déséquilibrée (0,5), grand écart incomplet (0,3). Total : **3,4 points** → **degré 3** (de 3,9 à 2).
- **Niveau moyen** des éléments : (2 × 0,8 + 4 × 0,65 + 2 × 0,5) ÷ 8 = 5,2 ÷ 8 = **0,65**, soit le niveau **B**.
- Degré 3, niveau B → **4,7 / 8**.

### Élément 2 (/4)

Feuille rendue, salut au début et à la fin, pas de pause, éléments dans l'ordre, bonne durée — mais **un seul changement de direction** : il manque **1 composante** → **3 / 4**.

**AFL1 : 4,7 + 3 = 7,7 / 12.**

### L'AFL2 et l'AFL3

Camille a choisi la répartition **c : AFL2 sur 6, AFL3 sur 2**.

| Attendu | Observation | Degré | Points |
| --- | --- | --- | --- |
| **AFL2** | Travail régulier mais pas toujours intense ; connaît l'importance de l'échauffement | 3 | **4,5 / 6** |
| **AFL3** | Juge actif et précis, meneur d'échauffement complet et clair | 4 | **2 / 2** |

### La note finale

| AFL1 | AFL2 | AFL3 | **Total** |
| --- | --- | --- | --- |
| 7,7 / 12 | 4,5 / 6 | 2 / 2 | **14,2 / 20** |

Sans la chute (1 point de faute en moins), Camille restait au degré 3 ; il lui fallait **moins de 2 points de fautes** pour passer au degré 4 (6,7 au lieu de 4,7, avec le même niveau B).`,
  },
};

// =====================================================================
// CA5 — MUSCULATION et COURSE DE DURÉE
// =====================================================================
const MUE = "Musculation — évaluation (" + BAC + ")";
const CDE = "Course de durée — évaluation (" + BAC + ")";

const STRUCTURE_CA5 = (activite, afl2, afl3, choixAfl1, roles, moment) => `La ${activite} fait partie du **champ d'apprentissage 5** : « Réaliser et orienter son activité physique pour développer ses ressources et s'entretenir ». La note est sur **20 points**.

| Attendu | Ce qui est évalué | Points | Quand |
| --- | --- | --- | --- |
| **AFL1** | S'engager pour obtenir les effets recherchés selon son projet personnel, en faisant des choix de paramètres cohérents avec le thème retenu | **12 points** : élément 1 (8 pts) + élément 2 (4 pts) | Le jour de l'épreuve |
| **AFL2** | ${afl2} | **2, 4 ou 6 points** | Au fil du cycle |
| **AFL3** | ${afl3} | **6, 4 ou 2 points** | Au fil du cycle et le jour de l'épreuve |

### L'AFL1 en deux éléments

- **Élément 1 — Produire (/8)** : s'engager dans un effort adapté à ses ressources et au thème d'entraînement poursuivi.
- **Élément 2 — Analyser (/4)** : exploiter ses ressentis et les analyser pour réguler sa séance en cours de réalisation et/ou pour une séance future.

${REPARTITION(moment)}

### Ce que tu choisis

- **AFL1** : ${choixAfl1}
- **AFL3** : ${roles}

${LIEN_PDF}`;

export const EVAL_CA5 = {
  // --------------------------- Musculation ---------------------------
  "mu-eval-structure": {
    cours: MUE,
    titre: "1. L'épreuve du bac : structure de la note",
    md: STRUCTURE_CA5(
      "musculation",
      "S'entraîner pour développer ses ressources : **construire sa séquence** en intégrant des connaissances, **régularité** et **intensité** de l'engagement",
      "Coopérer pour faire progresser : **observer, renseigner et orienter** son partenaire, relever des informations",
      "ton **thème** parmi quatre : gain de **force**, de **volume**, de **tonicité** ou **affinement** ; ta **méthode** d'entraînement et tes **exercices complémentaires**.",
      "**coach** ou **observateur / pareur** (à l'issue de la 3e séance).",
      "à l'issue de la 3e séance"
    ),
  },

  "mu-eval-deroulement": {
    cours: MUE,
    titre: "2. Le jour de l'épreuve et le barème de l'AFL1",
    md: `### Le déroulement

- Tu choisis ton **thème** et tu le justifies par un **mobile personnel** : tu dois montrer que tu sais t'entraîner pour obtenir les effets voulus.
- Ta séance comprend l'**échauffement**, une organisation en **postes de travail** et la **récupération** ; tu justifies tes choix.
- Au moins **2 ateliers** parmi : **développé couché**, **demi-squat**, **tirage vertical à la poulie haute**, **soulevé de terre / rowing**, plus des **exercices complémentaires** (agonistes et antagonistes des ateliers), en cohérence avec ton projet.
- Tu utilises différentes **méthodes** (charge constante, stato-dynamique, super-série, full body…), en alternant les exercices pour garder un équilibre global.
- Tu notes le travail réalisé, tu **justifies tes régulations**, tu identifies tes **ressentis**, tu fais un **bilan** et une **mise en perspective**.
- Comme partenaire, tu accompagnes ton camarade (conseils, aide, parade, encouragements).

### Élément 1 : produire (/8)

| Degré | Ce qui est observé | Points |
| --- | --- | --- |
| 1 | Échauffement inexistant ou incohérent ; amplitude insuffisante, postures de sécurité non maîtrisées, apnée ; répétitions, séries et récupérations non respectées | **0 à 1,5** |
| 2 | Échauffement inconsistant ; amplitude limitée, nombreuses postures compensatoires ; quelques erreurs dans les paramètres du projet | **2 à 3,5** |
| 3 | Échauffement structuré et standard ; paramètres techniques respectés sur tous les ateliers ; quelques compensations ; paramètres d'entraînement maîtrisés toute la séance | **4 à 6** |
| 4 | Échauffement complet, progressif, personnalisé ; postures, trajets et respiration toujours placés ; pas de compensation (ou seulement en toute fin de série) ; séance intégrée à un programme planifié | **6,5 à 8** |

### Élément 2 : analyser (/4)

| Degré | Ce qui est observé | Points |
| --- | --- | --- |
| 1 | Charge dangereuse ou insignifiante ; analyse très superficielle ; pas de bilan ni de régulation | **0 à 0,75** |
| 2 | Charge trop lourde ou trop légère ; ressentis remplis succinctement ; bilan très concis, régulation peu adaptée | **1 à 1,75** |
| 3 | Charge adaptée mais non affinée ; ressentis identifiés lucidement ; bilan de séance et régulation pour la prochaine | **2 à 3** |
| 4 | Charge adaptée et régulée selon les ressentis ; ressentis fins reliés au thème ; bilan détaillé et propositions personnalisées | **3,25 à 4** |

### La partie connaissances

Les connaissances (muscles, contractions, projets, méthodes, sécurité) servent dans la présentation du projet, le bilan et l'AFL2 : voir *Musculation › Théorie*, partie 9.`,
  },

  "mu-eval-roles": {
    cours: MUE,
    titre: "3. AFL2 et AFL3 : s'entraîner et coopérer",
    md: `Chaque degré donne un **nombre de points fixe**, selon ta répartition :

${TABLE_AFL23}

### AFL2 : construire sa séquence et s'engager

Évalué au fil du cycle (carnet d'entraînement, papier ou **Muscu Pro**, et engagement) **et** le jour de l'épreuve pour la présentation de la séquence.

| Degré | Construire sa séquence | Intensité des séances |
| --- | --- | --- |
| 1 | Séquence copiée ou inadaptée ; paramètres et groupes musculaires inconnus ; aucune méthode | Engagement très insuffisant |
| 2 | Projet stéréotypé avec incohérences ; paramètres approximatifs ; une seule méthode | Engagement insuffisant |
| 3 | Projet pertinent ; paramètres et vocabulaire adaptés ; muscles localisés ; équilibre tronc-membres **ou** agonistes-antagonistes ; plusieurs formes de contraction | Engagement réel, proche de l'optimal |
| 4 | Paramètres maîtrisés, vocabulaire précis ; muscles localisés avec leur fonction ; équilibre tronc-membres **et** agonistes-antagonistes ; contractions cohérentes avec le thème | Charge planifiée de façon optimale ; fatigue visible en fin de séance |

### AFL3 : coach ou observateur / pareur

| Degré | Coach | Observateur et parade |
| --- | --- | --- |
| 1 | Agit seul, peu attentif, pas de conseils | Nombre de répétitions non fiable ; repère peu les erreurs d'amplitude ou de posture |
| 2 | Surtout des encouragements (« continue ! ») | Répétitions approximatives ; repère soit l'amplitude, soit les postures, partiellement |
| 3 | Conseils justes mais génériques (« tends tes bras ») | Répétitions précises ; repère précisément soit l'amplitude, soit les postures |
| 4 | Conseils pertinents et ciblés sur les actions du partenaire | Répétitions précises ; repère constamment l'amplitude **et** les postures |`,
  },

  "mu-eval-exemple": {
    cours: MUE,
    titre: "4. Exemple de notation : Isa",
    md: `Isa travaille en binôme : elle réalise sa séance pendant que son partenaire la coache, puis elle l'observe et le pare.

### Son projet

| | Isa |
| --- | --- |
| Thème | **Tonicité** |
| Ateliers | Tirage poulie haute, demi-squat + exercices complémentaires (pompes, fentes) |
| Méthode | Super-séries agonistes / antagonistes (R15) |

### L'AFL1

| Élément | Ce qui a été observé | Degré | Points |
| --- | --- | --- | --- |
| **Élément 1** — produire | Échauffement structuré ; paramètres respectés sur tous les ateliers ; quelques postures compensatoires en fin de super-série | 3 | **5 / 8** |
| **Élément 2** — analyser | Charge régulée pendant la séance selon ses ressentis ; bilan détaillé avec propositions pour la séance suivante | 4 | **3,5 / 4** |
| **AFL1** | | | **8,5 / 12** |

### L'AFL2 et l'AFL3

Isa a choisi la répartition **a : AFL2 sur 2, AFL3 sur 6**.

| Attendu | Observation | Degré | Points |
| --- | --- | --- | --- |
| **AFL2** | Projet pertinent, plusieurs formes de contraction, engagement réel | 3 | **1,5 / 2** |
| **AFL3** | Observatrice et pareuse : compte précisément les répétitions, repère constamment l'amplitude et les postures | 4 | **6 / 6** |

### La note finale

| AFL1 | AFL2 | AFL3 | **Total** |
| --- | --- | --- | --- |
| 8,5 / 12 | 1,5 / 2 | 6 / 6 | **16 / 20** |

Isa a bien joué sa répartition : très à l'aise comme **observatrice-pareuse**, elle a mis 6 points sur l'AFL3. Pour aller plus haut, elle doit supprimer ses **postures compensatoires** en fin de série : l'élément 1 passait au degré 4 (au moins 6,5 / 8).`,
  },

  // --------------------------- Course de durée ---------------------------
  "cd-eval-structure": {
    cours: CDE,
    titre: "1. L'épreuve du bac : structure de la note",
    md: STRUCTURE_CA5(
      "course de durée",
      "S'entraîner pour développer ses ressources : **tenir un carnet d'entraînement**, **régularité** et **intensité** de l'engagement, **concevoir** son entraînement",
      "Coopérer pour faire progresser : **observer, renseigner et orienter** son coureur, relever des informations",
      "ton **thème d'entraînement** parmi trois et la **conception de ta séance** (intensité, durée d'effort, durée de récupération…).",
      "**un rôle sur deux** : **coach** ou **observateur / collecteur de données**.",
      "à l'issue de la 4e séance, après le test de VMA et l'essai des 3 thèmes"
    ),
  },

  "cd-eval-deroulement": {
    cours: CDE,
    titre: "2. Le jour de l'épreuve et le barème de l'AFL1",
    md: `### Les trois thèmes d'entraînement

| Thème | Effet recherché | Intensité | Durée |
| --- | --- | --- | --- |
| **Puissance aérobie** | Effort intense, proche de son maximum | **100 à 120 % de VMA** | 10 min d'échauffement + 25 min de courses et récupérations |
| **Capacité aérobie** | Effort soutenu | **80 à 95 % de VMA** | 10 min d'échauffement + 30 min |
| **Endurance fondamentale** | Effort modéré mais prolongé | **60 à 75 % de VMA** | 10 min d'échauffement + 35 min |

### Le déroulement

- Tu justifies ton thème par un **mobile personnel** (les effets que tu veux obtenir sur ton organisme).
- À partir de ton carnet, tu présentes **par écrit le plan détaillé** de ta séance : échauffement et **au moins 2 séquences d'allures différentes**, pour **30 à 45 minutes**, avec les récupérations et tes **justifications**.
- Tu notes le **travail réalisé** par rapport au prévu et tes **sensations** aux différents moments.
- Tu peux **réguler** ta séance selon tes ressentis, en le justifiant.
- Seul repère : **un coup de sifflet toutes les minutes**. Tu cours en **aller-retour** depuis une balise de référence, avec une **zone de passage de 3 à 5 m** selon ta vitesse.

### Élément 1 : produire (/8)

| Degré | Ce qui est observé | Points |
| --- | --- | --- |
| 1 | Échauffement inexistant ou incohérent ; **plus de 12 passages hors zone** ; arrêt prématuré ou régulations incohérentes ; principes de course non appliqués | **0 à 1,75** |
| 2 | Échauffement inconsistant ; **8 à 12 passages hors zone** ; principes techniques peu appliqués ; paramètres incohérents avec le thème | **2 à 3,75** |
| 3 | Échauffement structuré et cohérent ; engagement réel dans la bonne zone d'effort ; **3 à 8 passages hors zone** ; récupérations actives ; adaptations hésitantes ; paramètres cohérents avec le thème | **4 à 5,75** |
| 4 | Échauffement complet, progressif, personnalisé ; engagement maximal dans la zone ciblée ; **moins de 3 passages hors zone** ; récupérations réduites au minimum ; adaptations rapides et pertinentes ; choix individualisés | **6 à 8** |

### Élément 2 : analyser (/4)

| Degré | Ce qui est observé | Points |
| --- | --- | --- |
| 1 | Absence de bilan ou bilan parcellaire ; pas d'adaptation ni de perspective ; connaissances inexistantes ou erronées | **1** |
| 2 | Bilan sommaire, analyse évasive ou décalée ; pas de perspective ; connaissances parfois erronées | **2** |
| 3 | Bilan réaliste ; régulation et perspective de travail ; quelques connaissances sur l'entraînement | **3** |
| 4 | Bilan expliqué, analyse pertinente et justifiée ; pistes de travail précises ; connaissances élargies (entraînement, diététique, hygiène de vie) | **4** |`,
  },

  "cd-eval-roles": {
    cours: CDE,
    titre: "3. AFL2 et AFL3 : s'entraîner et coopérer",
    md: `Chaque degré donne un **nombre de points fixe**, selon ta répartition :

${TABLE_AFL23}

### AFL2 : s'entraîner (au fil du cycle)

| Degré | Carnet d'entraînement | Engagement | Concevoir son entraînement |
| --- | --- | --- | --- |
| 1 — « L'occasionnel » | Rempli seulement quand c'est obligatoire, oublis et erreurs | Ne s'engage pas ou peu | Séquence copiée ou inadaptée, sans repères, potentiellement dangereuse |
| 2 — « Le consommateur d'entraînement » | Rempli de façon non systématique, beaucoup d'oublis | Ne s'engage pas suffisamment | Projet stéréotypé avec des incohérences |
| 3 — « Le concepteur débutant » | Sert à suivre et réguler : écarts prévu / réalisé, sensations sur une échelle de ressenti | S'engage durant les séances | Séquences cohérentes, sensations et repères externes |
| 4 — « Le concepteur pertinent » | Complet, sert à faire le bilan, réguler et s'approcher de ses possibilités ; relie sensations et efforts | Moteur et engagé sur toutes les séances | Conçoit, régule et justifie un projet personnalisé |

### AFL3 : un rôle sur deux

| Degré | Coach | Observateur / collecteur de données |
| --- | --- | --- |
| 1 | Agit seul, peu attentif, aucun conseil | Peu attentif, énormément de fautes dans les relevés |
| 2 | Partiellement attentif, surtout des encouragements | Partiellement attentif, plus de 60 % de données justes |
| 3 | Disponible et réactif, attentif à l'observation **ou** à l'écart allure prévue / réalisée, conseils justes | Attentif et impliqué, plus de 80 % de données justes |
| 4 | Attentif à l'observation **et** à l'écart allure prévue / réalisée, conseils pertinents qui aident à réguler sur le moment | Très attentif, recueil parfait |`,
  },

  "cd-eval-exemple": {
    cours: CDE,
    titre: "4. Exemple de notation : Christophe",
    md: `Christophe a une **VMA de 14 km/h**. Il prépare un trail : il choisit le thème **capacité aérobie** (80 à 95 % de VMA) pour tenir un effort soutenu plus longtemps.

### Sa séance (plan présenté par écrit)

- **10 min** d'échauffement progressif à 65-70 % de VMA, gammes et deux accélérations.
- **3 × 6 min à 85 %** de VMA (11,9 km/h), récupération **2 min** en trottinant à 60 %.
- **1 × 6 min à 90 %** de VMA (12,6 km/h).
- Soit **30 minutes** de courses et récupérations, puis retour au calme et étirements.

### L'AFL1

| Élément | Ce qui a été observé | Degré | Points |
| --- | --- | --- | --- |
| **Élément 1** | Échauffement complet et personnalisé ; engagement maximal dans la zone visée ; **2 passages hors zone** seulement, corrigés aussitôt ; récupérations actives réduites au minimum | 4 | **7 / 8** |
| **Élément 2** | Bilan expliqué : il relie ses 2 sorties de zone à la fatigue du dernier bloc, relève sa fréquence cardiaque et son Borg, propose de passer à 4 × 6 min la prochaine fois ; parle aussi de son alimentation et de son sommeil avant la course | 4 | **4 / 4** |
| **AFL1** | | | **11 / 12** |

### L'AFL2 et l'AFL3

Christophe a choisi la répartition **b : 4 / 4**.

| Attendu | Observation | Degré | Points |
| --- | --- | --- | --- |
| **AFL2** | Carnet complet à chaque séance, écarts prévu / réalisé et sensations mis en relation ; séances conçues et régulées seul | 4 | **4 / 4** |
| **AFL3** | Coach attentif à son partenaire et à l'écart entre l'allure prévue et réalisée, conseils justes | 3 | **3 / 4** |

### La note finale

| AFL1 | AFL2 | AFL3 | **Total** |
| --- | --- | --- | --- |
| 11 / 12 | 4 / 4 | 3 / 4 | **18 / 20** |

Il ne lui manque presque rien : un coaching qui aide son partenaire à **réguler sur le moment** (degré 4) lui donnait un point de plus à l'AFL3.`,
  },
};

export const EVAL_GT = {
  ...EVAL_RELAIS, ...EVAL_FOOT, ...EVAL_BASKET, ...EVAL_VOLLEY, ...EVAL_BADMINTON,
  ...EVAL_ESCALADE, ...EVAL_GYM, ...EVAL_CA5,
};

// Ordre des parties de chaque page « Évaluation » (sert aussi à insérer les nouvelles parties
// dans les pages déjà en ligne, à la bonne place).
export const PAGES_EVAL_GT = {
  "musculation-evaluation": ["mu-eval-structure", "mu-eval-deroulement", "mu-eval-roles", "mu-eval-exemple"],
  "course-duree-evaluation": ["cd-eval-structure", "cd-eval-deroulement", "cd-eval-roles", "cd-eval-exemple"],
  "escalade-evaluation": ["esc-eval-principe", "esc-eval-bareme", "esc-eval-tableau", "esc-eval-afl23", "esc-eval-exemple"],
  "volley-evaluation": ["vb-eval-structure", "vb-eval-deroulement", "vb-eval-roles", "vb-eval-exemple"],
  "badminton-evaluation": ["bd-eval-structure", "bd-eval-deroulement", "bd-eval-roles", "bd-eval-exemple"],
  "gym-evaluation": ["gy-eval-structure", "gy-eval-deroulement", "gy-eval-roles", "gy-eval-exemple"],
  "relais-evaluation": ["rl-eval-structure", "rl-eval-performance", "rl-eval-fil", "rl-eval-exemple"],
  "foot-evaluation": ["ft-eval-structure", "ft-eval-deroulement", "ft-eval-roles", "ft-eval-exemple"],
  "basket-evaluation": ["bk-eval-structure", "bk-eval-deroulement", "bk-eval-roles", "bk-eval-exemple"],
};

// Protocole PDF (dans public/protocoles/) affiché en lien discret en bas des pages de chaque APSA
export const PROTOCOLES_PDF = {
  "musculation": "/protocoles/musculation-bac-gt.pdf",
  "course-duree": "/protocoles/course-de-duree-bac-gt.pdf",
  "escalade": "/protocoles/escalade-bac-gt.pdf",
  "volley": "/protocoles/volley-ball-bac-gt.pdf",
  "badminton": "/protocoles/badminton-bac-gt.pdf",
  "gymnastique": "/protocoles/gymnastique-sol-bac-gt.pdf",
  "relais": "/protocoles/relais-2x200m-bac-gt.pdf",
  "football": "/protocoles/football-bac-gt.pdf",
  "basket": "/protocoles/basket-ball-bac-gt.pdf",
};

// v1.4.2 : protocoles Bac professionnel (convertis en PDF depuis les documents fournis)
export const PROTOCOLES_PDF_PRO = {
  "musculation": "/protocoles/musculation-bac-pro.pdf",
  "course-duree": "/protocoles/course-de-duree-bac-pro.pdf",
  "escalade": "/protocoles/escalade-bac-pro.pdf",
  "volley": "/protocoles/volley-ball-bac-pro.pdf",
  "badminton": "/protocoles/badminton-bac-pro.pdf",
  "gymnastique": "/protocoles/gymnastique-sol-bac-pro.pdf",
  "relais": "/protocoles/relais-2x200m-bac-pro.pdf",
  "football": "/protocoles/football-bac-pro.pdf",
  "basket": "/protocoles/basket-ball-bac-pro.pdf",
};
