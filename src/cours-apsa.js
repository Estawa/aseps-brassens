// =====================================================================
// v1.3.0 — Relais 2 × 200 m, Football, Basket-ball (théorie + évaluation)
// Même structure que Volley-ball / Badminton : une page « Théorie » et une
// page « Évaluation de fin de cycle » par activité, découpées en parties dépliables.
// =====================================================================

// =====================================================================
// RELAIS 2 × 200 m — niveau Terminale (barème Bac Pro, application Relais 200m)
// =====================================================================
const RL = "Relais 2 × 200 m — théorie";

export const COURS_RELAIS = {
  "rl-jeu": {
    cours: RL,
    titre: "1. Le relais 2 × 200 m : principe et attendus",
    md: `Le relais 2 × 200 m est une course **par équipe** : deux coureurs (binôme) — ou trois en trinôme — se partagent la distance et se **transmettent un témoin**. Le temps de l'équipe est pris **à l'arrivée du dernier relayeur**.

Gagner du temps au relais, ce n'est pas seulement courir vite : c'est surtout **ne pas en perdre au passage du témoin**. Une bonne équipe va **plus vite à deux** que la somme de ses deux 200 m individuels.

### Le cadre au lycée

| Élément | Organisation en cycle |
| --- | --- |
| Équipes | **Binômes** de niveau proche (à l'épreuve du bac). En cours de cycle, des trinômes sont possibles pour l'entraînement |
| Constitution | À partir du **test individuel sur 200 m** de début de cycle |
| Course | Chaque équipe dans **son couloir**, plusieurs équipes au départ ensemble, un seul chronomètre |
| Transmission | Dans une **zone de transmission de 20 m**, précédée d'une **zone d'élan de 10 m** |
| Manches | Plusieurs prises de performance sur le cycle ; l'**ordre des coureurs tourne** d'une manche à l'autre |

### Ce qu'on attend d'un élève de Terminale

- **Produire sa vitesse maximale** et la **maintenir** jusqu'au bout de son 200 m (ne pas « exploser » dans la ligne droite).
- **Partir vite** : départ (premier relayeur) ou départ lancé du receveur au bon moment.
- **Transmettre le témoin à pleine vitesse**, sans ralentir, dans la zone, grâce à des **repères précis** (marque au sol, signal).
- **Analyser** ses temps et ceux de l'équipe pour ajuster marques et stratégie.
- **Tenir des rôles** (starter, chronométreur, juge de zone, observateur-coach) et **se préparer** de façon autonome.`,
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
| Zone d'élan | **10 m avant** le début de la zone de transmission : le receveur peut s'y placer pour démarrer |

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

- Tenir les rôles de **starter**, **chronométreur**, **juge de zone** et **observateur-coach**.
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
| Zone d'élan | Espace de 10 m avant la zone de transmission où le receveur peut se placer pour démarrer |
| Marque | Repère au sol : quand le donneur l'atteint, le receveur démarre |
| Départ lancé | Départ du receveur en course, pour être à pleine vitesse au moment de recevoir le témoin |
| Indice de transmission (IT) | Somme des 200 m individuels − meilleur temps de relais de l'équipe ; plus il est petit (voire négatif), meilleure est la transmission |
| Courir à la corde | Courir au plus près de la ligne intérieure du couloir dans le virage |
| Starter | Personne qui donne le départ |`,
  },

};

// =====================================================================
// FOOTBALL (à 7 contre 7, règles UNSS) — niveau Terminale
// =====================================================================
const FT = "Football — théorie";

export const COURS_FOOT = {
  "ft-jeu": {
    cours: FT,
    titre: "1. Le football en EPS : terrain, but du jeu et attendus",
    md: `Le football est un sport collectif d'**opposition** où deux équipes cherchent à **marquer des buts** en faisant progresser le ballon, principalement au pied, et à **empêcher l'adversaire de marquer**.

### Le cadre de jeu au lycée

| Élément | Règle en cycle |
| --- | --- |
| Équipes | **7 contre 7** (6 joueurs de champ + 1 gardien), avec des remplaçants |
| Terrain | Terrain de **football à 7** |
| Règles | Celles du **football à 7 UNSS** |
| Ballon | Taille 5 |
| Durée | Matchs de 24 minutes à l'évaluation, changements toutes les 6 minutes |
| Équipes | Fixées par l'enseignant à partir de la 4e séance, de force équilibrée, mixtes |

### La règle de mixité

Un garçon ne peut prendre le ballon à une fille (non experte) qu'à sa **4e touche** de balle, sauf sur **interception** ou dans ses **13 derniers mètres**. Une fille peut récupérer le ballon dès la 1re touche adverse. Cette règle laisse aux joueuses le temps de contrôler, de regarder et de choisir, et pousse les garçons à jouer **avec** elles. Elle peut aussi s'appliquer aux garçons les plus en difficulté.

### Pourquoi le football à 7 ?

Un terrain plus petit et moins de joueurs, c'est **plus de ballons touchés**, des décisions **plus rapides** et une vraie nécessité de **jouer ensemble** : un joueur seul face à deux défenseurs perd vite le ballon.

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
| Hors-jeu | Signalé **dans la moitié de terrain adverse** seulement |
| Sortie en touche | Remise en jeu **au pied**, ballon arrêté sur la ligne ; adversaires à distance |
| Sortie en but (dernier touché par un attaquant) | **Sortie de but** par le gardien, au pied |
| Sortie en but (dernier touché par un défenseur) | **Corner** au pied, au coin du terrain |

### Le gardien

- Il est le seul à pouvoir jouer le ballon **à la main**, uniquement dans sa **surface de réparation**.
- Il **ne prend pas à la main** une passe volontaire au pied d'un partenaire.
- Il relance en moins de **6 secondes** environ.
- À l'évaluation, le poste de gardien **n'est pas évalué** : chacun est noté comme joueur de champ.

### Les fautes

| Faute | Sanction |
| --- | --- |
| **Main** volontaire (bras écarté du corps qui touche le ballon) | Coup franc |
| **Charge**, poussée, retenue (tirage de maillot), croche-pied | Coup franc direct |
| **Tacle glissé** (interdit en EPS, pour la sécurité) | Coup franc direct |
| Jeu dangereux (pied haut près de la tête d'un adversaire) | Coup franc indirect |
| Faute directe d'un défenseur dans sa surface de réparation | Penalty |
| Gardien qui joue à la main hors de sa surface | Coup franc pour l'adversaire |

Sur coup franc, les adversaires se placent à distance du ballon (selon les règles du foot à 7). Le **penalty** est tiré face au gardien, au point de penalty.

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

### Une organisation simple à 6 joueurs de champ

| Organisation | Principe |
| --- | --- |
| **2-3-1** | Deux défenseurs, trois milieux (dont deux sur les côtés), un attaquant : bonne occupation de la largeur, solide derrière |
| **3-2-1** | Trois défenseurs, deux milieux, un attaquant : bloc compact, idéal pour défendre et contre-attaquer |
| **2-2-2** | Deux lignes de deux et deux attaquants : plus offensif, demande des milieux très mobiles |

Les **remplaçants** entrent toutes les 6 minutes à l'évaluation : l'équipe prévoit ses rotations à l'avance.

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
- Décrire une organisation à 6 joueurs de champ et les principes de **défense** (couverture, fermer l'axe).

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

};

// =====================================================================
// BASKET-BALL (4 contre 4) — niveau Terminale
// =====================================================================
const BK = "Basket-ball — théorie";

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

};

