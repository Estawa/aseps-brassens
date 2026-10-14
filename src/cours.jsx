import React from "react";

// =====================================================================
// Contenus de cours prêts à l'emploi (bloc « Cours »)
// Chaque partie est écrite en Markdown simple :
//   ### titre · paragraphes · listes « - » ou « 1. » · tableaux « | a | b | » · **gras**
// =====================================================================

export const COURS = {
  // ------------------------- MUSCULATION : THÉORIE -------------------------
  "muscu-intro": {
    cours: "Musculation — théorie",
    titre: "1. S'entraîner avec un projet",
    md: `La musculation, c'est développer une qualité musculaire précise (force, volume, tonicité ou endurance) en choisissant une charge, un nombre de répétitions et une récupération adaptés. Sans projet, on « soulève » ; avec un projet, on s'entraîne.

Ce cours répond à trois questions :

- **Pourquoi** je m'entraîne ? Mon mobile : envie, besoin, nécessité (santé, sport, apparence, bien-être).
- **Quoi** travailler ? Les muscles, les ateliers, le type de contraction.
- **Comment** ? Le projet (R6, R10, R15, R20/25), la méthode, la charge, la récupération. L'alimentation est traitée dans la page **Sport & Santé › L'alimentation**.

### Les règles de sécurité à connaître par cœur

1. Toujours s'échauffer avant de charger (cardio léger + séries à vide).
2. Dos gainé et plat : le ventre est serré, la colonne garde ses courbures naturelles.
3. Mouvement contrôlé sur toute l'amplitude : la qualité avant la charge.
4. Respiration : on souffle pendant l'effort (phase concentrique), on inspire au retour.
5. Pareur obligatoire sur les ateliers à barre libre (développé couché, squat).
6. Colliers de serrage sur la barre, disques rangés après usage.
7. Une douleur articulaire = on arrête. Une brûlure musculaire = c'est normal.

### Le vocabulaire de base

| Terme | Définition |
| --- | --- |
| Répétition (rép°) | Un mouvement complet aller-retour |
| Série | Un ensemble de répétitions enchaînées sans pause |
| Récupération | Le temps de repos entre deux séries |
| Charge | Le poids déplacé (en kg) |
| RM (répétition maximale) | La charge maximale soulevable un nombre donné de fois : 1RM = 1 seule fois |
| R15, R20… | La charge que l'on peut soulever 15, 20… fois maximum |
| Tonnage | Charge × répétitions × séries : la quantité de travail d'une séance |
| Atelier | Un poste de la salle (machine, banc, barre) |`,
  },

  "muscu-anatomie": {
    cours: "Musculation — théorie",
    titre: "2. Les muscles, leur fonction, leurs ateliers",
    md: `Un muscle ne sait que tirer : il se raccourcit et rapproche ses deux points d'attache. Connaître sa fonction, c'est savoir quel mouvement le fait travailler et donc quel atelier choisir.

### Haut du corps

| Muscle | Fonction principale | Ateliers de la salle | Étirement type |
| --- | --- | --- | --- |
| Grand pectoral | Rapprocher le bras du corps vers l'avant (pousser) | Développé couché, développé incliné, pompes, écartés haltères | Bras tendu contre un mur, tourner le buste à l'opposé |
| Grand dorsal | Ramener le bras vers le bas et l'arrière (tirer) | Tirage barre haute verticale, tirage horizontal, rowing | Suspendu à une barre, ou mains sur un banc, buste vers le sol |
| Trapèze | Élever et rapprocher les omoplates | Rowing épaule, tirage horizontal, haussements d'épaules | Tirer doucement la tête sur le côté, épaule basse |
| Deltoïde | Écarter et lever le bras (avant, côté, arrière) | Développé militaire haltères, élévations latérales, développé incliné | Bras croisé devant la poitrine |
| Biceps brachial | Fléchir le coude | Curl haltères sur banc, tirages | Bras tendu derrière, paume contre un mur |
| Triceps brachial | Tendre le coude | Chaise à dips, pompes serrées, développé couché | Main dans le dos, coude vers le haut |

### Tronc (gainage)

| Muscle | Fonction principale | Ateliers de la salle | Étirement type |
| --- | --- | --- | --- |
| Grand droit de l'abdomen | Enrouler le buste (rapprocher bassin et thorax) | Chaise abdo sous-ombilical, crunchs au tapis | Allongé ventre au sol, bras tendus, buste relevé |
| Obliques | Tourner et incliner le buste | Crunchs croisés, gainage latéral | Debout, bras au-dessus de la tête, inclinaison latérale |
| Transverse | Gainer, serrer le ventre | Gainage ventral, toutes les séries lourdes | Muscle de maintien, peu étiré |
| Lombaires | Redresser et maintenir le dos | Soulevé de terre, gainage dorsal | Assis, jambes tendues, buste enroulé vers l'avant |

### Bas du corps

| Muscle | Fonction principale | Ateliers de la salle | Étirement type |
| --- | --- | --- | --- |
| Quadriceps | Tendre le genou | Cage à squat, presse, chaise quadriceps | Debout, talon à la fesse, genoux serrés |
| Ischio-jambiers | Fléchir le genou, tendre la hanche | Chaise ischios, soulevé de terre | Jambe tendue sur un banc, buste vers l'avant dos plat |
| Fessiers | Tendre la hanche, écarter la cuisse | Squat, presse, soulevé de terre, chaise abducteurs | Allongé, genou ramené vers l'épaule opposée |
| Adducteurs | Rapprocher les cuisses | Chaise adducteurs | Assis, plantes de pieds collées, genoux vers le sol |
| Abducteurs (moyen fessier) | Écarter la cuisse | Chaise abducteurs | Jambe croisée derrière l'autre, bassin poussé sur le côté |
| Triceps sural (mollets) | Tendre la cheville (monter sur la pointe) | Mollets à la presse, corde à sauter | Pied contre un mur, jambe arrière tendue, talon au sol |

### Agonistes et antagonistes

L'**agoniste** est le muscle qui produit le mouvement ; l'**antagoniste** fait le mouvement inverse et doit se relâcher pour le laisser faire. Travailler les deux de façon équilibrée protège les articulations et la posture.

| Mouvement | Agoniste | Antagoniste |
| --- | --- | --- |
| Fléchir le coude | Biceps | Triceps |
| Tendre le genou | Quadriceps | Ischio-jambiers |
| Pousser devant soi | Pectoraux | Dorsaux, trapèzes |
| Enrouler le buste | Abdominaux | Lombaires |
| Rapprocher les cuisses | Adducteurs | Abducteurs |

Règle pratique : pour une série de poussée, prévoir une série de tirage ; pour chaque série d'abdos, une série de lombaires.`,
  },

  "muscu-physiologie": {
    cours: "Musculation — théorie",
    titre: "3. Comment le muscle travaille et progresse",
    md: `Un muscle peut travailler de quatre façons, et il s'adapte à ce qu'on lui demande : c'est le principe de l'entraînement.

### Les quatre types de contraction

| Contraction | Ce qui se passe | Exemple au développé couché | À retenir |
| --- | --- | --- | --- |
| Concentrique | Le muscle se raccourcit en forçant | Je pousse la barre vers le haut | Phase « positive », on souffle |
| Excentrique | Le muscle s'allonge en freinant | Je redescends la barre lentement | Phase la plus forte (+20 à 40 %) mais qui crée le plus de courbatures |
| Isométrique | Le muscle force sans changer de longueur | Je bloque la barre à mi-course | Gainage, planche, chaise contre un mur |
| Pliométrique | Un étirement rapide suivi aussitôt d'une contraction | Pompes claquées | Excentrique + concentrique enchaînés : explosivité, sauts |

### Les fibres musculaires

| Type de fibre | Caractéristiques | Sollicitée par |
| --- | --- | --- |
| Fibres lentes (type I) | Peu puissantes, très résistantes à la fatigue | Projet endurance R20/25, cardio |
| Fibres rapides (type II) | Très puissantes, vite fatiguées, grossissent beaucoup | Projets puissance R6 et masse R10 |

Chacun naît avec sa propre répartition de fibres : c'est pourquoi certains progressent plus vite en force et d'autres en endurance.

### Les adaptations à l'entraînement

- **Adaptation nerveuse** (premières semaines) : le cerveau apprend à recruter plus de fibres en même temps. On gagne en force sans prendre de volume.
- **Hypertrophie** (après 6 à 8 semaines) : les fibres grossissent. Le muscle gagne en volume.
- **Adaptation énergétique** : plus de capillaires et de mitochondries, le muscle résiste mieux à la fatigue.

### La surcompensation

L'entraînement fatigue le muscle ; c'est pendant la récupération qu'il se reconstruit un peu plus fort qu'avant. D'où trois règles :

1. Il faut une charge suffisante pour déclencher l'adaptation (principe de **surcharge**).
2. Il faut augmenter progressivement la charge quand elle devient facile (principe de **progressivité**).
3. Il faut laisser 48 h environ avant de retravailler intensément le même muscle (principe de **récupération**).`,
  },

  "muscu-projets": {
    cours: "Musculation — théorie",
    titre: "4. Les projets d'entraînement (R6, R10, R15, R20/25)",
    md: `Le projet fixe tout le reste : plus la charge est lourde, moins on fait de répétitions et plus on récupère longtemps. On choisit son projet selon son mobile.

| Projet | Objectif | % de la charge max (1RM) | Répétitions | Séries | Récupération | Vitesse d'exécution | Pour qui ? |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **R6 – Puissance / force** | Soulever plus lourd | 80 à 90 % | 4 à 8 | 3 à 5 | 2 à 3 min | Montée explosive, descente contrôlée | Sports de force et de combat, lancers, sprint |
| **R10 – Masse musculaire** | Faire grossir le muscle | 70 à 80 % | 8 à 12 | 3 à 5 | 1 min 30 à 2 min | Modérée et contrôlée | Prise de volume, silhouette |
| **R15 – Tonicité** | Raffermir, renforcer sans grossir | 60 à 70 % | 12 à 15 | 3 à 4 | 1 min à 1 min 30 | Régulière | Remise en forme, sports collectifs, prévention des blessures |
| **R20/25 – Endurance / affinement** | Tenir longtemps, affiner la silhouette | 40 à 60 % | 20 à 25 | 3 à 4 | 30 s à 1 min | Rapide et régulière | Sports d'endurance, perte de masse grasse, santé |

### Comment choisir son projet

- **Envie** : « je veux des bras plus gros » → R10 sur les bras, R15 ailleurs.
- **Besoin** : « je fais du rugby » → R6 sur les jambes et le haut du corps, gainage en isométrie.
- **Nécessité** : « j'ai mal au dos » → R15 ou R20 sur les abdominaux et les lombaires, avant toute charge lourde.

Un projet peut être **mixte** : R6 sur les jambes et R15 sur le haut du corps, par exemple. Ce qui compte, c'est que chaque atelier ait un objectif clair et cohérent avec le mobile.

### Erreurs fréquentes

- Prendre la charge la plus lourde possible « pour faire comme les autres », au détriment de la technique.
- Changer de projet à chaque séance : le corps n'a pas le temps de s'adapter.
- Réduire la récupération en R6 : la série suivante est ratée, la puissance chute.
- Faire 20 répétitions faciles en pensant faire du R20 : la dernière répétition doit être difficile.`,
  },

  "muscu-charges": {
    cours: "Musculation — théorie",
    titre: "5. Trouver sa charge : le tableau de conversion",
    md: `On ne teste jamais sa charge maximale (1RM) directement : c'est dangereux. On cherche sa charge en R15 ou R20, puis on en déduit les autres avec le tableau.

### Étape 1 – Chercher sa charge de référence (R15 ou R20)

1. S'échauffer sur l'atelier avec une charge très légère (15 rép°).
2. Choisir une charge et faire le maximum de répétitions propres.
3. Si on dépasse 20 rép°, augmenter ; si on n'atteint pas 15, diminuer.
4. Récupérer 2 à 3 min entre deux essais, 3 à 4 essais au maximum.

### Étape 2 – Convertir

| Répétitions maximales | % de la charge max (1RM) | Projet |
| --- | --- | --- |
| 1 | 100 % | Charge théorique, jamais testée |
| 3 | 93 % | Puissance |
| 5 | 87 % | Puissance |
| 6 | 85 % | Puissance R6 |
| 8 | 80 % | Puissance / masse |
| 10 | 75 % | Masse R10 |
| 12 | 70 % | Masse / tonicité |
| 15 | 65 % | Tonicité R15 |
| 20 | 60 % | Endurance R20 |
| 25 | 50 % | Endurance R25 |

Ces pourcentages sont des moyennes : selon les personnes et les ateliers, l'écart peut atteindre 5 à 10 %. La charge calculée est un point de départ à ajuster pendant la séance.

### Exemple chiffré

Léa fait 15 répétitions maximum à 40 kg au développé couché.

- Charge max théorique : 40 ÷ 0,65 ≈ **61,5 kg**.
- Elle choisit le projet masse (R10, 75 %) : 61,5 × 0,75 ≈ **46 kg**.
- Projet puissance (R6, 85 %) : 61,5 × 0,85 ≈ **52 kg**.

Formule générale : **charge du projet = (charge de référence ÷ % de référence) × % du projet**.

### Quand augmenter la charge ?

Règle des « 2 en plus » : si l'on réussit 2 répétitions de plus que prévu sur la dernière série, deux séances de suite, on augmente la charge de 2,5 à 5 %.

### Mesurer son travail : le tonnage

Tonnage d'un atelier = charge × répétitions × séries. Exemple : 46 kg × 10 rép° × 4 séries = 1 840 kg. Comparer son tonnage d'une séance à l'autre permet de voir sa progression, à projet identique.`,
  },

  "muscu-methodes": {
    cours: "Musculation — théorie",
    titre: "6. Les méthodes d'entraînement",
    md: `La méthode, c'est la façon d'organiser ses séries. Les débutants commencent par les séries simples ; les méthodes avancées viennent une fois la technique maîtrisée.

### Méthodes de base

| Méthode | Principe | Exemple | Projet conseillé | Niveau |
| --- | --- | --- | --- | --- |
| Séries simples | Même charge, même nombre de rép° à chaque série | 4 × 10 à 46 kg | Tous | Débutant |
| Pyramidale montante | La charge augmente, les répétitions baissent | 12 – 10 – 8 – 6 | Masse, puissance | Débutant / confirmé |
| Pyramidale descendante | La charge baisse, les répétitions augmentent | 6 – 8 – 10 – 12 | Masse | Confirmé |
| Circuit training | Un atelier après l'autre, sans pause, puis on recommence le tour | 8 ateliers × 30 s, 3 tours | Endurance, tonicité | Débutant |
| Circuit par station | Toutes les séries d'un atelier avant de passer au suivant | 4 séries de squat, puis presse… | Tous | Débutant |

### Méthodes d'intensification

| Méthode | Principe | Exemple | Projet conseillé | Niveau |
| --- | --- | --- | --- | --- |
| Bi-set (agoniste / antagoniste) | Deux exercices enchaînés sur des muscles opposés, puis récupération | Curl biceps + extension triceps | Masse, tonicité | Confirmé |
| Super-set | Deux exercices enchaînés sur le même muscle | Développé couché + pompes | Masse | Confirmé |
| Tri-set | Trois exercices enchaînés sur le même muscle | Développé couché + incliné + pompes | Masse, endurance | Avancé |
| Pré-fatigue | Un exercice d'isolation avant l'exercice de base | Chaise quadriceps puis squat | Masse | Avancé |
| Séries dégressives (drop set) | À l'échec, on allège de 20 % et on continue sans pause | 10 rép° à 50 kg puis 6 à 40 kg | Masse | Avancé |
| Rest-pause | À l'échec, 10 à 15 s de pause puis quelques rép° en plus | 8 rép° + 3 + 2 | Puissance, masse | Avancé |
| Excentrique lent | Descente sur 3 à 5 s | Squat, descente comptée sur 4 s | Masse, force | Confirmé |
| Isométrie | Maintenir une position sous tension | Chaise contre un mur 45 s | Gainage, tonicité | Débutant |
| Pliométrie | Enchaîner freinage et impulsion explosive | Sauts sur caisse, pompes claquées | Puissance, explosivité | Confirmé |

### Méthodes à dominante cardio

- **HIIT** (entraînement fractionné de haute intensité) : 20 s d'effort très intense / 10 s de récupération, 8 fois (format Tabata), sur rameur, vélo ou corde à sauter.
- **Crosstraining léger** : alternance d'exercices au poids du corps et de cardio, en temps ou en nombre de tours.

### Organiser sa semaine (pour aller plus loin)

- **Full body** : tout le corps à chaque séance. Idéal pour les débutants et pour 1 à 3 séances par semaine.
- **Half body** : haut du corps une séance, bas du corps la suivante.
- **Split** : un ou deux groupes musculaires par séance. Réservé aux pratiquants avancés qui s'entraînent 4 fois ou plus par semaine.`,
  },

  "muscu-seance": {
    cours: "Musculation — théorie",
    titre: "7. Construire sa séance et son projet personnel",
    md: `Une bonne séance suit toujours le même ordre : échauffement, gros muscles d'abord, petits muscles ensuite, gainage, retour au calme.

### Les 5 temps d'une séance (environ 1 h 30)

| Temps | Durée | Contenu |
| --- | --- | --- |
| 1. Échauffement | 10 à 15 min | Cardio progressif (rameur, vélo, corde), mobilisation articulaire, 1 série légère par atelier |
| 2. Ateliers polyarticulaires | 30 à 40 min | Squat, presse, développé couché, tirages, soulevé de terre |
| 3. Ateliers d'isolation | 15 à 20 min | Chaises quadriceps / ischios / adducteurs, biceps, triceps |
| 4. Gainage et abdominaux | 10 min | Abdos sous-ombilical, planches, lombaires |
| 5. Retour au calme | 10 min | Cardio léger, étirements doux, remplissage du carnet |

### Les règles d'un projet cohérent

1. **Un mobile clair** : pourquoi je m'entraîne, en une phrase.
2. **Des ateliers en lien avec le mobile** : 5 à 8 ateliers, avec au moins un pour le haut, un pour le bas et un pour le tronc.
3. **L'équilibre agoniste / antagoniste** : autant de poussée que de tirage.
4. **Un projet par atelier** (R6, R10, R15 ou R20/25), avec charge, répétitions, séries et récupération calculées.
5. **Une progression prévue** : quand et comment augmenter la charge.
6. **Un suivi** : noter chaque séance (charge, répétitions réalisées, ressenti de 1 à 10).

### Exemple de projet : « Je veux être plus performant au handball »

| Atelier | Muscles | Projet | Charge | Séries × rép° | Récupération |
| --- | --- | --- | --- | --- | --- |
| Cage à squat | Quadriceps, fessiers | R6 | 85 % 1RM | 4 × 6 | 2 min 30 |
| Développé couché | Pectoraux, triceps | R10 | 75 % 1RM | 4 × 10 | 2 min |
| Tirage barre haute | Grand dorsal, biceps | R10 | 75 % 1RM | 4 × 10 | 2 min |
| Chaise ischios | Ischio-jambiers | R15 | 65 % 1RM | 3 × 15 | 1 min 30 |
| Développé haltères assis | Deltoïdes | R15 | 65 % 1RM | 3 × 15 | 1 min 30 |
| Gainage ventral et latéral | Transverse, obliques | Isométrie | Poids du corps | 3 × 45 s | 45 s |
| Corde à sauter | Mollets, cardio | Pliométrie | Poids du corps | 3 × 30 s | 1 min |

### Le carnet de bord

À chaque séance, l'élève note pour chaque atelier la charge et les répétitions de chaque série, puis sa série moyenne et son ressenti. C'est ce suivi qui permet d'ajuster la charge et de constater ses progrès. L'application **Muscu Pro** fait ce travail automatiquement.`,
  },

  "muscu-recuperation": {
    cours: "Musculation — théorie",
    titre: "8. Échauffement, étirements et récupération",
    md: `Le muscle progresse pendant le repos, pas pendant la séance : l'échauffement prépare, la récupération construit.

### L'échauffement

- **Pourquoi** : augmenter la température du muscle, lubrifier les articulations, préparer le cœur et la concentration.
- **Général** (5 à 10 min) : rameur, vélo, elliptique ou corde, intensité progressive.
- **Articulaire** : rotations des épaules, poignets, hanches, genoux, chevilles.
- **Spécifique** : une série à vide ou très légère (environ 50 % de la charge de travail) sur chaque atelier lourd.

### Les étirements

| Type | Quand | Comment | Pourquoi |
| --- | --- | --- | --- |
| Dynamiques (balancés, mobilité) | Avant la séance | Mouvements amples et contrôlés, 10 répétitions | Préparer sans faire perdre de force |
| Statiques doux | Après la séance | 20 à 30 s par muscle, sans douleur, en expirant | Retour au calme, détente |
| Statiques longs (souplesse) | Lors d'une séance à part | 30 s à 1 min, plusieurs fois | Gagner en amplitude |

On évite les étirements statiques longs juste avant une série lourde : ils diminuent temporairement la force.

### La récupération

- **Entre les séries** : respecter la durée prévue par le projet (partie 4).
- **Entre les séances** : environ 48 h avant de retravailler intensément le même groupe musculaire.
- **Le sommeil** : 8 à 10 h pour un adolescent. C'est la nuit que l'hormone de croissance répare les muscles.
- **L'hydratation** : boire avant, pendant (petites gorgées) et après la séance.
- **Les courbatures** : de petites lésions musculaires dues surtout à l'excentrique. Elles disparaissent en 2 à 4 jours ; une activité légère aide à les dissiper.

### Le surentraînement

Trop de séances, pas assez de repos : fatigue permanente, baisse des performances, sommeil perturbé, blessures. La solution est de réduire le volume et de prendre une semaine plus légère.`,
  },

  "muscu-connaissances": {
    cours: "Musculation — théorie",
    titre: "9. Ce sur quoi tu peux être interrogé",
    md: `L'évaluation de fin de cycle comporte une partie **connaissances**. Les questions peuvent porter sur tout ce qui a été vu en cours et sur cette page. Tu dois être capable de :

### Les muscles et les ateliers

- **Nommer et situer** les principaux muscles (haut du corps, tronc, bas du corps).
- Donner la **fonction** de chacun (le mouvement qu'il produit).
- Associer chaque muscle à **un ou plusieurs ateliers** de la salle, et inversement dire quels muscles travaillent sur un atelier.
- Décrire un **étirement** adapté pour un muscle donné.
- Citer des couples **agoniste / antagoniste** et expliquer pourquoi il faut les travailler tous les deux.

### Le fonctionnement du muscle

- Définir et reconnaître les **4 types de contraction** (concentrique, excentrique, isométrique, pliométrique) sur un exemple.
- Expliquer la différence entre **fibres lentes et fibres rapides**.
- Expliquer les principes de **surcharge, progressivité et récupération** (surcompensation).

### Les projets et les charges

- Donner les caractéristiques des **4 projets** (R6, R10, R15, R20/25) : objectif, % de la charge max, répétitions, séries, récupération.
- Choisir et **justifier un projet** à partir d'un mobile (envie, besoin, nécessité).
- **Calculer une charge** à partir d'une charge de référence (R15 ou R20) avec le tableau de conversion.
- Calculer un **tonnage** et dire quand augmenter la charge.

### Les méthodes et la séance

- Expliquer le principe des principales **méthodes** (séries simples, pyramidale, circuit, bi-set, super-set, pré-fatigue, séries dégressives…).
- Ordonner les **temps d'une séance** et justifier l'ordre des ateliers.
- Construire ou critiquer un **projet personnel** cohérent.

### La sécurité et la récupération

- Citer et expliquer les **règles de sécurité** en salle (placement du dos, respiration, pareur…).
- Décrire un **échauffement** complet et dire quels étirements faire avant et après la séance.
- Donner les bases d'une bonne **récupération** (sommeil, hydratation, courbatures, surentraînement).

### L'alimentation

- Connaître le rôle des **glucides, protéines et lipides** et où les trouver.
- Décrire une **assiette équilibrée** et quoi manger **avant et après** une séance.
- Corriger les principales **idées reçues** (compléments, féculents, boissons énergisantes…).

Le **vocabulaire** de la partie 10 doit être connu et utilisé correctement dans tes réponses.`,
  },

  "muscu-lexique": {
    cours: "Musculation — théorie",
    titre: "10. Lexique",
    md: `| Terme | Définition |
| --- | --- |
| Exercice polyarticulaire | Mouvement qui fait travailler plusieurs articulations et muscles (squat, développé couché) |
| Exercice d'isolation | Mouvement centré sur une seule articulation et un muscle principal (chaise quadriceps, curl) |
| Amplitude | La course complète du mouvement, de l'étirement à la contraction maximale |
| Gainage | Contraction des muscles du tronc pour stabiliser la colonne |
| Échec musculaire | Moment où l'on ne peut plus faire une répétition correcte |
| Pareur | Partenaire qui sécurise l'exécutant pendant une série |
| Hypertrophie | Augmentation du volume des fibres musculaires |
| Surcompensation | Reconstruction du muscle à un niveau supérieur après la fatigue |
| Mobile | La raison personnelle qui guide le choix du projet |`,
  },

  // ------------------------- SPORT & SANTÉ : ALIMENTATION -------------------------
  "alim-nutriments": {
    cours: "Alimentation du sportif",
    titre: "1. Les nutriments : à quoi ils servent",
    md: `On ne construit pas de muscle sans matériaux : une alimentation variée, suffisante et régulière compte autant que l'entraînement. Pour un adolescent en croissance, il n'y a pas besoin de régime spécial, mais de bonnes habitudes.

### Les trois familles de nutriments énergétiques

| Nutriment | Rôle | Où le trouver | Part de l'énergie |
| --- | --- | --- | --- |
| Glucides | Le carburant du muscle, surtout pour l'effort intense | Pâtes, riz, pain, pommes de terre, légumineuses, fruits | Environ 50 % |
| Protéines | Les briques du muscle : construction et réparation | Viande, poisson, œufs, laitages, légumineuses, tofu | Environ 15 % |
| Lipides | Réserve d'énergie, hormones, vitamines | Huiles (colza, olive), noix, poissons gras, beurre | Environ 35 % |

### Les autres éléments indispensables

- **L'eau** : 1,5 à 2 L par jour, davantage les jours d'entraînement. La soif est déjà un signe de déshydratation.
- **Les vitamines et minéraux** : fruits et légumes à chaque repas ; calcium (laitages) pour les os ; fer (viande, légumineuses) pour transporter l'oxygène.
- **Les fibres** : légumes, fruits, céréales complètes, pour la digestion et la satiété.`,
  },

  "alim-assiette": {
    cours: "Alimentation du sportif",
    titre: "2. L'assiette équilibrée et le rythme des repas",
    md: `Un repas principal se compose ainsi :

- **La moitié** de l'assiette en légumes ;
- **Un quart** en féculents (de préférence complets) ;
- **Un quart** en protéines ;
- un produit laitier, un fruit, de l'eau.

On répartit les apports sur 4 repas (petit-déjeuner, déjeuner, goûter, dîner) : sauter le petit-déjeuner ou le déjeuner avant une séance fait chuter l'énergie disponible.

### Les protéines : combien ?

Un sportif a besoin d'un peu plus de protéines qu'un sédentaire, mais une alimentation variée les apporte déjà. Il vaut mieux les répartir sur les repas de la journée que de tout manger en une fois. L'excès de protéines ne fait pas grossir le muscle plus vite : c'est l'entraînement qui donne le signal.`,
  },

  "alim-seance": {
    cours: "Alimentation du sportif",
    titre: "3. Manger autour de la séance",
    md: `| Moment | Quoi | Exemple |
| --- | --- | --- |
| 2 à 3 h avant | Repas complet, riche en glucides, pas trop gras | Pâtes, poulet, légumes, compote |
| 1 h avant (si faim) | Petite collation digeste | Banane, barre de céréales |
| Pendant | De l'eau, par petites gorgées | — |
| Dans l'heure après | Glucides + protéines pour recharger et réparer | Yaourt + fruit, tartine + jambon, verre de lait + pain |`,
  },

  "alim-idees": {
    cours: "Alimentation du sportif",
    titre: "4. Idées reçues",
    md: `- **« Il faut des compléments pour prendre du muscle »** : faux. Pour un adolescent, ils sont inutiles et déconseillés ; certains contiennent des substances interdites ou dangereuses.
- **« Les féculents font grossir »** : faux. Ce sont le carburant principal du sportif ; c'est la quantité et l'accompagnement (sauces, fritures) qui comptent.
- **« Les boissons énergisantes aident à l'effort »** : faux. Riches en sucre et en caféine, elles sont déconseillées aux jeunes, surtout pendant le sport.
- **« Sauter un repas aide à s'affiner »** : faux. Cela fait perdre de l'énergie et du muscle, et pousse au grignotage.

En cas de question sur son poids ou son alimentation, le bon réflexe est d'en parler à l'infirmière scolaire ou à son médecin, plutôt que de suivre un régime trouvé sur les réseaux sociaux.`,
  },
};

export const PAGES_COURS = {
  "musculation-theorie": ["muscu-intro", "muscu-anatomie", "muscu-physiologie", "muscu-projets", "muscu-charges", "muscu-methodes", "muscu-seance", "muscu-recuperation", "muscu-connaissances", "muscu-lexique"],
  "sportsante-alim": ["alim-nutriments", "alim-assiette", "alim-seance", "alim-idees"],
};

// ---------- Petit moteur Markdown (titres, listes, tableaux, gras) ----------
function enLigne(texte, cle) {
  const morceaux = texte.split(/(\*\*[^*]+\*\*)/g);
  return morceaux.map((m, i) =>
    m.startsWith("**") && m.endsWith("**") ? <strong key={cle + "-" + i}>{m.slice(2, -2)}</strong> : <React.Fragment key={cle + "-" + i}>{m}</React.Fragment>
  );
}
function cellules(ligne) {
  return ligne.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}

export function Markdown({ md }) {
  const lignes = md.split("\n");
  const sortie = [];
  let i = 0;
  while (i < lignes.length) {
    const l = lignes[i];
    if (!l.trim()) { i++; continue; }
    if (l.startsWith("### ")) {
      sortie.push(<h4 key={i} className="cours-h">{enLigne(l.slice(4), i)}</h4>);
      i++; continue;
    }
    if (l.trim().startsWith("|")) {
      const bloc = [];
      while (i < lignes.length && lignes[i].trim().startsWith("|")) { bloc.push(lignes[i]); i++; }
      const entete = cellules(bloc[0]);
      const corps = bloc.slice(2).map(cellules);
      sortie.push(
        <div key={"t" + i} className="cours-table-wrap">
          <table className="cours-table">
            <thead><tr>{entete.map((c, k) => <th key={k}>{enLigne(c, "h" + k)}</th>)}</tr></thead>
            <tbody>{corps.map((r, ri) => <tr key={ri}>{r.map((c, k) => <td key={k} data-label={entete[k]}>{enLigne(c, ri + "-" + k)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
      continue;
    }
    if (/^- /.test(l)) {
      const items = [];
      while (i < lignes.length && /^- /.test(lignes[i])) { items.push(lignes[i].slice(2)); i++; }
      sortie.push(<ul key={"u" + i} className="cours-liste">{items.map((t, k) => <li key={k}>{enLigne(t, k)}</li>)}</ul>);
      continue;
    }
    if (/^\d+\. /.test(l)) {
      const items = [];
      while (i < lignes.length && /^\d+\. /.test(lignes[i])) { items.push(lignes[i].replace(/^\d+\. /, "")); i++; }
      sortie.push(<ol key={"o" + i} className="cours-liste">{items.map((t, k) => <li key={k}>{enLigne(t, k)}</li>)}</ol>);
      continue;
    }
    const para = [];
    while (i < lignes.length && lignes[i].trim() && !/^(### |\||- |\d+\. )/.test(lignes[i].trim())) { para.push(lignes[i]); i++; }
    sortie.push(<p key={"p" + i} className="cours-p">{enLigne(para.join(" "), i)}</p>);
  }
  return <>{sortie}</>;
}

// ---------- Rendu d'un bloc « Cours » : carte repliable ----------
export function BlocCours({ bloc, edition }) {
  const partie = COURS[bloc.partie];
  if (!partie) return edition ? <div className="cours-carte" style={{ padding: 14, fontStyle: "italic", color: "#9a9384" }}>Partie de cours à choisir — clique pour la sélectionner</div> : null;
  if (edition) {
    return (
      <div className="cours-carte">
        <div className="cours-titre"><span>{partie.titre}</span><span style={{ fontSize: 11, color: "#9a9384", fontWeight: 500 }}>{partie.cours}</span></div>
      </div>
    );
  }
  return (
    <details className="cours-carte" open={!!bloc.ouvert}>
      <summary className="cours-titre"><span>{partie.titre}</span><span className="cours-chevron">▾</span></summary>
      <div className="cours-corps"><Markdown md={partie.md} /></div>
    </details>
  );
}

// Crée les blocs « Cours » d'une page
export function blocsCoursPourPage(pageId, uid) {
  return (PAGES_COURS[pageId] || []).map((partie, i) => ({ id: uid(), type: "cours", largeur: 12, partie, ouvert: i === 0 }));
}
