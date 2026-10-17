// =====================================================================
// v1.3.0 — Relais 2 × 200 m, Football, Basket-ball (théorie + évaluation)
// Même structure que Volley-ball / Badminton : une page « Théorie » et une
// page « Évaluation de fin de cycle » par activité, découpées en parties dépliables.
// =====================================================================

// =====================================================================
// RELAIS 2 × 200 m — niveau Terminale (barème Bac Pro, application Relais 200m)
// =====================================================================
const RL = "Relais 2 × 200 m — théorie";
const RLE = "Relais 2 × 200 m — évaluation";

export const COURS_RELAIS = {
  "rl-jeu": {
    cours: RL,
    titre: "1. Le relais 2 × 200 m : principe et attendus",
    md: `Le relais 2 × 200 m est une course **par équipe** : deux coureurs (binôme) — ou trois en trinôme — se partagent la distance et se **transmettent un témoin**. Le temps de l'équipe est pris **à l'arrivée du dernier relayeur**.

Gagner du temps au relais, ce n'est pas seulement courir vite : c'est surtout **ne pas en perdre au passage du témoin**. Une bonne équipe va **plus vite à deux** que la somme de ses deux 200 m individuels.

### Le cadre au lycée

| Élément | Organisation en cycle |
| --- | --- |
| Équipes | Binômes (2 × 200 m) ou trinômes (3 coureurs, temps ramené à un équivalent binôme) de **niveau proche** |
| Constitution | À partir du **test individuel sur 200 m** de début de cycle |
| Course | Chaque équipe dans **son couloir**, plusieurs équipes au départ ensemble, un seul chronomètre |
| Transmission | Dans une **zone de transmission de 20 m** |
| Manches | Plusieurs prises de performance sur le cycle ; l'**ordre des coureurs tourne** d'une manche à l'autre |

### Ce qu'on attend d'un élève de Terminale

- **Produire sa vitesse maximale** et la **maintenir** jusqu'au bout de son 200 m (ne pas « exploser » dans la ligne droite).
- **Partir vite** : départ (premier relayeur) ou départ lancé du receveur au bon moment.
- **Transmettre le témoin à pleine vitesse**, sans ralentir, dans la zone, grâce à des **repères précis** (marque au sol, signal).
- **Analyser** ses temps et ceux de l'équipe pour ajuster marques et stratégie.
- **Tenir les rôles** de starter-chronométreur et de juge de zone, et **se préparer** de façon autonome.`,
  },

  "rl-reglement": {
    cours: RL,
    titre: "2. Le règlement et la zone de transmission",
    md: `### La zone de transmission

| Repère | Position |
| --- | --- |
| Milieu de zone | La marque des **200 m** (fin du parcours du premier coureur) |
| Début de la zone de transmission | **10 m avant** le milieu |
| Fin de la zone de transmission | **10 m après** le milieu (soit **20 m** au total) |
| Zone d'élan | **5 m avant** le début de la zone de transmission : le receveur peut s'y placer pour démarrer |

**Le témoin doit changer de main à l'intérieur de la zone de transmission.** Ce qui compte, c'est la **position du témoin**, pas celle des pieds des coureurs.

### Les fautes qui disqualifient la manche

| Faute | Explication |
| --- | --- |
| Transmission hors zone | Le témoin est donné avant le début ou après la fin de la zone |
| Témoin lancé | Le témoin doit être **remis de main à main**, jamais lancé |
| Sortie de couloir | Un coureur quitte son couloir et gêne une autre équipe |
| Témoin tombé, non ramassé | Un témoin qui tombe doit être ramassé par le coureur qui l'a fait tomber, sans gêner les autres |
| Faux départ | Le premier coureur part avant le signal du starter |

### Le départ

- Le premier relayeur part **debout ou accroupi** (selon la consigne), au commandement du starter : « À vos marques… Prêts… » puis signal (coup de sifflet, claquoir ou « Partez ! »).
- Le chronomètre **démarre au signal** (pas au premier pas) et s'arrête quand le **buste du dernier relayeur** franchit la ligne d'arrivée.

### Après la transmission

Le donneur **ralentit dans son couloir** et ne le quitte qu'une fois toutes les équipes passées, pour ne gêner personne.`,
  },

  "rl-technique": {
    cours: RL,
    titre: "3. La technique : départ, course, transmission",
    md: `### Le départ du premier relayeur

- Pied avant derrière la ligne, appuis **décalés**, poids du corps vers l'avant.
- **Réagir au signal**, pousser fort sur les appuis, rester **incliné** sur les premiers mètres, puis se redresser progressivement.

### Courir 200 m vite

| Phase | Ce qu'il faut faire |
| --- | --- |
| **Mise en action** (0-50 m) | Accélérer franchement, foulées de plus en plus longues |
| **Virage** | Courir **à la corde** (près de la ligne intérieure du couloir), légère inclinaison vers l'intérieur, bras gauche plus près du corps |
| **Ligne droite** | Rester **relâché** (épaules basses, mains ouvertes), garder la **fréquence** des appuis quand la fatigue arrive |
| **Fin de course** | Maintenir la vitesse **jusqu'au receveur** (ou jusqu'à la ligne d'arrivée) : on ne ralentit pas avant d'avoir donné le témoin |

### La transmission

| Rôle | Points clés |
| --- | --- |
| **Receveur** | Placé sur sa **marque de départ**, il regarde arriver son partenaire ; il **démarre à fond** quand le donneur passe sa marque au sol, puis **ne se retourne plus** |
| **Donneur** | Garde sa vitesse, annonce le signal (« Hop ! » ou « Gauche / Droite ») quand il est à environ **1 à 2 m** du receveur |
| **Receveur au signal** | Tend le bras vers l'arrière, **main ouverte, paume vers le haut ou vers l'arrière**, bras immobile |
| **Donneur au contact** | **Pose** le témoin fermement dans la main du receveur (pas de lancer), et ne le lâche que quand le receveur l'a saisi |

### Les deux erreurs les plus fréquentes

- **Le receveur part trop tard** : le donneur doit freiner, l'équipe perd du temps.
- **Le receveur part trop tôt** : le donneur ne le rattrape pas, le témoin est donné **hors zone**.

La bonne transmission se fait **en pleine vitesse, dans la seconde moitié de l'élan**, les deux coureurs courant à la même vitesse.`,
  },

  "rl-marques": {
    cours: RL,
    titre: "4. Les marques et la stratégie d'équipe",
    md: `### Prendre sa marque

La **marque** est un repère posé au sol (plot, scotch) **avant** la zone : quand le donneur l'atteint, le receveur démarre.

1. Le receveur se place à son point de départ, dans la zone d'élan ou au début de la zone.
2. On mesure la distance de la marque **en nombre de pieds** (pas talon-pointe) : c'est reproductible d'une séance à l'autre, sans mètre.
3. On commence vers **15 à 20 pieds**, puis on ajuste.

| Ce qu'on observe | Ajustement de la marque |
| --- | --- |
| Le donneur rattrape trop vite le receveur, doit ralentir | **Reculer** la marque (plus de pieds) : le receveur part plus tôt |
| Le donneur ne rattrape pas le receveur, transmission en fin de zone ou hors zone | **Avancer** la marque (moins de pieds) : le receveur part plus tard |
| Transmission bien en vitesse, au milieu de la zone | Garder la marque et la **noter** |

### Le temps cible de l'élan

Avec son temps au 200 m, chaque élève calcule sa vitesse moyenne : **vitesse = 200 ÷ temps 200 m**. Son temps cible sur 50 m d'élan est alors **50 ÷ vitesse**. S'il atteint ce temps sur l'élan chronométré, il arrive à sa vitesse de course au moment de recevoir le témoin.

*Exemple : 32 s au 200 m → 6,25 m/s → temps cible sur 50 m = 8 s.*

### Où donner le témoin dans la zone ?

| Situation | Choix conseillé |
| --- | --- |
| Le receveur est **plus rapide** que le donneur | Transmission en **début de zone** : le plus rapide court plus longtemps |
| Le donneur est **plus rapide** que le receveur | Transmission en **fin de zone** : on profite plus longtemps de la vitesse du donneur |

### L'ordre des coureurs

- Le premier relayeur doit être **bon au départ** et **dans le virage**.
- Le dernier relayeur doit être **résistant** : il finit seul, sous la pression des autres équipes.
- En évaluation, l'ordre **tourne** entre les manches : chacun doit savoir donner **et** recevoir.`,
  },

  "rl-entrainement": {
    cours: RL,
    titre: "5. Se préparer et s'entraîner",
    md: `### Un échauffement complet et spécifique

Voir la partie *Relais* dans *Sport & Santé › L'échauffement* : course en file avec passages de témoin, gammes athlétiques, accélérations, puis **essais de transmission à vitesse réelle** avec sa marque. La course doit commencer **moins de 5 minutes** après les derniers sprints.

### Les trois qualités à développer

| Qualité | Exemple de travail |
| --- | --- |
| **Vitesse** | Départs, accélérations sur 30 à 60 m, départs lancés chronométrés sur 50 m (temps cible) |
| **Résistance** | 150 à 200 m à allure soutenue, récupération courte à moyenne, 4 à 6 répétitions |
| **Technique de transmission** | Passages statiques puis en marche, puis en course, puis **à pleine vitesse** ; relais courts (6 relais sur 50 m) pour multiplier les transmissions |

### Utiliser ses données

- Noter à chaque séance : **temps de l'équipe**, **marque** (en pieds), **lieu de transmission** (début, milieu, fin de zone).
- Calculer l'**indice de transmission** de l'équipe (voir *Évaluation*, partie 2) : il dit si le passage de témoin fait gagner ou perdre du temps.
- Choisir **une seule priorité** pour la séance suivante (marque, départ, résistance).

### Récupérer

Entre deux manches : **marcher**, boire, rester couvert, récupérer complètement (**10 à 15 min**) avant la manche suivante.`,
  },

  "rl-connaissances": {
    cours: RL,
    titre: "6. Ce sur quoi tu peux être interrogé",
    md: `Tu dois être capable de :

### Le règlement

- Situer la **zone de transmission** (20 m, centrée sur les 200 m) et la **zone d'élan**.
- Citer les **fautes** qui disqualifient une manche (transmission hors zone, témoin lancé, sortie de couloir, faux départ).
- Expliquer quand le chronomètre **démarre** et quand il **s'arrête**.

### La technique

- Décrire les **points clés** du départ, de la course en virage et de la fin de course.
- Décrire le rôle du **donneur** et du **receveur** pendant la transmission (marque, signal, position de la main).
- Expliquer les conséquences d'un départ du receveur **trop tôt** ou **trop tard**.

### La stratégie et l'analyse

- Expliquer comment **ajuster une marque** à partir de ce qu'on observe.
- Calculer un **temps cible** sur 50 m à partir d'un temps au 200 m.
- Calculer et interpréter l'**indice de transmission** d'une équipe.
- Justifier un **ordre des coureurs** et un **lieu de transmission** dans la zone.

### Les rôles

- Tenir le rôle de **starter-chronométreur** et de **juge de zone**.
- Conduire un **échauffement** adapté au relais.`,
  },

  "rl-lexique": {
    cours: RL,
    titre: "7. Lexique",
    md: `| Terme | Définition |
| --- | --- |
| Témoin | Tube que les coureurs se transmettent de main à main |
| Donneur | Coureur qui arrive et transmet le témoin |
| Receveur | Coureur qui part et reçoit le témoin |
| Zone de transmission | Zone de 20 m dans laquelle le témoin doit changer de main |
| Zone d'élan | Espace de 5 m avant la zone de transmission où le receveur peut se placer pour démarrer |
| Marque | Repère au sol : quand le donneur l'atteint, le receveur démarre |
| Départ lancé | Départ du receveur en course, pour être à pleine vitesse au moment de recevoir le témoin |
| Indice de transmission (IT) | Somme des 200 m individuels − meilleur temps de relais de l'équipe ; plus il est petit (voire négatif), meilleure est la transmission |
| Courir à la corde | Courir au plus près de la ligne intérieure du couloir dans le virage |
| Starter | Personne qui donne le départ |`,
  },

  // --------------------------- Relais : évaluation ---------------------------
  "rl-eval-structure": {
    cours: RLE,
    titre: "1. L'épreuve : structure de la note",
    md: `Le relais fait partie du **champ d'apprentissage 1** : « Réaliser une performance motrice maximale mesurable à une échéance donnée ». La note est sur **20 points**. Le barème présenté ici est celui du **Bac Pro (Terminale)**, référentiel de l'Académie de Versailles — c'est lui qu'utilise l'application Relais 200m.

| Partie | Ce qui est évalué | Points | Quand |
| --- | --- | --- | --- |
| **AFLP 1** | Produire et répartir intentionnellement ses efforts en mobilisant ses ressources pour gagner ou battre un record | **7 points** : positionnement /4 + performance /3 | Fin de séquence |
| **AFLP 2** | Connaître et mobiliser les techniques efficaces pour produire la meilleure performance possible | **5 points** | Fin de séquence |
| **AFLP 4** | Assumer des rôles sociaux pour organiser une épreuve de production de performance | **2, 4 ou 6 points** | Au fil de la séquence |
| **AFLP 5** | Assurer la prise en charge de sa préparation et de celle d'un groupe, de façon autonome | **6, 4 ou 2 points** | Au fil de la séquence |

### Fin de séquence : 12 points

- **Positionnement /4** : l'enseignant situe ton engagement et ta gestion de l'effort (vitesse produite et **maintenue** jusqu'au bout du 200 m, départ, relâchement).
- **Performance /3** : calculée à partir de tes temps (voir partie 2).
- **AFLP 2 /5** : qualité de tes techniques — départ, course en virage, **transmission** (marque, signal, main, vitesse conservée, témoin dans la zone).

### Fil de séquence : 8 points

Tu choisis comment répartir les 8 points entre **AFLP 4** (rôles) et **AFLP 5** (préparation) :

| Choix | AFLP 4 | AFLP 5 |
| --- | --- | --- |
| a | 6 points | 2 points |
| b | 4 points | 4 points |
| c | 2 points | 6 points |`,
  },

  "rl-eval-performance": {
    cours: RLE,
    titre: "2. La performance /3 : 200 m, relais et indice de transmission",
    md: `La note de performance est la **moyenne de trois notes**, chacune sur la même échelle de 0 à 3 points :

1. **Ton meilleur 200 m individuel** (barème filles ou garçons).
2. **La moyenne de deux relais** de ton équipe (les 2 meilleurs ou les 2 derniers du cycle, selon le choix de l'enseignant pour la classe).
3. **L'indice de transmission (IT)** = somme des deux 200 m individuels du binôme − meilleur des deux temps de relais retenus.

On lit chaque barème **par paliers** : on prend le nombre de points du **premier temps qui n'est pas dépassé**.

### Le barème (Bac Pro Terminale)

| Points | 200 m filles | 200 m garçons | Relais filles | Relais garçons | IT (commun) |
| --- | --- | --- | --- | --- | --- |
| 3 | 32"5 | 27"0 | 1'10"0 | 55"5 | −1,2 |
| 2,8 | 33"0 | 27"5 | 1'11"0 | 56"0 | −1,1 |
| 2,6 | 33"5 | 28"0 | 1'12"0 | 56"5 | −1,0 |
| 2,4 | 34"0 | 28"5 | 1'13"0 | 57"0 | −0,9 |
| 2,2 | 34"5 | 29"0 | 1'14"0 | 58"0 | −0,8 |
| 2 | 35"0 | 29"5 | 1'15"0 | 59"0 | −0,7 |
| 1,9 | 36"0 | 30"0 | 1'16"0 | 1'00"0 | −0,6 |
| 1,8 | 37"0 | 30"5 | 1'17"0 | 1'01"0 | −0,5 |
| 1,75 | 38"0 | 31"0 | 1'18"0 | 1'02"0 | −0,4 |
| 1,7 | 39"0 | 32"0 | 1'19"0 | 1'03"0 | −0,3 |
| 1,65 | 40"0 | 32"5 | 1'20"0 | 1'04"0 | −0,2 |
| 1,6 | 40"5 | 32"7 | 1'22"0 | 1'05"0 | −0,1 |
| 1,5 | 41"0 | 33"0 | 1'24"0 | 1'06"0 | 0 |
| 1,4 | 42"0 | 33"5 | 1'26"0 | 1'08"0 | +0,2 |
| 1,3 | 43"0 | 34"0 | 1'28"0 | 1'10"0 | +0,5 |
| 1,2 | 44"0 | 35"0 | 1'30"0 | 1'12"0 | +0,7 |
| 1,1 | 45"0 | 36"0 | 1'32"0 | 1'14"0 | +1,0 |
| 1 | 46"0 | 37"0 | 1'34"0 | 1'16"0 | +1,5 |
| 0,9 | 47"0 | 38"0 | 1'35"0 | 1'18"0 | +1,75 |
| 0,8 | 48"0 | 39"0 | 1'36"0 | 1'20"0 | +2,0 |
| 0,7 | 49"0 | 40"0 | 1'40"0 | 1'21"0 | +2,25 |
| 0,5 | 50"0 | 41"0 | 1'42"0 | 1'22"0 | +2,5 |
| 0,3 | 51"0 | 42"0 | 1'44"0 | 1'23"0 | +3,0 |
| 0,1 | 52"0 | 43"0 | 1'46"0 | 1'24"0 | +3,2 |
| 0 | 53"0 | 44"0 | 1'48"0 | 1'25"0 | +3,5 |

### Comprendre l'indice de transmission

- **IT positif** : l'équipe va **moins vite** en relais que ses coureurs en individuel → le témoin fait perdre du temps (receveur parti trop tard, donneur qui freine).
- **IT nul ou négatif** : le **départ lancé** du receveur fait gagner du temps → la transmission est réussie.

### En trinôme

Le barème est prévu pour des binômes : pour un trinôme, les temps de relais et la somme des 200 m sont **multipliés par 2/3** (règle de trois) avant de lire le barème.`,
  },

  "rl-eval-fil": {
    cours: RLE,
    titre: "3. Le fil de séquence /8 : rôles et préparation",
    md: `Évalué **tout au long du cycle**. Pour chaque AFLP, l'enseignant te situe dans un **degré** (1 à 4), qui correspond à une plage de points selon ta répartition.

### AFLP 4 : assumer des rôles sociaux

Rôles possibles : **starter-chronométreur**, **juge de zone** (vérifie que le témoin change de main dans la zone), **chronométreur**, **organisateur** (couloirs, plots, rangement du matériel).

| Degré | Ce qui est observé |
| --- | --- |
| 1 | S'investit épisodiquement dans un des rôles |
| 2 | S'investit dans un rôle choisi (souvent juge de zone ou starter) |
| 3 | Assure un rôle de façon autonome et efficace, un deuxième ponctuellement avec de l'aide |
| 4 | Assume avec efficacité au moins deux rôles et aide ses camarades |

### AFLP 5 : se préparer de façon autonome

| Degré | Ce qui est observé |
| --- | --- |
| 1 | Échauffement insuffisant ; ne s'entraîne pas assez pour progresser ; centré sur lui-même |
| 2 | Échauffement largement perfectible ; entraînement approximatif ; guide sans aide réelle |
| 3 | Échauffement complet ; entraînement adapté, répétitions suffisantes ; guide un petit groupe |
| 4 | Échauffement varié, complet et adapté ; entraînement optimisé, progrès nets ; motive et corrige un groupe |

### Les plages de points

| Degré | Sur 2 points | Sur 4 points | Sur 6 points |
| --- | --- | --- | --- |
| 1 | 0 à 0,4 | 0 à 0,9 | 0 à 1,4 |
| 2 | 0,5 à 0,9 | 1 à 1,9 | 1,5 à 2,9 |
| 3 | 1 à 1,4 | 2 à 2,9 | 3 à 4,4 |
| 4 | 1,5 à 2 | 3 à 4 | 4,5 à 6 |`,
  },

  "rl-eval-exemple": {
    cours: RLE,
    titre: "4. Exemple de notation : le binôme Cyrille et Steph",
    md: `Cyrille et Steph courent ensemble en **binôme garçons**. Voici leurs résultats du cycle et le calcul complet de leur note.

### Les performances

| | Cyrille | Steph |
| --- | --- | --- |
| Meilleur 200 m individuel | **34"6** | **36"8** |
| Relais retenus (les 2 meilleurs) | 1'11"1 et 1'12"3 | 1'11"1 et 1'12"3 |

### 1. Les trois notes de performance

| Calcul | Valeur | Lecture du barème garçons | Points |
| --- | --- | --- | --- |
| 200 m de Cyrille | 34"6 | ne dépasse pas 35"0 | **1,2** |
| 200 m de Steph | 36"8 | ne dépasse pas 37"0 | **1** |
| Moyenne des 2 relais | (71"1 + 72"3) ÷ 2 = **71"7** (1'11"7) | ne dépasse pas 1'12"0 | **1,2** |
| Indice de transmission | (34"6 + 36"8) − 71"1 = **+0,3** | ne dépasse pas +0,5 | **1,3** |

L'IT est **positif** : ensemble, ils vont un peu moins vite que la somme de leurs deux 200 m. Le receveur part trop tard et le témoin leur coûte du temps.

- **Performance de Cyrille** = (1,2 + 1,2 + 1,3) ÷ 3 = 3,7 ÷ 3 ≈ **1,23 / 3**
- **Performance de Steph** = (1 + 1,2 + 1,3) ÷ 3 = 3,5 ÷ 3 ≈ **1,17 / 3**

### 2. La note complète

| Partie | Cyrille | Steph |
| --- | --- | --- |
| Positionnement AFLP 1 (/4) | 2 — vitesse qui chute dans la ligne droite | 2,5 — effort mieux réparti |
| Performance AFLP 1 (/3) | 1,23 | 1,17 |
| **AFLP 1 (/7)** | **3,23** | **3,67** |
| AFLP 2 — techniques (/5) | 2,5 — départ correct, signal donné trop tard | 3 — marque prise sérieusement, main bien tendue |
| **Fin de séquence (/12)** | **5,73** | **6,67** |
| Répartition choisie | b : AFLP 4 sur 4, AFLP 5 sur 4 | a : AFLP 4 sur 6, AFLP 5 sur 2 |
| AFLP 4 — rôles | 2,5 / 4 (degré 3, juge de zone fiable) | 3,5 / 6 (degré 3, starter autonome) |
| AFLP 5 — préparation | 2 / 4 (degré 3, échauffement complet) | 1 / 2 (degré 3) |
| **Fil de séquence (/8)** | **4,5** | **4,5** |
| **Note finale (/20)** | **10,23 → 10,2 / 20** | **11,17 → 11,2 / 20** |

### Ce qui leur a manqué

- Un **200 m individuel** plus rapide : chaque seconde gagnée rapporte environ 0,1 point sur l'échelle de performance.
- Surtout, la **transmission** : avec un IT à 0 au lieu de +0,3, ils gagnaient déjà 0,2 point sur cette note, et un relais en 1'10" leur donnait 1,3 au lieu de 1,2. Le travail de **marque** (reculer d'1 ou 2 pieds pour que le receveur parte plus tôt) était la priorité.`,
  },
};

// =====================================================================
// FOOTBALL (à 5 contre 5 sur terrain réduit) — niveau Terminale
// =====================================================================
const FT = "Football — théorie";
const FTE = "Football — évaluation";

export const COURS_FOOT = {
  "ft-jeu": {
    cours: FT,
    titre: "1. Le football en EPS : terrain, but du jeu et attendus",
    md: `Le football est un sport collectif d'**opposition** où deux équipes cherchent à **marquer des buts** en faisant progresser le ballon, principalement au pied, et à **empêcher l'adversaire de marquer**.

### Le cadre de jeu au lycée

| Élément | Règle en cycle |
| --- | --- |
| Équipes | **5 contre 5** (4 joueurs de champ + 1 gardien), parfois 7 contre 7 en extérieur |
| Terrain | Réduit, du type terrain de handball (**40 m × 20 m**), buts de handball |
| Zone du gardien | La zone de handball (6 m) : seul le gardien y joue le ballon à la main |
| Ballon | Taille 5 (ou ballon de futsal en gymnase) |
| Durée | Matchs courts (par exemple 2 × 6 à 8 minutes) |
| Équipes | Homogènes entre elles, mixtes selon l'organisation de la classe |

### Pourquoi un terrain réduit ?

Moins d'espace et moins de joueurs, c'est **plus de ballons touchés**, des décisions **plus rapides** et une vraie nécessité de **jouer ensemble** : un joueur seul face à deux défenseurs perd vite le ballon.

### Ce qu'on attend d'un élève de Terminale

- **Conserver** le ballon collectivement (passes, appuis, soutiens) et **progresser** vers le but adverse.
- **Créer et exploiter le surnombre** pour **déséquilibrer** la défense et tirer en position favorable.
- **Défendre ensemble** : récupérer le ballon, fermer l'axe, protéger son but.
- **Changer de statut** très vite (attaquant ↔ défenseur) à la perte et à la récupération du ballon.
- **Analyser le rapport de force** et adapter son projet de jeu à l'adversaire.
- **Connaître le règlement**, arbitrer, coacher, observer.`,
  },

  "ft-reglement": {
    cours: FT,
    titre: "2. Le règlement",
    md: `### Les règles de base

| Règle | En cycle |
| --- | --- |
| Engagement | Au centre, en début de période et après chaque but (par l'équipe qui a encaissé) |
| But | Le ballon a **entièrement franchi** la ligne de but, entre les poteaux et sous la barre |
| Hors-jeu | **Pas de hors-jeu** sur terrain réduit (sauf règle différente fixée par l'enseignant) |
| Sortie en touche | Remise en jeu **au pied** (ballon arrêté sur la ligne) ou à la main selon la règle du cycle ; adversaires à **3 m** |
| Sortie en but (dernier touché par un attaquant) | Relance du **gardien**, à la main ou au pied, depuis sa zone |
| Sortie en but (dernier touché par un défenseur) | **Corner** au pied, au coin du terrain |

### Le gardien

- Il est le **seul** à pouvoir entrer dans sa zone et à jouer le ballon **à la main**, uniquement dans sa zone.
- Il **ne prend pas à la main** une passe volontaire au pied d'un partenaire.
- Il relance en moins de **6 secondes** environ.

### Les fautes

| Faute | Sanction |
| --- | --- |
| **Main** volontaire (bras écarté du corps qui touche le ballon) | Coup franc |
| **Charge**, poussée, retenue (tirage de maillot), croche-pied | Coup franc direct |
| **Tacle glissé** (interdit en EPS, pour la sécurité) | Coup franc direct |
| Jeu dangereux (pied haut près de la tête d'un adversaire) | Coup franc indirect |
| Défenseur dans sa propre zone | Penalty |
| Attaquant dans la zone du gardien | Relance du gardien |
| Gardien qui sort de sa zone avec le ballon à la main | Coup franc pour l'adversaire |

Sur coup franc, les adversaires se placent à **3 m** (ou 5 m) du ballon. Le **penalty** est tiré face au gardien, à une distance fixée par l'enseignant (6 ou 7 m sur terrain de handball).

### L'esprit du jeu

Le contact **épaule contre épaule** pour disputer le ballon est autorisé ; tout le reste (pousser avec les mains, charger dans le dos, tacler) est **interdit**. L'arbitre siffle aussi l'**antijeu** et les contestations.`,
  },

  "ft-technique": {
    cours: FT,
    titre: "3. Les gestes techniques",
    md: `| Geste | Quand l'utiliser | Points clés |
| --- | --- | --- |
| **Passe courte (intérieur du pied)** | Conserver, combiner à 2 ou 3 | Pied d'appui à côté du ballon, orienté vers la cible ; frapper avec l'**intérieur du pied**, cheville bloquée ; regarder le partenaire avant, le ballon pendant |
| **Passe longue / centre** | Changer le jeu de côté, trouver un partenaire éloigné | Frappe avec le **cou-de-pied** (lacets), pied d'appui un peu en arrière du ballon, buste légèrement penché en arrière pour lever le ballon |
| **Contrôle orienté** | Recevoir **en se dirigeant déjà** vers l'espace libre | Amortir avec l'intérieur du pied (ou la semelle) en emmenant le ballon dans la direction choisie : le contrôle **prépare l'action suivante** |
| **Conduite de balle** | Progresser quand l'espace est libre | Petites touches, ballon **proche du pied**, tête levée entre les touches |
| **Dribble / feinte** | Éliminer un défenseur en 1 contre 1 | Feinte de corps ou de frappe, **changement de rythme et de direction**, protéger le ballon avec le corps |
| **Protection de balle** | Garder le ballon sous pression | Se placer **entre l'adversaire et le ballon**, bras écartés sans pousser, appuis bas |
| **Tir** | Marquer | Viser les **coins** et le **bas** du but ; tir au cou-de-pied (puissance) ou intérieur du pied (précision, « plat du pied ») ; tirer **vite**, sans contrôle de trop |
| **Jeu de tête** | Ballon aérien | Frapper avec le **front**, yeux ouverts, cou gainé |
| **Gardien : prise de balle** | Arrêt | Mains en « W » derrière le ballon (ballons hauts), en « cuillère » (ballons bas), corps derrière les mains |

### Les critères de qualité à viser

- **Passe** : à la bonne force, dans le **pied opposé au défenseur** ou dans la course du partenaire.
- **Contrôle** : un seul contact qui permet de jouer tout de suite (passe, tir, conduite).
- **Tir** : cadré, dans un angle favorable, déclenché dès que l'occasion se présente.`,
  },

  "ft-roles": {
    cours: FT,
    titre: "4. Les rôles et l'organisation de l'équipe",
    md: `### En attaque : les trois rôles autour du ballon

| Rôle | Mission |
| --- | --- |
| **Porteur de balle** | Décide : conserver, passer, conduire, dribbler ou tirer |
| **Soutien** | Se place **derrière ou à côté** du porteur, à distance de passe, pour lui offrir une solution de sécurité |
| **Appui** | Se place **devant** le porteur (vers le but adverse), se démarque pour recevoir et faire progresser le ballon |

### Se démarquer

- Se rendre **disponible** : sortir de l'ombre du défenseur, être **visible** du porteur.
- **Appel de balle** : un mouvement court (vers le ballon) ou long (dans le dos de la défense).
- **Occuper la largeur** : un joueur de chaque côté pour écarter la défense.

### Une organisation simple à 4 joueurs de champ

| Organisation | Principe |
| --- | --- |
| **Losange** (1-2-1) | Un défenseur axial, deux joueurs sur les côtés, un attaquant en pointe : bonne occupation de la largeur et de la profondeur |
| **Carré** (2-2) | Deux derrière, deux devant : plus simple, solide en défense |

### En défense

| Rôle | Mission |
| --- | --- |
| **Défenseur du porteur** | Se place **entre le porteur et le but**, ralentit, oriente vers le côté, ne se jette pas |
| **Couverture** | Un partenaire derrière lui, prêt à intervenir s'il est éliminé |
| **Défenseurs des non-porteurs** | Marquent les adversaires dangereux, **ferment l'axe** et les lignes de passe |
| **Gardien** | Protège son but, **organise la défense** à la voix, relance vite |

### La communication

« J'ai ! », « Seul ! », « Derrière ! », « Je couvre ! » : on parle pour **aider le porteur** et **organiser la défense**.`,
  },

  "ft-tactique": {
    cours: FT,
    titre: "5. La tactique : attaquer, défendre, analyser le rapport de force",
    md: `### Attaquer : déséquilibrer la défense

- **Conserver** quand la défense est en place : passes courtes, soutiens, patience.
- **Accélérer** dès qu'un espace s'ouvre : jeu vers l'avant, passe dans la course.
- **Créer le surnombre** : 2 contre 1 avec le **une-deux** (passe et va), ou **fixer** un défenseur avant de passer.
- **Changer le côté du jeu** quand un côté est bouché.
- **Tirer** dès qu'on est en position favorable (axe, près du but) : pas de tir, pas de but.

### La contre-attaque

À la récupération du ballon, la défense adverse n'est **pas encore replacée** : on joue **vite vers l'avant**, en peu de passes, avant qu'elle se réorganise.

### Défendre : récupérer et protéger le but

| Principe | Comment |
| --- | --- |
| **Se replacer** | À la perte du ballon, tout le monde revient **entre le ballon et son but** |
| **Fermer l'axe** | Pousser le porteur vers les côtés, où il est moins dangereux |
| **Presser** au bon moment | Sur un contrôle raté, une passe en retrait, un adversaire dos au but |
| **Couvrir** | Toujours un partenaire derrière celui qui attaque le porteur |
| **Être compact** | Peu d'espace entre les défenseurs |

### Analyser le rapport de force

| Question | Exemple d'adaptation |
| --- | --- |
| Qui est le joueur adverse le plus dangereux ? | Le marquer de près, lui couper les passes |
| L'adversaire défend-il très haut ? | Jouer **dans le dos** de la défense |
| L'adversaire défend-il bas, devant son but ? | Faire circuler, tirer de loin, jouer sur les côtés |
| Notre point fort ? | Construire pour notre meilleur attaquant, ou jouer en contre-attaque si nous sommes rapides |

Pendant le **temps mort** ou entre deux matchs, le coach donne **une ou deux consignes simples**.`,
  },

  "ft-connaissances": {
    cours: FT,
    titre: "6. Ce sur quoi tu peux être interrogé",
    md: `Tu dois être capable de :

### Le règlement et l'arbitrage

- Expliquer les règles des **remises en jeu** (touche, sortie en but, corner, engagement).
- Citer les règles du **gardien** et de **sa zone**.
- Reconnaître les **fautes** (main, charge, tacle, jeu dangereux) et leur **sanction** (coup franc, penalty).
- **Arbitrer** un match : coups de sifflet, gestes, gestion du temps et du score.

### La technique

- Décrire les **points clés** de la passe intérieur du pied, du contrôle orienté, de la conduite de balle, du tir et de la protection de balle.
- Dire **quel geste** choisir selon la situation.

### Les rôles et l'organisation

- Expliquer les rôles de **porteur**, **soutien** et **appui**.
- Décrire une organisation à 4 joueurs de champ et les principes de **défense** (couverture, fermer l'axe).

### La tactique

- Citer des moyens de **créer le surnombre** et de **déséquilibrer** une défense.
- Expliquer le principe de la **contre-attaque**.
- **Analyser un rapport de force** et proposer un **projet de jeu** adapté.

### Les rôles sociaux

- Tenir le rôle d'**arbitre**, de **coach** et d'**observateur** (fiche d'observation, conseils).`,
  },

  "ft-lexique": {
    cours: FT,
    titre: "7. Lexique",
    md: `| Terme | Définition |
| --- | --- |
| Contrôle orienté | Réception du ballon qui l'emmène directement dans la direction de l'action suivante |
| Soutien | Partenaire placé derrière ou à côté du porteur, solution de passe de sécurité |
| Appui | Partenaire placé devant le porteur, vers le but adverse |
| Démarquage | Déplacement pour se libérer de son défenseur et recevoir le ballon |
| Une-deux (passe et va) | Passe à un partenaire puis appel pour recevoir aussitôt sa remise |
| Surnombre | Situation où l'équipe a plus de joueurs que l'adversaire autour du ballon |
| Fixer | Attirer un défenseur sur soi avant de passer, pour libérer un partenaire |
| Contre-attaque | Attaque rapide lancée juste après la récupération du ballon |
| Couverture | Placement d'un défenseur derrière son partenaire qui attaque le porteur |
| Pressing | Défense agressive pour récupérer vite le ballon |
| Rapport de force | Comparaison des points forts et faibles des deux équipes |`,
  },

  // --------------------------- Football : évaluation ---------------------------
  "ft-eval-structure": {
    cours: FTE,
    titre: "1. L'épreuve du bac : structure de la note",
    md: `Le football fait partie du **champ d'apprentissage 4** : « Conduire et maîtriser un affrontement collectif ou interindividuel pour gagner ». La note est sur **20 points**, répartis en trois attendus de fin de lycée (AFL).

| Attendu | Intitulé | Points | Quand |
| --- | --- | --- | --- |
| **AFL1** | S'engager pour gagner une rencontre en faisant des choix techniques et tactiques pertinents au regard de l'analyse du rapport de force | **12 points** | Le jour de l'épreuve (fin de cycle) |
| **AFL2** | Se préparer et s'entraîner, individuellement ou collectivement, pour conduire et maîtriser un affrontement collectif | **2, 4 ou 6 points** | Au fil du cycle |
| **AFL3** | Choisir et assumer les rôles qui permettent un fonctionnement collectif solidaire | **6, 4 ou 2 points** | Au fil du cycle (et le jour de l'épreuve) |

### Ton choix de répartition (AFL2 / AFL3)

| Choix | AFL2 | AFL3 |
| --- | --- | --- |
| a | 2 points | 6 points |
| b | 4 points | 4 points |
| c | 6 points | 2 points |

### L'AFL1 en deux éléments

- **Élément 1** : s'engager et réaliser des **actions techniques d'attaque et de défense** efficaces, en lien avec son projet de jeu (porteur et non-porteur).
- **Élément 2** : faire des **choix** pertinents au regard de l'**analyse du rapport de force**.

Les points de chaque élément (entre 4 et 8) et les descripteurs précis sont fixés par le **référentiel de l'établissement**. La note est ensuite ajustée selon la **proportion de rencontres gagnées**.`,
  },

  "ft-eval-deroulement": {
    cours: FTE,
    titre: "2. Le jour de l'épreuve : ce qui est observé",
    md: `### Le déroulement

- Les équipes de **5 joueurs** (4 + gardien) sont constituées pour être **homogènes entre elles**, selon les règles fixées par l'enseignant.
- Chaque équipe dispute **plusieurs rencontres** courtes ; le rôle de **gardien tourne** pour que chacun soit évalué surtout comme joueur de champ.
- Avant les matchs, chaque équipe présente son **projet de jeu** (organisation, rôles, intentions).
- Entre les rencontres, l'équipe **analyse** ses résultats et l'adversaire suivant et peut **ajuster** son projet.

### Ce que l'enseignant observe (AFL1)

| Domaine | Indicateurs |
| --- | --- |
| **Porteur de balle** | Passes réussies, contrôles orientés, choix entre conserver, progresser et tirer ; peu de pertes de balle |
| **Non-porteur en attaque** | Démarquages, soutiens et appuis, occupation de la largeur, appels dans l'espace libre |
| **Efficacité offensive** | Tirs cadrés, occasions créées, buts marqués |
| **Défense** | Replacement, couverture, ballons récupérés, défense sans faute |
| **Choix tactiques** | Adaptation à l'adversaire, respect et ajustement du projet de jeu |
| **Rapport de force** | Résultats obtenus face à des adversaires de niveau proche |

### Ce qui fait la différence en Terminale

- Un jeu **collectif** construit (passes, soutiens), pas une suite d'exploits individuels.
- Un **changement de statut** immédiat à la perte et à la récupération du ballon.
- Une équipe qui **communique** et **s'adapte** pendant la rencontre.`,
  },

  "ft-eval-roles": {
    cours: FTE,
    titre: "3. AFL2 et AFL3 : s'entraîner et assumer des rôles",
    md: `### AFL2 : se préparer et s'entraîner

Évalué **tout au long du cycle**, souvent à l'aide d'un **carnet d'entraînement** ou de fiches d'observation.

- **Identifier** ses points forts et faibles (et ceux de l'équipe) à partir d'observations (passes réussies, ballons perdus, tirs).
- **Choisir** des exercices adaptés pour progresser (conservation, finition, défense en couverture).
- **S'échauffer** de façon complète et spécifique (voir *Sport & Santé › L'échauffement*, partie sports collectifs).
- **Mesurer** ses progrès et ajuster son entraînement.

### AFL3 : assumer des rôles

Tu choisis **deux rôles** parmi ceux proposés et tu es évalué dans ces rôles :

| Rôle | Ce que l'on attend |
| --- | --- |
| **Arbitre** | Siffler juste, sans hésiter, faire les bons gestes, gérer le temps et le score, faire respecter les règles avec calme |
| **Coach** | Observer, donner une à deux consignes claires, encourager |
| **Observateur** | Remplir une fiche d'observation fiable, restituer des informations utiles |
| **Partenaire d'entraînement** | Jouer le jeu dans les exercices pour faire progresser les autres |
| **Organisateur** | Installer le terrain, gérer les rencontres et le temps |

Dans tous les cas, on attend une attitude **solidaire** : respect des partenaires, des adversaires et de l'arbitre, engagement constant.`,
  },
};

// =====================================================================
// BASKET-BALL (4 contre 4) — niveau Terminale
// =====================================================================
const BK = "Basket-ball — théorie";
const BKE = "Basket-ball — évaluation";

export const COURS_BASKET = {
  "bk-jeu": {
    cours: BK,
    titre: "1. Le basket-ball en EPS : terrain, but du jeu et attendus",
    md: `Le basket-ball est un sport collectif **sans contact** (en principe) où deux équipes cherchent à **marquer des paniers** en faisant progresser le ballon à la main (passes et dribbles), et à **protéger leur propre panier**.

### Le cadre de jeu au lycée

| Élément | Règle en cycle |
| --- | --- |
| Équipes | **4 contre 4** sur terrain entier (variante 3 contre 3 sur un demi-terrain) |
| Terrain | Terrain de basket du gymnase, paniers à 3,05 m |
| Ballon | Taille 7 (garçons) ou taille 6 (filles) |
| Durée | Matchs courts (par exemple 2 × 5 à 6 minutes) |
| Points | Panier **1 point** (lancer franc), **2 points**, **3 points** (derrière la ligne à 3 points) |
| Équipes | Homogènes entre elles, mixtes selon l'organisation de la classe |

### Pourquoi le 4 contre 4 ?

Avec moins de joueurs, chacun **touche plus de ballons**, l'espace est plus grand pour **se démarquer** et les situations de **surnombre** (2 contre 1, 3 contre 2) sont plus fréquentes et plus lisibles.

### Ce qu'on attend d'un élève de Terminale

- **Faire progresser** le ballon rapidement vers le panier adverse, notamment en **contre-attaque**.
- **Se démarquer** et créer des **tirs en position favorable** (près du panier, seul, dans l'axe).
- **Défendre** de façon individuelle et collective (entre son joueur et le panier, aide, rebond).
- **Changer de statut** très vite (attaquant ↔ défenseur).
- **Analyser le rapport de force** et adapter son projet de jeu.
- **Connaître le règlement**, arbitrer, coacher, tenir la feuille de marque, observer.`,
  },

  "bk-reglement": {
    cours: BK,
    titre: "2. Le règlement",
    md: `### Les violations (perte du ballon, remise en jeu adverse)

| Violation | Définition |
| --- | --- |
| **Marcher** | Faire plus de **2 appuis** avec le ballon en main, ou changer de pied de pivot |
| **Reprise de dribble** | Dribbler, tenir le ballon à deux mains, puis redribbler |
| **Dribble à deux mains** | Dribbler avec les deux mains en même temps |
| **Ballon porté** | Accompagner le ballon par en dessous pendant le dribble |
| **Sortie** | Le ballon ou le joueur qui le tient touche la ligne ou l'extérieur du terrain |
| **3 secondes** | Un attaquant reste plus de 3 s dans la **raquette** adverse |
| **5 secondes** | Un joueur étroitement défendu garde le ballon plus de 5 s sans jouer |
| **8 secondes** | L'équipe ne fait pas passer le ballon dans la moitié de terrain adverse en 8 s |
| **Retour en zone** | L'équipe ramène le ballon dans sa moitié de terrain après l'avoir passée |
| **Pied** | Jouer volontairement le ballon avec le pied ou la jambe |

### Les fautes (contacts)

| Faute | Sanction |
| --- | --- |
| Contact illégal (pousser, tenir, accrocher, frapper le bras du tireur) | Remise en jeu, ou **lancers francs** si le joueur était en train de tirer (2 ou 3 selon le tir, 1 si le panier est marqué) |
| **Passage en force** (l'attaquant percute un défenseur bien placé) | Faute de l'attaquant |
| Faute antisportive | Lancers francs et ballon à l'équipe qui a subi la faute |

- Chaque joueur a droit à un nombre limité de **fautes personnelles** (par exemple 3 en match court) : au-delà, il sort.
- Le **principe du cylindre** : chaque joueur a droit à l'espace vertical au-dessus de lui ; un défenseur bien placé, bras levés, ne fait pas faute.

### L'arbitrage

L'arbitre siffle, montre le **geste de la violation ou de la faute**, indique le **numéro du fautif** et la **direction** du jeu. Gestes à connaître : marcher, reprise de dribble, 3 secondes, faute personnelle, passage en force, panier à 3 points.`,
  },

  "bk-technique": {
    cours: BK,
    titre: "3. Les gestes techniques",
    md: `| Geste | Quand l'utiliser | Points clés |
| --- | --- | --- |
| **Passe à deux mains (poitrine)** | Passe rapide et précise à moyenne distance | Ballon à la poitrine, coudes près du corps, **pas vers la cible**, extension des bras, pouces vers le bas à la fin |
| **Passe à terre (rebond)** | Passer sous les bras d'un défenseur | Rebond aux **deux tiers** de la distance, vers les mains du partenaire |
| **Passe à une main (baseball)** | Contre-attaque, longue distance | Bras armé derrière l'oreille, transfert du poids du corps |
| **Dribble de progression** | Avancer vite, espace libre | Ballon **devant et sur le côté**, poussé avec les doigts, tête **levée** |
| **Dribble de protection** | Garder le ballon face à un défenseur | Ballon bas, **corps entre défenseur et ballon**, bras libre en protection |
| **Pivot** | Se dégager, protéger, trouver une passe | Un pied **reste fixe** au sol, l'autre tourne autour |
| **Tir en course (double pas)** | Finir près du panier | Deux appuis après le dribble (droite-gauche pour un tir main droite), **impulsion sur un pied**, monter genou et ballon, viser le **carré** de la planche |
| **Tir en appui (shoot)** | Tir à mi-distance, seul | Pieds largeur d'épaules, coude sous le ballon, **main de tir derrière, main d'appui sur le côté**, extension jambes-bras, **poignet cassé** vers le panier, regard sur le cercle |
| **Rebond** | Récupérer un tir manqué | **Se placer** entre son adversaire et le panier (écran retard), sauter, prendre le ballon à deux mains au point le plus haut |

### Les critères de qualité à viser

- **Passe** : rapide, tendue, dans les mains ou devant le partenaire en mouvement.
- **Dribble** : utilisé pour **progresser** ou **se dégager**, pas pour rester sur place.
- **Tir** : pris **seul**, en position **favorable** (près du panier, dans l'axe ou à 45°), en équilibre.`,
  },

  "bk-roles": {
    cours: BK,
    titre: "4. Les rôles et l'organisation de l'équipe",
    md: `En 4 contre 4, **tout le monde attaque et tout le monde défend**, mais chacun a un rôle principal.

| Rôle | Mission | Qualités recherchées |
| --- | --- | --- |
| **Meneur** | Remonte le ballon, organise l'attaque, annonce les systèmes | Dribble, vision du jeu, passe, communication |
| **Ailiers** | Occupent les côtés, se démarquent, coupent vers le panier, tirent à mi-distance ou à 3 points | Vitesse, tir, démarquage |
| **Pivot (intérieur)** | Joue près du panier, sert d'appui, prend les rebonds, finit sous le cercle | Placement, rebond, protection de balle, adresse près du panier |

### En attaque : occuper l'espace

- **Écarter** la défense : un joueur sur chaque côté, un meneur en haut, un intérieur près du panier.
- **Se démarquer** : feinte de départ, **changement de rythme et de direction**, appel de balle main tendue.
- **Couper** vers le panier après avoir passé (**passe et va**).
- Ne pas rester à deux au même endroit : **un espace = un joueur**.

### En défense : défense individuelle

- **Chacun défend un adversaire** : se placer **entre lui et le panier**, appuis fléchis, bras actifs.
- Le défenseur du porteur **gêne** le dribble, la passe et le tir sans faire faute.
- Les autres défenseurs se placent pour **voir le ballon et leur joueur**, prêts à **aider** si un attaquant passe.
- Au tir adverse : **chacun bloque son joueur** pour le rebond (écran retard).

### La communication

« Écran ! », « Je prends ! », « Aide ! », « Rebond ! » : on parle pour éviter d'être surpris.`,
  },

  "bk-tactique": {
    cours: BK,
    titre: "5. La tactique : attaquer, défendre, analyser le rapport de force",
    md: `### Attaquer : créer un tir favorable

- **Contre-attaque** : dès la récupération (rebond, interception), **passe longue** ou dribble rapide vers l'avant pour attaquer avant le repli de la défense (situations de 2 contre 1, 3 contre 2).
- **Le 2 contre 1** : le porteur **fixe** le défenseur (va vers lui) puis passe au partenaire libre au dernier moment.
- **Le passe et va** : je passe, je coupe vers le panier, je reçois en avançant.
- **L'écran** : un attaquant se place, immobile, sur la trajectoire du défenseur de son partenaire pour le libérer.
- **Jouer à l'intérieur** : passe au pivot près du panier, qui finit ou ressort si deux défenseurs viennent sur lui.
- **Choisir son tir** : mieux vaut **une passe de plus** pour un tir sous le panier qu'un tir forcé de loin.

### Défendre : protéger le panier

| Principe | Comment |
| --- | --- |
| **Repli défensif** | Dès la perte du ballon, sprint vers son camp, **les yeux sur le ballon** |
| **Protéger la raquette** | Empêcher les tirs faciles près du panier |
| **Aide et reprise** | Un défenseur aide sur le porteur qui a passé son vis-à-vis, puis revient sur son joueur |
| **Rebond défensif** | Bloquer son attaquant, ne laisser **aucun second tir** |
| **Défense de zone** (variante) | Chaque défenseur garde une **zone** plutôt qu'un joueur, utile face à une équipe qui tire mal de loin |

### Analyser le rapport de force

| Question | Exemple d'adaptation |
| --- | --- |
| Qui est le meilleur attaquant adverse ? | Notre meilleur défenseur sur lui, aide systématique |
| L'adversaire tire-t-il bien de loin ? | Défendre plus haut ; sinon, resserrer la défense près du panier |
| Sommes-nous plus rapides ? | Jouer la **contre-attaque** à chaque récupération |
| Sommes-nous plus grands ? | Jouer à l'intérieur, dominer le **rebond** |

Le **temps mort** permet au coach de donner **une ou deux consignes simples**.`,
  },

  "bk-connaissances": {
    cours: BK,
    titre: "6. Ce sur quoi tu peux être interrogé",
    md: `Tu dois être capable de :

### Le règlement et l'arbitrage

- Citer et reconnaître les **violations** (marcher, reprise de dribble, 3 s, 5 s, 8 s, retour en zone, sortie).
- Expliquer ce qu'est une **faute personnelle**, le **passage en force**, le **principe du cylindre**, et quand on obtient des **lancers francs**.
- Connaître la **valeur des paniers** (1, 2, 3 points).
- **Arbitrer** un match et tenir la **feuille de marque**.

### La technique

- Décrire les **points clés** des passes, du dribble de progression et de protection, du pivot, du **double pas**, du tir en appui et du rebond.
- Dire **quel geste** choisir selon la situation.

### Les rôles et l'organisation

- Expliquer le rôle du **meneur**, des **ailiers** et du **pivot**.
- Décrire les principes de la **défense individuelle** (placement, aide, rebond).

### La tactique

- Expliquer le **2 contre 1**, le **passe et va**, l'**écran** et la **contre-attaque**.
- **Analyser un rapport de force** et proposer un **projet de jeu** adapté.

### Les rôles sociaux

- Tenir le rôle d'**arbitre**, de **marqueur**, de **coach** et d'**observateur**.`,
  },

  "bk-lexique": {
    cours: BK,
    titre: "7. Lexique",
    md: `| Terme | Définition |
| --- | --- |
| Raquette | Zone rectangulaire sous le panier, limitée par la ligne des lancers francs |
| Double pas | Tir en course après deux appuis |
| Pivot (geste) | Rotation autour d'un pied fixe, ballon en main |
| Pivot (poste) | Joueur intérieur qui évolue près du panier |
| Écran | Placement immobile d'un attaquant pour bloquer le défenseur d'un partenaire |
| Écran retard | Blocage de son adversaire pour prendre le rebond |
| Passe et va | Passer puis couper vers le panier pour recevoir à nouveau |
| Contre-attaque | Attaque rapide avant le repli de la défense adverse |
| Repli défensif | Retour rapide en défense après la perte du ballon |
| Cylindre | Espace vertical auquel chaque joueur a droit |
| Lancer franc | Tir à 1 point, sans opposition, après certaines fautes |
| Rapport de force | Comparaison des points forts et faibles des deux équipes |`,
  },

  // --------------------------- Basket-ball : évaluation ---------------------------
  "bk-eval-structure": {
    cours: BKE,
    titre: "1. L'épreuve du bac : structure de la note",
    md: `Le basket-ball fait partie du **champ d'apprentissage 4** : « Conduire et maîtriser un affrontement collectif ou interindividuel pour gagner ». La note est sur **20 points**, répartis en trois attendus de fin de lycée (AFL).

| Attendu | Intitulé | Points | Quand |
| --- | --- | --- | --- |
| **AFL1** | S'engager pour gagner une rencontre en faisant des choix techniques et tactiques pertinents au regard de l'analyse du rapport de force | **12 points** | Le jour de l'épreuve (fin de cycle) |
| **AFL2** | Se préparer et s'entraîner, individuellement ou collectivement, pour conduire et maîtriser un affrontement collectif | **2, 4 ou 6 points** | Au fil du cycle |
| **AFL3** | Choisir et assumer les rôles qui permettent un fonctionnement collectif solidaire | **6, 4 ou 2 points** | Au fil du cycle (et le jour de l'épreuve) |

### Ton choix de répartition (AFL2 / AFL3)

| Choix | AFL2 | AFL3 |
| --- | --- | --- |
| a | 2 points | 6 points |
| b | 4 points | 4 points |
| c | 6 points | 2 points |

### L'AFL1 en deux éléments

- **Élément 1** : s'engager et réaliser des **actions techniques d'attaque et de défense** efficaces, en lien avec son projet de jeu.
- **Élément 2** : faire des **choix** pertinents au regard de l'**analyse du rapport de force**.

Les points de chaque élément (entre 4 et 8) et les descripteurs précis sont fixés par le **référentiel de l'établissement**. La note est ensuite ajustée selon la **proportion de rencontres gagnées**.`,
  },

  "bk-eval-deroulement": {
    cours: BKE,
    titre: "2. Le jour de l'épreuve : ce qui est observé",
    md: `### Le déroulement

- Les équipes de **4 joueurs** sont constituées pour être **homogènes entre elles**, selon les règles fixées par l'enseignant.
- Chaque équipe dispute **plusieurs rencontres** courtes contre des équipes de niveau proche.
- Avant les matchs, chaque équipe présente son **projet de jeu** (organisation, rôles, intentions).
- Entre les rencontres, l'équipe **analyse** ses résultats et l'adversaire suivant et peut **ajuster** son projet.

### Ce que l'enseignant observe (AFL1)

| Domaine | Indicateurs |
| --- | --- |
| **Porteur de balle** | Passes réussies, dribble utile (progression, dégagement), peu de pertes de balle et de violations |
| **Non-porteur** | Démarquages, coupes vers le panier, occupation de l'espace, appuis au pivot |
| **Efficacité offensive** | Tirs pris en position favorable, paniers marqués, contre-attaques conclues |
| **Défense** | Placement entre son joueur et le panier, aide, interceptions, **rebonds** défensifs, fautes évitées |
| **Choix tactiques** | Adaptation à l'adversaire, respect et ajustement du projet de jeu |
| **Rapport de force** | Résultats obtenus face à des adversaires de niveau proche |

### Ce qui fait la différence en Terminale

- Une attaque qui **construit** des tirs faciles plutôt que des tirs forcés.
- Une **contre-attaque** jouée à chaque récupération.
- Un **repli défensif** immédiat et une défense qui **s'entraide**.`,
  },

  "bk-eval-roles": {
    cours: BKE,
    titre: "3. AFL2 et AFL3 : s'entraîner et assumer des rôles",
    md: `### AFL2 : se préparer et s'entraîner

Évalué **tout au long du cycle**, souvent à l'aide d'un **carnet d'entraînement** ou de fiches d'observation.

- **Identifier** ses points forts et faibles (et ceux de l'équipe) à partir d'observations (tirs réussis, ballons perdus, rebonds).
- **Choisir** des exercices adaptés pour progresser (tir, double pas, 2 contre 1, défense).
- **S'échauffer** de façon complète et spécifique (voir *Sport & Santé › L'échauffement*, partie sports collectifs).
- **Mesurer** ses progrès (pourcentage de réussite aux tirs, par exemple) et ajuster son entraînement.

### AFL3 : assumer des rôles

Tu choisis **deux rôles** parmi ceux proposés et tu es évalué dans ces rôles :

| Rôle | Ce que l'on attend |
| --- | --- |
| **Arbitre** | Siffler juste, faire les bons gestes, indiquer le fautif et la direction, gérer le match avec calme |
| **Marqueur / chronométreur** | Tenir la feuille de marque (paniers, fautes), gérer le temps |
| **Coach** | Observer, donner une à deux consignes claires, gérer les changements, encourager |
| **Observateur** | Remplir une fiche d'observation fiable, restituer des informations utiles |
| **Organisateur** | Installer le matériel, gérer les rencontres et le temps |

Dans tous les cas, on attend une attitude **solidaire** : respect des partenaires, des adversaires et de l'arbitre, engagement constant.`,
  },

  "bk-eval-exemple": {
    cours: BKE,
    titre: "4. Exemple de notation : Kevin",
    md: `Exemple fictif pour comprendre comment se construit la note. On suppose que le **référentiel de l'établissement** répartit l'AFL1 en **7 points pour l'élément 1** et **5 points pour l'élément 2**, avec quatre degrés :

| Degré | Élément 1 (/7) | Élément 2 (/5) | AFL2 ou AFL3 sur 4 points |
| --- | --- | --- | --- |
| 1 | 0 à 1,5 | 0 à 1 | 0 à 0,9 |
| 2 | 2 à 3,5 | 1,5 à 2,5 | 1 à 1,9 |
| 3 | 4 à 5,5 | 3 à 4 | 2 à 2,9 |
| 4 | 6 à 7 | 4,5 à 5 | 3 à 4 |

### Le jour de l'épreuve (AFL1)

Kevin joue **ailier** dans une équipe de 4. Son équipe gagne **3 rencontres sur 5**.

| Élément | Ce qui a été observé | Degré | Points |
| --- | --- | --- | --- |
| **Élément 1** — actions techniques | Passes sûres, double pas réussi en contre-attaque, bon repli ; tir en appui encore irrégulier, deux pertes de balle en dribble face à la pression | Degré 3 ; 3 victoires sur 5 placent la note **dans le haut** du degré | **5 / 7** |
| **Élément 2** — choix et rapport de force | Repère que l'équipe adverse se replie lentement et pousse les contre-attaques ; tente encore des tirs de loin quand un partenaire est seul sous le panier | Degré 3 | **3 / 5** |
| **AFL1** | | | **8 / 12** |

### Au fil du cycle (AFL2 et AFL3)

Kevin a choisi la répartition **b : 4 points / 4 points**.

| Attendu | Ce qui a été observé | Degré | Points |
| --- | --- | --- | --- |
| **AFL2** — s'entraîner | Carnet rempli, a identifié son tir en appui comme point faible et a fait des séries de tirs ; échauffement correct mais peu spécifique | Degré 3 | **2,5 / 4** |
| **AFL3** — rôles | Arbitre clair et respecté, bon marqueur sur la feuille de match | Degré 4 | **3,5 / 4** |

### La note finale

| AFL1 | AFL2 | AFL3 | **Total** |
| --- | --- | --- | --- |
| 8 / 12 | 2,5 / 4 | 3,5 / 4 | **14 / 20** |

**Pour aller plus haut**, Kevin doit fiabiliser son **tir en appui** (élément 1) et **choisir la passe** au partenaire démarqué plutôt que le tir lointain (élément 2) : deux points facilement à gagner.`,
  },
};

// =====================================================================
// ESCALADE — partie ajoutée à la page « Évaluation et tableau de performance »
// =====================================================================
export const COURS_ESCALADE_EXEMPLE = {
  "esc-eval-exemple": {
    cours: "Escalade — évaluation",
    titre: "3. Exemple de notation au bac : le binôme Frédéric et Thierry",
    md: `Exemple fictif pour comprendre comment les différentes parties de l'évaluation se transforment en note de bac. L'escalade fait partie du **champ d'apprentissage 2** : « Adapter son déplacement à des environnements variés et/ou incertains ». La note est sur **20 points**.

### La structure de la note (exemple de barème)

| Attendu | Ce qui est évalué | Points |
| --- | --- | --- |
| **AFL1** — s'engager pour réaliser en sécurité, à son meilleur niveau, un itinéraire | **Performance** sur la meilleure voie observée (/8) + **efficacité et sécurité** du grimpeur (/4) | **12 points** |
| **AFL2** — s'entraîner pour se déplacer de façon efficiente et en sécurité | **Suivi de cycle** (tableau de suivi dans Escalade Pro) et **connaissances** | **2, 4 ou 6 points** |
| **AFL3** — choisir et assumer les rôles d'un fonctionnement collectif solidaire | **Assurage** observé, contrôle croisé, rôle d'observateur | **6, 4 ou 2 points** |

### Le barème de performance (/8)

Points de la **meilleure voie réussie jusqu'au relais devant l'enseignant**, selon sa cotation et le mode de grimpe, avec toutes les couleurs de prises :

| Cotation | Moulinette | Moulitête | Tête |
| --- | --- | --- | --- |
| 5a | 3 | 3,5 | 4 |
| 5b | 4 | 4,5 | 5 |
| 5c | 5 | 5,5 | 6 |
| 6a | 6 | 6,5 | 7 |
| 6b | 7 | 7,5 | 8 |
| 6c et plus | 7,5 | 8 | 8 |

**Bonus** : **+0,5 point par couleur de prises retirée** (voie à 3 couleurs, 2 couleurs, 1 couleur), dans la limite de **8 points**.

### Ce qu'ont fait Frédéric et Thierry

Ils grimpent en **binôme** et s'assurent mutuellement. Dans le tableau de performance observée :

| Élève | Case de la voie évaluée | Lecture |
| --- | --- | --- |
| Frédéric | **T** sur la voie en **6a**, à **3 couleurs** · **AM** sur la voie de Thierry | Voie réussie en tête jusqu'au relais ; a assuré Thierry en moulinette |
| Thierry | **M** sur la voie en **5c**, **toutes couleurs** · **AT** sur la voie de Frédéric | Voie réussie en moulinette ; a assuré Frédéric en tête |

### Le calcul

| Partie | Frédéric | Thierry |
| --- | --- | --- |
| Performance (/8) | 6a en tête = 7, + 0,5 (une couleur retirée) = **7,5** | 5c en moulinette, toutes couleurs = **5** |
| Efficacité et sécurité du grimpeur (/4) | **3,5** — grimpe fluide, mousquetonnage rapide, bons repos | **2,5** — sûr, mais grimpe beaucoup avec les bras et hésite dans les passages |
| **AFL1 (/12)** | **11** | **7,5** |
| Répartition choisie | b : AFL2 sur 4, AFL3 sur 4 | a : AFL2 sur 2, AFL3 sur 6 |
| AFL2 — suivi de cycle et connaissances | **3,5 / 4** — tableau de suivi complet, cotations en progression, très bonnes réponses | **1,5 / 2** — tableau rempli régulièrement, connaissances correctes |
| AFL3 — assurage et rôles | **3,5 / 4** — assurage en tête attentif, mou bien géré | **4 / 6** — assurage sûr en tête, contrôle croisé systématique, gestion du mou encore à améliorer |
| **Note du bac (/20)** | **18 / 20** | **13 / 20** |

### À retenir

- Frédéric gagne surtout des points en **performance** : grimper **en tête** et **retirer des couleurs** rapporte plus que changer de voie sans changer de mode.
- Thierry a fait le bon choix de répartition : plus à l'aise comme **assureur** que comme grimpeur, il a mis **6 points sur l'AFL3**. Pour progresser, il doit passer en **moulitête** puis en **tête** sur une voie qu'il réussit déjà en moulinette (+0,5 à +1 point).

Le barème réel du cycle est présenté par ton enseignant ; cet exemple montre seulement **comment les points s'additionnent**.`,
  },
};
