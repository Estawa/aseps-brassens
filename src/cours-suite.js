// =====================================================================
// Suite des contenus de cours : Course de durée et Escalade
// (même format que cours.jsx : Markdown simple)
// =====================================================================

const CD = "Course de durée — théorie";

export const COURS_COURSE = {
  "cd-intro": {
    cours: CD,
    titre: "1. Courir longtemps : de quoi parle-t-on ?",
    md: `En course de durée, l'objectif n'est pas d'aller le plus vite possible mais de **tenir une allure choisie, pendant un temps ou une distance donnés**, en fonction de ses capacités (sa VMA) et de son projet. Pour cela, il faut comprendre comment le corps produit l'énergie, comment le cœur et les poumons l'alimentent, et comment il progresse.

Ce cours répond à trois questions :

- **Comment le corps produit-il l'énergie ?** L'ATP, les filières énergétiques, les mitochondries.
- **Comment l'oxygène arrive-t-il aux muscles ?** La respiration, les alvéoles, le cœur.
- **Comment s'entraîner intelligemment ?** La VMA, les allures, la récupération, l'alimentation.

### Les règles de base en course de durée

1. Toujours s'échauffer (voir *Sport & Santé › L'échauffement*).
2. Partir plus lentement qu'on ne le pense : un départ trop rapide se paie à la fin.
3. Courir à **son** allure, calculée sur **sa** VMA, pas à celle des autres.
4. S'hydrater avant et après, et pendant si l'effort dépasse une heure.
5. Écouter les signaux d'alerte : douleur dans la poitrine, vertige, malaise = on s'arrête et on prévient l'enseignant.`,
  },

  "cd-atp": {
    cours: CD,
    titre: "2. L'ATP : le seul carburant du muscle",
    md: `Le muscle ne sait utiliser qu'une seule molécule pour se contracter : l'**ATP** (adénosine triphosphate). Quand le muscle se contracte, l'ATP se casse en **ADP + phosphate** et libère de l'énergie.

### Le problème : les réserves sont minuscules

Le muscle ne stocke qu'environ **2 à 3 secondes** d'ATP d'effort maximal. Pour continuer à bouger, il doit **régénérer** l'ATP en permanence, c'est-à-dire reconstruire de l'ATP à partir de l'ADP et du phosphate. Pour cela, il a trois solutions : ce sont les trois **filières énergétiques**.

| Pour régénérer l'ATP, le muscle utilise… | Filière | Besoin d'oxygène ? |
| --- | --- | --- |
| La **phosphocréatine** (PCr), stockée dans le muscle | Anaérobie alactique | Non |
| Le **glucose** (sucre), dégradé partiellement | Anaérobie lactique | Non |
| Le **glucose** et les **lipides** (graisses), dégradés complètement | Aérobie | Oui |

### Une image pour retenir

L'ATP, c'est l'argent liquide dans ton porte-monnaie : très peu, tout de suite disponible. La phosphocréatine, c'est la petite monnaie de la poche : vite récupérée mais vite épuisée. Le glucose sans oxygène, c'est le distributeur : rapide mais avec des frais (le lactate). Le système aérobie, c'est le salaire : il arrive plus lentement, mais en quantité presque illimitée.`,
  },

  "cd-filieres": {
    cours: CD,
    titre: "3. Les trois filières énergétiques",
    md: `Les trois filières fonctionnent **toujours en même temps**, mais l'une domine selon l'**intensité** et la **durée** de l'effort.

| Filière | Carburant | Puissance | Durée où elle domine | Déchets / limites | Exemple |
| --- | --- | --- | --- | --- | --- |
| **Anaérobie alactique** | Phosphocréatine | Très grande | 0 à 7-10 s | Aucun déchet ; réserves vite vides (récupérées en 2 à 3 min) | 60 m, saut, lancer |
| **Anaérobie lactique** | Glucose (glycogène) sans oxygène | Grande | 10 s à 1 min 30 environ | Production de lactate et d'ions H+ (acidité) qui « brûlent » les muscles | 200 m, 400 m |
| **Aérobie** | Glucose + lipides avec oxygène | Modérée | Au-delà de 2 à 3 min | Eau + CO2, rejetés par la respiration ; limitée par l'apport d'oxygène | Course de durée, 1 500 m et plus |

### Ce qu'il faut retenir pour la course de durée

- La course de durée est un effort **à dominante aérobie**.
- Plus l'allure est **lente**, plus le corps utilise de **lipides** ; plus elle est **rapide**, plus il utilise de **glucose**.
- Au départ d'une course, le système aérobie met **2 à 3 minutes** à se mettre en route : les filières anaérobies prennent le relais pendant ce temps. C'est pour cela qu'un départ progressif est essentiel.

### Puissance et capacité

- **Puissance** d'une filière : la quantité d'énergie qu'elle fournit **par seconde** (la vitesse maximale qu'elle permet).
- **Capacité** : la **quantité totale** d'énergie qu'elle peut fournir (la durée pendant laquelle elle peut fonctionner).
- La filière aérobie a la plus petite puissance mais une capacité presque illimitée.`,
  },

  "cd-mitochondries": {
    cours: CD,
    titre: "4. Les mitochondries : les centrales énergétiques",
    md: `Les **mitochondries** sont de petits organites présents dans les cellules musculaires. C'est **à l'intérieur des mitochondries** que fonctionne la filière aérobie : le glucose et les lipides y sont « brûlés » grâce à l'oxygène pour fabriquer de grandes quantités d'ATP.

### Ce qui se passe dans la mitochondrie

- **Entrées** : glucose ou acides gras (lipides) + oxygène (O2).
- **Sorties** : beaucoup d'ATP, de l'eau (H2O), du dioxyde de carbone (CO2) et de la chaleur.
- Une molécule de glucose dégradée avec oxygène fournit environ **15 fois plus d'ATP** que sans oxygène.

### L'effet de l'entraînement

| Adaptation | Conséquence |
| --- | --- |
| Plus de mitochondries, plus grosses | Le muscle produit plus d'ATP par la voie aérobie |
| Plus d'enzymes aérobies | Les réactions sont plus rapides |
| Plus de capillaires autour des fibres | L'oxygène arrive mieux jusqu'aux mitochondries |
| Meilleure utilisation des lipides | Les réserves de glucose durent plus longtemps |

Ces adaptations demandent du temps : on les observe après **6 à 8 semaines** d'entraînement régulier (2 à 3 séances par semaine).

Les **fibres lentes** (type I) sont riches en mitochondries : ce sont les fibres de l'endurance.`,
  },

  "cd-respiration": {
    cours: CD,
    titre: "5. La respiration et les alvéoles pulmonaires",
    md: `La respiration sert à **faire entrer l'oxygène** (O2) dans le sang et à **rejeter le dioxyde de carbone** (CO2) produit par les muscles.

### Le trajet de l'air

1. Nez ou bouche → trachée → bronches → bronchioles.
2. Les bronchioles se terminent par des millions de petits sacs : les **alvéoles pulmonaires** (environ 300 à 500 millions).
3. La paroi des alvéoles est extrêmement fine et entourée de **capillaires sanguins** : c'est là que se font les **échanges gazeux**.

### Les échanges gazeux dans les alvéoles

| Gaz | Sens | Pourquoi |
| --- | --- | --- |
| Oxygène (O2) | De l'alvéole vers le sang | L'air contient plus d'O2 que le sang qui revient des muscles |
| Dioxyde de carbone (CO2) | Du sang vers l'alvéole | Le sang qui revient des muscles est chargé de CO2, il est rejeté à l'expiration |

Dans le sang, l'oxygène est transporté par l'**hémoglobine** des globules rouges (qui contient du **fer**).

### La ventilation pendant l'effort

- **Au repos** : 12 à 16 respirations par minute, environ 6 à 8 litres d'air par minute.
- **À l'effort intense** : 40 respirations par minute ou plus, jusqu'à 100 litres d'air par minute et davantage.
- Les muscles de la respiration sont le **diaphragme** et les **muscles intercostaux**.

### Bien respirer en courant

- Respirer **par le nez et la bouche** dès que l'effort augmente.
- Insister sur l'**expiration** : bien vider l'air permet de mieux le renouveler.
- Chercher un **rythme régulier** calé sur la foulée (par exemple 2 foulées pour inspirer, 2 pour expirer à allure modérée).
- Le **point de côté** apparaît souvent quand on part trop vite ou qu'on a mangé juste avant : ralentir, expirer fort, appuyer sur la zone douloureuse.

### La VO2max

La **VO2max** est le volume maximal d'oxygène que le corps peut consommer par minute. C'est la « cylindrée » du moteur aérobie. La **VMA** est la vitesse de course atteinte quand on utilise sa VO2max.`,
  },

  "cd-coeur": {
    cours: CD,
    titre: "6. Le cœur et la fréquence cardiaque",
    md: `Le cœur est une **pompe** qui envoie le sang chargé d'oxygène vers les muscles. Plus l'effort est intense, plus il doit battre vite et fort.

### Les notions clés

| Notion | Définition | Repère |
| --- | --- | --- |
| Fréquence cardiaque (FC) | Nombre de battements par minute (bpm) | Se mesure au poignet ou au cou, sur 15 s × 4 |
| FC de repos | FC mesurée au réveil, allongé | 60 à 80 bpm chez un adolescent ; plus basse chez les sportifs d'endurance |
| FC maximale (FCmax) | FC la plus haute atteignable | Estimation : **220 − âge** (ex. 16 ans → environ 204 bpm) |
| Volume d'éjection systolique (VES) | Volume de sang éjecté à chaque battement | Environ 70 ml au repos, il augmente avec l'entraînement |
| Débit cardiaque | Volume de sang envoyé par minute | **Débit = FC × VES** (environ 5 L/min au repos, plus de 20 L/min à l'effort) |

### La fréquence cardiaque de réserve (méthode de Karvonen)

Pour viser une intensité précise, on utilise la **FC de réserve** = FCmax − FC de repos.

**FC cible = FC de repos + (FC de réserve × % d'intensité)**

Exemple : Lucas, 16 ans, FC de repos 65 bpm. FCmax ≈ 204, FC de réserve = 139. Pour courir à 70 % : 65 + 139 × 0,70 ≈ **162 bpm**.

### Les adaptations du cœur à l'entraînement

- Le cœur devient **plus gros et plus puissant** : il éjecte plus de sang à chaque battement.
- À effort égal, il bat **moins vite** : la FC de repos et la FC à l'effort baissent.
- Après l'effort, la FC **redescend plus vite** : c'est un bon indicateur de la forme (récupération cardiaque).

### La FC, un outil de suivi

- Une FC de repos **anormalement haute** au réveil peut signaler de la fatigue ou un début de maladie : on allège la séance.
- La FC à l'effort réagit avec un léger retard : sur les efforts courts, on se fie plutôt à l'allure et au ressenti.`,
  },

  "cd-lactate": {
    cours: CD,
    titre: "7. L'acide lactique (le lactate)",
    md: `Quand l'effort est intense et que l'oxygène ne suffit plus, le glucose est dégradé **sans oxygène** (filière anaérobie lactique). Cette dégradation produit du **lactate** et des **ions H+** qui rendent le muscle plus **acide**.

### Ce que provoque l'acidité

- Sensation de **brûlure** et de jambes « lourdes » ou « coupées ».
- Les fibres se contractent moins bien : la vitesse baisse malgré la volonté.
- La respiration s'accélère fortement pour rejeter le CO2.

### Les idées reçues à corriger

| Idée reçue | La réalité |
| --- | --- |
| « Le lactate est un déchet toxique » | Faux. Le lactate est **recyclé** : le cœur et les fibres lentes l'utilisent comme carburant, et le foie le retransforme en glucose. |
| « L'acide lactique provoque les courbatures » | Faux. Le lactate disparaît en **30 à 60 minutes** après l'effort. Les courbatures du lendemain viennent de petites **lésions musculaires**, surtout en descente et en excentrique. |
| « Il faut éviter de produire du lactate » | Faux. On en produit toujours un peu. L'entraînement apprend à le **tolérer** et à mieux l'**éliminer**. |

### Le seuil

Le **seuil** (ou seuil anaérobie) est l'intensité au-delà de laquelle le lactate s'accumule plus vite qu'il n'est éliminé. Il se situe environ entre **80 et 90 % de la VMA** chez un élève entraîné. En dessous, on peut tenir longtemps ; au-dessus, la fatigue arrive vite.

### Comment l'éliminer plus vite ?

Une **récupération active** (trot léger ou marche pendant 5 à 10 minutes) élimine le lactate plus rapidement qu'un arrêt complet.`,
  },

  "cd-vma": {
    cours: CD,
    titre: "8. La VMA : la mesurer et la développer",
    md: `La **VMA (vitesse maximale aérobie)** est la plus petite vitesse de course à laquelle on atteint sa consommation maximale d'oxygène (VO2max). On peut la tenir environ **4 à 7 minutes**. Elle s'exprime en **km/h** et sert de référence pour calculer toutes ses allures.

### Les repères chez les lycéens

| VMA | Interprétation |
| --- | --- |
| Moins de 10 km/h | À développer |
| 10 à 12 km/h | Moyenne |
| 12 à 14 km/h | Bonne |
| 14 à 16 km/h | Très bonne |
| Plus de 16 km/h | Excellente (coureurs entraînés) |

### Les tests pour l'estimer

| Test | Principe | Calcul de la VMA |
| --- | --- | --- |
| Demi-Cooper (6 min) | Parcourir la plus grande distance possible en 6 minutes | VMA (km/h) = distance (m) ÷ 100 |
| Cooper (12 min) | Parcourir la plus grande distance possible en 12 minutes | VMA ≈ distance (m) ÷ 200 (légèrement sous-estimée) |
| 4 × 3 min | 4 courses de 3 min à allure maximale tenable, récupération entre chaque | Distance d'une répétition (m) ÷ 50 = VMA de cette répétition ; on retient la meilleure |
| Test progressif (VAMEVAL, Léger-Boucher, Gacon) | La vitesse augmente par paliers jusqu'à ce qu'on ne puisse plus suivre | VMA = vitesse du dernier palier complètement réalisé |

### Développer sa VMA

On développe la VMA en courant **autour de 95 à 105 % de sa VMA**, en **fractionné** (alternance course / récupération) : on peut ainsi passer plus de temps à cette intensité qu'en une seule fois.

| Forme de travail | Exemple | Récupération |
| --- | --- | --- |
| Intermittent court | 30 s à 100 % / 30 s à 50 % (30-30), 2 séries de 8 à 10 | 3 à 5 min entre les séries |
| Intermittent moyen | 1 min à 95 % / 1 min de trot, 6 à 8 fois | Trot actif |
| Fractionné long | 3 min à 90-95 % / 1 min 30 à 2 min de trot, 4 à 5 fois | Trot actif |

**Principes :**

- 1 à 2 séances de VMA par semaine au maximum, jamais deux jours de suite.
- Toujours un échauffement complet et un retour au calme.
- Progresser en **augmentant la durée totale** de travail avant d'augmenter la vitesse.
- La VMA progresse de quelques pour cent en 6 à 8 semaines ; elle repose aussi sur une bonne **endurance de base** (courir lentement et longtemps).`,
  },

  "cd-allures": {
    cours: CD,
    titre: "9. Les allures de course et leur calcul",
    md: `Chaque allure correspond à un **pourcentage de la VMA** et à un objectif différent. Courir « à la bonne allure » est la compétence centrale de la course de durée.

### Les zones d'intensité

| Zone | % de la VMA | Ressenti (échelle de Borg 0-10) | Durée tenable | Objectif |
| --- | --- | --- | --- | --- |
| Récupération | 50 à 60 % | 1 à 2 : très facile | Très longue | Récupérer, s'échauffer |
| Endurance fondamentale | 60 à 75 % | 3 à 4 : facile, on peut parler | 30 min à plusieurs heures | Base aérobie, utilisation des lipides, santé |
| Endurance active | 75 à 85 % | 5 à 6 : soutenu, phrases courtes | 20 à 60 min | Améliorer l'endurance, approcher le seuil |
| Seuil | 85 à 90 % | 7 : difficile, quelques mots | 10 à 30 min | Repousser le seuil, tolérer le lactate |
| Puissance aérobie (VMA) | 90 à 105 % | 8 à 9 : très difficile | 4 à 7 min à 100 % | Développer la VMA |
| Vitesse | Plus de 105 % | 10 : maximal | Moins d'une minute | Vitesse, filières anaérobies |

### Les formules à connaître

**Vitesse visée (km/h) = VMA × % choisi**

**Distance (m) = vitesse (km/h) × temps (min) ÷ 60 × 1 000**

**Temps au kilomètre (min) = 60 ÷ vitesse (km/h)**

### Exemple chiffré

Inès a une VMA de 12 km/h. Elle veut courir 15 minutes à 80 % de sa VMA.

- Vitesse visée : 12 × 0,80 = **9,6 km/h**.
- Distance à parcourir : 9,6 × 15 ÷ 60 = 2,4 km, soit **2 400 m**.
- Temps au kilomètre : 60 ÷ 9,6 ≈ 6,25 min, soit **6 min 15 s**.
- Sur une piste de 400 m : 9,6 km/h = 160 m par minute, donc un tour en **2 min 30 s**.

### Tenir son allure

- Utiliser des **repères** : plots tous les 50 m, temps de passage au tour, bips sonores.
- Vérifier ses temps de passage dès le **premier tour** et corriger tout de suite.
- Associer l'allure à une **sensation** (respiration, Borg) : c'est elle qui permet de courir sans montre.`,
  },

  "cd-projet": {
    cours: CD,
    titre: "10. Construire son projet de course",
    md: `Comme en musculation, l'élève choisit un **mobile** puis construit des séances adaptées.

| Mobile | Zones de travail privilégiées | Exemple de séance |
| --- | --- | --- |
| **Santé, bien-être** | Endurance fondamentale | 2 × 15 min à 65-70 % VMA, 3 min de marche entre les deux |
| **Gestion du poids** | Endurance fondamentale et active, durée longue | 30 à 40 min continues à 65-75 % VMA |
| **Performance, progresser** | VMA et seuil | 2 × 8 × 30 s à 100 % / 30 s à 50 % |
| **Préparer une compétition (cross, 10 km)** | Seuil et allure de course | 3 × 6 min à 85 % VMA, 2 min de trot |

### La structure d'une séance

1. **Échauffement** (15 à 20 min) : footing lent, mobilité, gammes, accélérations progressives.
2. **Corps de séance** (20 à 40 min) : les blocs de course aux allures choisies.
3. **Retour au calme** (5 à 10 min) : trot puis marche, étirements doux.
4. **Bilan** : ressenti (Borg), allures tenues ou non, explications.

### Les principes d'entraînement

- **Progressivité** : augmenter d'abord la durée, puis l'intensité.
- **Alternance** : une séance intense est suivie d'une séance facile ou d'un jour de repos.
- **Régularité** : 2 à 3 séances par semaine valent mieux qu'une grosse séance occasionnelle.
- **Individualisation** : les allures sont calculées sur **sa** VMA.`,
  },

  "cd-recuperation": {
    cours: CD,
    titre: "11. La récupération",
    md: `C'est pendant la récupération que le corps s'adapte et devient plus performant : c'est la **surcompensation**. Sans récupération, l'entraînement fatigue sans faire progresser.

### Les différents temps de récupération

| Moment | Durée | Ce qui se passe | Comment bien récupérer |
| --- | --- | --- | --- |
| Pendant le fractionné | 30 s à 3 min | Recharge de la phosphocréatine, baisse de la FC | Trot léger ou marche selon la consigne |
| Juste après la séance | 10 à 30 min | Retour au calme, élimination du lactate | Trot puis marche, boire, étirements doux |
| Dans les heures suivantes | 2 à 24 h | Recharge du glycogène, réparation des fibres | Repas complet (glucides + protéines), hydratation |
| Entre deux séances | 24 à 72 h | Adaptations : mitochondries, cœur, capillaires | Sommeil, alternance des intensités |

### Le sommeil

- **8 à 10 heures par nuit** pour un adolescent.
- C'est pendant le sommeil profond que l'**hormone de croissance** répare les tissus.
- Les écrans tard le soir retardent l'endormissement et réduisent la qualité de la récupération.

### Les signes d'une récupération insuffisante

- FC de repos plus élevée que d'habitude au réveil.
- Jambes lourdes en permanence, baisse des performances.
- Irritabilité, sommeil perturbé, blessures à répétition.

Dans ce cas, on allège ou on arrête l'entraînement quelques jours.`,
  },

  "cd-nutrition": {
    cours: CD,
    titre: "12. Alimentation, hydratation et gestion du poids",
    md: `Les bases de l'alimentation du sportif sont détaillées dans *Sport & Santé › L'alimentation*. Voici ce qui est propre à la course de durée.

### Le carburant de l'endurance

- Les **glucides** (féculents, fruits) sont stockés sous forme de **glycogène** dans les muscles et le foie. Ce stock permet environ **1 h 30 d'effort soutenu**.
- Les **lipides** sont une réserve presque illimitée, mais on les utilise surtout aux allures modérées.
- Un repas riche en glucides **2 à 3 heures avant** la course permet de partir avec des réserves pleines.

### L'hydratation

- Une perte d'eau de seulement **2 % du poids du corps** fait déjà baisser la performance.
- Boire régulièrement dans la journée, un verre d'eau avant l'effort, puis après : la soif est un signal tardif.
- Pendant un effort de moins d'une heure, l'eau suffit ; pas besoin de boissons sucrées ou énergisantes.

### Comprendre la gestion du poids

Le poids dépend de la **balance énergétique** :

| Situation | Effet sur le poids |
| --- | --- |
| Énergie apportée par l'alimentation = énergie dépensée | Le poids reste stable |
| Énergie apportée > énergie dépensée | Le poids augmente (stockage sous forme de graisses) |
| Énergie apportée < énergie dépensée | Le poids diminue |

**Ce qui marche durablement :**

- Une **activité physique régulière** à allure modérée (endurance fondamentale), sur des durées longues : c'est à ces allures que le corps utilise le plus de graisses.
- Une alimentation **équilibrée et régulière**, avec 4 repas, sans grignotage ni boissons sucrées.
- Une évolution **lente et progressive** : c'est la seule qui se maintient dans le temps.

**Ce qu'il faut éviter :**

- Sauter des repas ou suivre un régime restrictif : on perd du **muscle**, de l'énergie, et le poids revient ensuite (effet « yo-yo »).
- Courir à jeun ou se priver avant une séance : risque de malaise.
- Se comparer aux autres ou à des images des réseaux sociaux.

Chez un adolescent en pleine croissance, toute question sur son poids se discute avec l'**infirmière scolaire** ou son **médecin**, qui peuvent donner des conseils adaptés.`,
  },

  "cd-connaissances": {
    cours: CD,
    titre: "13. Ce sur quoi tu peux être interrogé",
    md: `L'évaluation de fin de cycle comporte une partie **connaissances**. Les questions peuvent porter sur tout ce qui a été vu en cours et sur cette page. Tu dois être capable de :

### L'énergie

- Expliquer le rôle de l'**ATP** et pourquoi il faut la **régénérer**.
- Présenter les **3 filières énergétiques** : carburant, puissance, durée, déchets, exemples d'activités.
- Dire quelle filière domine dans une situation donnée et expliquer pourquoi la course de durée est **aérobie**.
- Expliquer le rôle des **mitochondries** et leurs adaptations à l'entraînement.

### Le transport de l'oxygène

- Décrire le trajet de l'air et les **échanges gazeux** dans les **alvéoles**.
- Expliquer le rôle de l'**hémoglobine** et définir la **VO2max**.
- Définir la **FC de repos**, la **FCmax**, le **débit cardiaque**, et calculer une **FC cible** (Karvonen).
- Citer les adaptations du **cœur** à l'entraînement.

### La fatigue et la récupération

- Expliquer d'où vient le **lactate**, ses effets, et corriger les **idées reçues**.
- Définir le **seuil**.
- Expliquer la **surcompensation** et les moyens de bien **récupérer**.

### La VMA et les allures

- Définir la **VMA**, citer des **tests** et calculer une VMA à partir d'un résultat.
- Connaître les **zones d'intensité** (% de VMA, ressenti, objectif).
- **Calculer** une vitesse, une distance, un temps au kilomètre ou un temps au tour à partir d'une VMA et d'un %.
- Expliquer comment **développer** sa VMA (fractionné).

### Le projet et la santé

- Construire ou critiquer une **séance** adaptée à un **mobile**.
- Expliquer les bases de l'**alimentation**, de l'**hydratation** et de la **balance énergétique**.

Le **vocabulaire** de la partie 14 doit être connu et utilisé correctement dans tes réponses.`,
  },

  "cd-lexique": {
    cours: CD,
    titre: "14. Lexique",
    md: `| Terme | Définition |
| --- | --- |
| ATP | Molécule qui fournit directement l'énergie à la contraction musculaire |
| Aérobie / anaérobie | Avec / sans utilisation d'oxygène |
| Glycogène | Forme de stockage du glucose dans les muscles et le foie |
| Mitochondrie | Organite de la cellule où l'ATP est produite avec de l'oxygène |
| Alvéole pulmonaire | Petit sac au bout des bronchioles où se font les échanges gazeux |
| Hémoglobine | Protéine des globules rouges qui transporte l'oxygène |
| VO2max | Volume maximal d'oxygène consommé par minute |
| VMA | Vitesse de course atteinte à la VO2max |
| FCmax | Fréquence cardiaque maximale (estimée par 220 − âge) |
| Débit cardiaque | Volume de sang éjecté par le cœur en une minute (FC × VES) |
| Lactate | Produit de la dégradation du glucose sans oxygène, recyclé par l'organisme |
| Seuil | Intensité au-delà de laquelle le lactate s'accumule |
| Fractionné | Alternance de périodes de course rapide et de récupération |
| Surcompensation | Amélioration des capacités pendant la récupération qui suit l'effort |
| Échelle de Borg | Échelle de ressenti de l'effort, de 0 (aucun effort) à 10 (maximal) |`,
  },
};

const ESC = "Escalade — théorie";
const EVAL = "Escalade — évaluation";

export const COURS_ESCALADE = {
  "esc-securite": {
    cours: ESC,
    titre: "1. La sécurité : les règles d'or",
    md: `En escalade, la sécurité repose sur **deux personnes** : le grimpeur et l'assureur. Une seule erreur peut avoir des conséquences graves : les vérifications sont **systématiques**, même pour les grimpeurs expérimentés.

### Les règles à connaître par cœur

1. On ne grimpe **jamais au-dessus de la hauteur d'une traversée** (mains à moins de 2 m du sol) sans être assuré.
2. On ne monte qu'après le **contrôle croisé** : le grimpeur vérifie l'assureur, l'assureur vérifie le grimpeur.
3. L'assureur ne **lâche jamais la corde côté freinage** (main aval).
4. L'assureur reste **attentif et près du mur**, sans parler à d'autres élèves, du début à la fin de la voie.
5. Personne ne stationne **sous un grimpeur** ni entre l'assureur et le mur.
6. Pas de bijoux, montre, chewing-gum ; cheveux longs attachés ; poches vides.
7. Toute anomalie (corde abîmée, mousqueton qui ne ferme pas, nœud douteux) = on **arrête** et on appelle l'enseignant.

### Le contrôle croisé (avant chaque montée)

| Je vérifie | Chez le grimpeur | Chez l'assureur |
| --- | --- | --- |
| Baudrier | Bien serré à la taille (au-dessus des hanches), boucles fermées, cuissards ajustés, rien de vrillé | Idem |
| Encordement / système | Nœud de huit **passé dans les deux pontets** du baudrier, bien serré, avec nœud d'arrêt | Système d'assurage installé dans le bon sens, mousqueton à vis **verrouillé** dans le pontet |
| Corde | Elle part du bon côté, sans nœud ni torsion | Bout de la corde noué (nœud en bout de corde) |

### Le langage commun

| Qui parle | Message | Signification |
| --- | --- | --- |
| Grimpeur | « Prêt ? » | Je suis prêt à partir, tu m'assures ? |
| Assureur | « Prêt, tu peux y aller ! » | Je t'assure, tu peux grimper |
| Grimpeur | « Sec ! » | Tends la corde, je veux me reposer ou je vais chuter |
| Grimpeur | « Du mou ! » | Donne-moi de la corde |
| Grimpeur | « Avale ! » | Il y a trop de corde, reprends-la |
| Grimpeur | « Relais ! » | Je suis en haut, je vais descendre |
| Assureur | « Je te descends » / « Lâche ! » | Mets-toi en position assise, je te descends |`,
  },

  "esc-materiel": {
    cours: ESC,
    titre: "2. Le matériel et l'installation",
    md: `### Le matériel de base

| Matériel | Rôle | À vérifier |
| --- | --- | --- |
| Baudrier | Relie le corps à la corde | Sangles non usées ou coupées, boucles en bon état |
| Corde dynamique | Absorbe l'énergie de la chute en s'allongeant | Pas de zone écrasée, gaine non abîmée ; ne pas marcher dessus |
| Système d'assurage (tube, plaquette, système autobloquant) | Crée le freinage de la corde | Sens d'installation, pas de fissure ni d'usure profonde |
| Mousqueton à vis | Relie le système d'assurage au baudrier | Doigt qui se ferme seul, vis **verrouillée** |
| Dégaines | Deux mousquetons reliés par une sangle, pour grimper en tête | Doigts qui se ferment, sangle en bon état |
| Chaussons | Adhérence et précision des pieds | Bien ajustés ; on ne marche pas avec en dehors du tapis |

### S'installer dans le baudrier

1. Poser le baudrier au sol, **ceinture devant**, pontet vers soi, sans torsion.
2. Enfiler les jambes dans les cuissards, remonter la ceinture **au-dessus des os des hanches**.
3. Serrer la ceinture : on ne doit pas pouvoir la faire descendre sous les hanches (une main à plat peut juste passer).
4. Ajuster les cuissards sans les serrer à l'excès.
5. Vérifier qu'aucune sangle n'est vrillée et que toutes les boucles sont fermées.

### Lover et ranger la corde

- On **love** la corde en anneaux réguliers (ou « en papillon » sur les épaules), sans créer de torsions.
- Le bout de la corde reste **toujours noué** quand elle est au pied du mur.
- La corde se range **sèche, à l'abri du soleil et des produits**, jamais au sol dans le passage.`,
  },

  "esc-noeuds": {
    cours: ESC,
    titre: "3. Les nœuds",
    md: `Un nœud mal fait est l'une des principales causes d'accident. Chaque nœud se réalise **en entier, sans être interrompu**, puis se **vérifie** par le partenaire.

| Nœud | Utilisation | Comment le reconnaître / le vérifier |
| --- | --- | --- |
| **Nœud de huit simple** | Première étape de l'encordement, nœud en bout de corde | Un « 8 » bien formé, à environ 80 cm du bout de la corde |
| **Nœud de huit tressé (en double)** | Encordement du grimpeur | Corde passée dans les **deux pontets** du baudrier ; le « 8 » est entièrement doublé, brins parallèles, sans croisement ; boucle de la taille d'un poing ; bout libre d'au moins 10 à 15 cm |
| **Nœud d'arrêt** (nœud du pendu / demi-pêcheur double) | Bloque le bout libre du nœud de huit | Serré au contact du huit, 2 à 3 tours bien rangés |
| **Nœud de vache** | Se longer (s'attacher à un point fixe avec une sangle ou la corde) | Une boucle qui se serre sur le mousqueton ; réservé aux situations de relais |
| **Nœud en bout de corde** | Empêche la corde de filer dans le système d'assurage | Nœud volumineux au bout de la corde, toujours présent |

### Réaliser le nœud de huit tressé

1. Faire un **huit simple** à environ un bras et demi du bout de la corde.
2. Passer le bout de la corde dans le **pontet** (ou les deux points d'encordement) du baudrier, de bas en haut.
3. Repasser le bout dans le huit en **suivant exactement** le chemin du premier brin, en sens inverse.
4. **Serrer** chaque paire de brins, régler la taille de la boucle.
5. Réaliser le **nœud d'arrêt** avec le bout restant.
6. Faire vérifier par l'assureur : on compte les **paires de brins** (5 paires bien parallèles).`,
  },

  "esc-assurage": {
    cours: ESC,
    titre: "4. L'assurage",
    md: `L'assureur tient la vie du grimpeur entre ses mains : la **main aval** (côté freinage, sous le système) ne lâche **jamais** la corde.

### La position de l'assureur

- Placé **près du mur**, légèrement décalé de l'axe de la voie (pour ne pas recevoir le grimpeur en cas de chute).
- Pieds écartés, un pied en avant, genoux légèrement fléchis, **regard sur le grimpeur**.
- Un **contre-assureur** peut tenir la corde derrière l'assureur (débutants, grande différence de poids).

### L'assurage en 5 temps (en moulinette)

| Temps | Main amont (au-dessus du système) | Main aval (sous le système) |
| --- | --- | --- |
| 1. Tirer | Tire la corde vers le bas, vers le système | Tient la corde |
| 2. Avaler | Accompagne | Ravale la corde vers le haut à travers le système |
| 3. Bloquer | — | Redescend la corde en position de blocage (vers le bas, contre la cuisse) |
| 4. Venir prendre | Vient saisir la corde **sous la main aval** | Reste bloquée |
| 5. Remonter | Tient la corde sous la main aval | Glisse vers le haut, **contre le système**, sans jamais lâcher |

On recommence le cycle aussi souvent que le grimpeur monte. Entre deux cycles, la corde reste **toujours en position de blocage**.

### La descente

1. Le grimpeur dit « Relais ! » ; l'assureur **avale** pour tendre la corde (« Sec »).
2. Le grimpeur s'assoit dans son baudrier, **jambes tendues** et écartées, pieds à plat sur le mur, mains sur la corde de son côté.
3. L'assureur fait glisser la corde **lentement et régulièrement**, les deux mains sur le brin de freinage, en contrôlant la vitesse.

### Les différentes façons de grimper

| Mode | Principe | Niveau |
| --- | --- | --- |
| **Moulinette (M)** | La corde passe déjà en haut de la voie ; le grimpeur est assuré par le haut | Débutant |
| **Moulitête (MT)** | Le grimpeur est assuré en moulinette et mousquetonne en même temps une seconde corde comme en tête | Intermédiaire : apprentissage de la tête en sécurité |
| **Tête (T)** | Le grimpeur monte la corde avec lui et la passe dans les dégaines au fur et à mesure | Confirmé |

### L'assurage en tête

- L'assureur **donne du mou** au moment où le grimpeur mousquetonne, puis le **reprend** juste après.
- Il garde une corde **ni trop tendue** (le grimpeur est gêné) **ni trop molle** (chute plus longue).
- En cas de chute, il bloque fermement ; un léger saut vers le mur peut **amortir** la chute (assurage dynamique), sous contrôle de l'enseignant.`,
  },

  "esc-corps": {
    cours: ESC,
    titre: "5. Les positions du corps et la technique",
    md: `En escalade, ce sont **les jambes qui poussent** et **les bras qui maintiennent l'équilibre**. Le grimpeur efficace économise ses bras en plaçant bien ses pieds et son bassin.

### Les grands principes

- **Trois points d'appui** : on ne bouge qu'un membre à la fois, les trois autres restent en appui.
- **Bras tendus** : on se suspend au squelette plutôt qu'aux muscles ; on plie les bras seulement pour passer un mouvement.
- **Poids sur les pieds** : on pousse avec les jambes pour monter, comme dans un escalier.
- **Bassin proche du mur** : le poids passe au-dessus des pieds, les bras se fatiguent moins.
- **Regarder ses pieds** : on pose le pied précisément, puis on ne le bouge plus.
- **Respirer** et se reposer dès qu'une bonne prise le permet (secouer les bras l'un après l'autre).

### Les positions et mouvements de base

| Technique | Description | Quand l'utiliser |
| --- | --- | --- |
| Triangle de stabilité | Deux appuis de pieds écartés et une main, ou l'inverse, formant un triangle | Pour lâcher une main en équilibre (mousquetonner, se reposer) |
| Pied en carre interne | Appui sur le bord intérieur du chausson | Mouvements de face, déplacements latéraux |
| Pied en carre externe | Appui sur le bord extérieur du chausson | Mouvements de profil, hanche contre le mur |
| Pointe | Appui sur le bout du chausson | Petites prises, gagner en hauteur |
| Grimpe de profil (lolotte) | Hanche contre le mur, genou tourné vers l'intérieur | Dévers et grands mouvements : on gagne de l'allonge |
| Opposition | Pousser et tirer dans des directions opposées (ex. dülfer : mains qui tirent, pieds qui poussent) | Fissures, arêtes, prises verticales |
| Changement de pied / de main | Libérer une prise pour l'autre membre | Quand on arrive sur une prise avec le mauvais pied ou la mauvaise main |

### Les façons de tenir une prise

| Préhension | Description |
| --- | --- |
| Main arquée | Doigts repliés sur une petite prise (réglette) : puissante mais sollicite les doigts |
| Main tendue | Doigts allongés sur une prise arrondie (plat) : plus économique |
| Pince | Pouce en opposition aux autres doigts, pour serrer une prise |
| Inversée | Prise tenue par en dessous, paume vers le haut, avec les pieds qui poussent |
| Bi-doigt, mono-doigt | Petits trous : à éviter chez les débutants (risque pour les tendons) |`,
  },

  "esc-voie": {
    cours: ESC,
    titre: "6. Décrypter une voie et sa difficulté",
    md: `Avant de grimper, on **lit la voie** depuis le sol. Un bon décryptage permet de choisir une voie adaptée à son niveau et d'économiser ses forces.

### La cotation française

La difficulté d'une voie est indiquée par une **cotation** : un chiffre (3 à 9), une lettre (a, b, c) et parfois un « + ». Plus la cotation est élevée, plus la voie est difficile.

| Cotation | Niveau | Caractéristiques |
| --- | --- | --- |
| 3 à 4c | Débutant | Grosses prises, mur vertical ou peu raide, nombreuses possibilités |
| 5a à 5c | Initié | Prises plus petites ou plus espacées, quelques passages techniques |
| 6a à 6c | Confirmé | Mur raide ou dévers, prises petites, enchaînement de mouvements exigeants |
| 7a et plus | Expert | Très peu de lycéens ; demande un entraînement spécifique |

Une même cotation peut sembler plus facile ou plus difficile selon la taille du grimpeur, sa morphologie et son style.

### Ce qui rend une voie difficile

| Facteur | Plus facile | Plus difficile |
| --- | --- | --- |
| Inclinaison | Dalle (moins que vertical) ou vertical | Dévers, toit |
| Taille des prises | Grosses prises, « bacs » | Petites réglettes, plats, trous |
| Écartement | Prises proches | Prises éloignées, grands mouvements |
| Nombre de prises | Beaucoup de choix | Peu de prises, une seule solution |
| Continuité | Repos réguliers | Passages longs sans repos |
| Mousquetonnage (en tête) | Dégaines sur de bonnes prises | Dégaines placées sur des passages durs |

### Lire une voie depuis le sol

1. Repérer la **couleur** (ou les couleurs) de prises autorisées et la **ligne** générale de la voie.
2. Identifier les **repos** (bonnes prises où lâcher une main) et le ou les **passages clés** (les plus durs).
3. Prévoir l'**ordre des mains** sur les premiers mouvements (main droite ou gauche ?).
4. En tête : repérer d'où l'on va **mousquetonner** chaque dégaine.
5. Mimer les mouvements au sol, puis grimper en se fiant à son plan, en restant prêt à l'adapter.

### Voies à plusieurs couleurs

Sur une même voie, on peut grimper avec **toutes les couleurs** de prises (plus facile), avec **moins de couleurs**, ou avec **une seule couleur** (plus difficile). Retirer des couleurs augmente la difficulté sans changer de mur.`,
  },

  "esc-connaissances": {
    cours: ESC,
    titre: "7. Ce sur quoi tu peux être interrogé",
    md: `L'évaluation de fin de cycle comporte une partie **connaissances**. Les questions peuvent porter sur tout ce qui a été vu en cours et sur cette page. Tu dois être capable de :

### La sécurité et le matériel

- Citer les **règles de sécurité** de la salle et expliquer leur raison d'être.
- Réaliser et expliquer le **contrôle croisé** (grimpeur et assureur).
- Connaître le rôle de chaque **matériel** et ce qu'il faut vérifier.
- Expliquer comment **s'installer dans le baudrier**, lover et ranger la corde.
- Utiliser et comprendre le **langage commun** (« Sec », « Du mou », « Avale », « Relais »…).

### Les nœuds

- Réaliser et vérifier un **nœud de huit tressé** avec **nœud d'arrêt**.
- Dire à quoi servent le **nœud de vache** et le **nœud en bout de corde**.

### L'assurage

- Décrire la **position** de l'assureur et le rôle du contre-assureur.
- Expliquer l'**assurage en 5 temps** et la règle de la main aval.
- Décrire une **descente** en sécurité.
- Différencier la **moulinette**, la **moulitête** et la **tête**.

### La technique et la voie

- Expliquer les grands principes : **3 points d'appui, bras tendus, poids sur les pieds, bassin près du mur**.
- Nommer et reconnaître les **positions** (carres, pointe, profil, opposition…) et les **préhensions**.
- Expliquer la **cotation** d'une voie et les **facteurs** qui la rendent difficile.
- Décrire comment **lire une voie** avant de grimper.

### L'évaluation

- Connaître le **fonctionnement du tableau de performance** et les **codes** utilisés.`,
  },

  "esc-lexique": {
    cours: ESC,
    titre: "8. Lexique",
    md: `| Terme | Définition |
| --- | --- |
| Assureur | Personne qui gère la corde pour protéger le grimpeur |
| Contre-assureur | Personne qui tient la corde derrière l'assureur pour plus de sécurité |
| Pontet | Anneau du baudrier où l'on installe le mousqueton d'assurage |
| Dégaine | Deux mousquetons reliés par une sangle, utilisée en tête |
| Mousquetonner | Passer la corde dans le mousqueton d'une dégaine |
| Relais | Point d'ancrage en haut de la voie |
| Moulinette | Grimpe avec la corde déjà passée au sommet de la voie |
| Tête | Grimpe en emportant la corde et en la mousquetonnant au fur et à mesure |
| Moulitête | Grimpe en moulinette tout en mousquetonnant une seconde corde comme en tête |
| Cotation | Indication de la difficulté d'une voie (ex. 5b) |
| Dalle | Mur moins raide que la verticale |
| Dévers | Mur qui penche vers le grimpeur, plus raide que la verticale |
| Réglette | Petite prise plate et étroite |
| Bac | Grosse prise facile à tenir |
| Retour au sol | Chute jusqu'au sol, à éviter absolument par un assurage attentif |`,
  },

  // --------------------------- Escalade : évaluation ---------------------------
  "esc-eval-principe": {
    cours: EVAL,
    titre: "1. Comment est construite l'évaluation",
    md: `L'évaluation de l'escalade prend en compte **ce que tu réalises comme grimpeur**, **ta qualité d'assureur** et **ce que tu sais**. Elle se construit tout au long du cycle.

| Partie | Ce qui est évalué | Comment |
| --- | --- | --- |
| **Performance** | Les voies réussies devant l'enseignant : difficulté, nombre de couleurs, mode de grimpe | Observée directement par l'enseignant, à ta demande |
| **Assurage** | La sécurité et la qualité de l'assurage d'un camarade | Observé par l'enseignant pendant les passages |
| **Suivi de cycle** | Tes réalisations au fil des séances (voies, rôles, modes) | Déclarées par toi dans l'application Escalade Pro |
| **Connaissances** | Sécurité, nœuds, assurage, technique, lecture de voie | Questions (voir la partie 7 de la Théorie) |

### Ce qui fait monter la note de performance

- Une voie de **cotation plus élevée**.
- Une voie grimpée avec **moins de couleurs** de prises (une seule couleur = plus difficile).
- Un **mode** plus exigeant : moulinette → moulitête → tête.
- Une voie réussie **jusqu'en haut** ; sinon, la hauteur atteinte (dernière dégaine) est prise en compte.

### Pour être évalué

1. Choisis une voie adaptée à ton niveau et **décrypte-la** au sol.
2. Fais ton **contrôle croisé** avec ton assureur.
3. **Appelle l'enseignant** avant de partir : seules les voies observées comptent pour la performance.
4. Grimpe, puis inverse les rôles : ton camarade est évalué et toi tu es observé comme **assureur**.

Le barème précis (points par voie, par couleur et par mode) est présenté par ton enseignant en début de cycle.`,
  },

  "esc-eval-tableau": {
    cours: EVAL,
    titre: "2. Le tableau de performance",
    md: `Le **tableau de performance** récapitule, pour chaque élève, les voies réalisées pendant le cycle. Il existe en deux versions dans l'application Escalade Pro :

- le **tableau de suivi** : rempli par l'élève après chaque montée (note de suivi de cycle) ;
- le **tableau de performance observée** : rempli par l'enseignant quand il t'observe (note de performance).

### Comment le lire

| Élément | Signification |
| --- | --- |
| **Lignes** | Les élèves, regroupés par binôme ou trinôme |
| **Colonnes** | Les voies de la salle (numérotées), chacune avec sa cotation |
| **Sous-colonnes** | Le nombre de couleurs de prises utilisées sur la voie (de toutes les couleurs à une seule) |
| **Case** | Ce que l'élève a réalisé sur cette voie, avec cette difficulté |

### Les codes dans une case

| Code | Signification |
| --- | --- |
| **T** | Grimpé en **tête** |
| **MT** | Grimpé en **moulitête** |
| **M** | Grimpé en **moulinette** |
| **A** devant le code | Rôle d'**assureur** (ex. AM = a assuré en moulinette) |
| **Chiffre** après le code | Montée **non terminée** : numéro de la dernière dégaine atteinte |
| Pas de chiffre | Voie **réussie jusqu'au relais** |

### Exemples

| Case | Lecture |
| --- | --- |
| T | Voie réussie en tête, jusqu'en haut |
| M5 | Grimpé en moulinette, arrêté à la 5e dégaine |
| T3/AMT4 | A grimpé en tête jusqu'à la 3e dégaine, et a assuré un camarade en moulitête qui s'est arrêté à la 4e dégaine |
| AT | A assuré un camarade en tête qui a réussi la voie |

### Conseils pour progresser dans le tableau

- Réussis d'abord une voie **en moulinette** avec toutes les couleurs, puis **retire des couleurs** ou passe en **moulitête**.
- Ne reste pas sur la même voie : vise des cotations **légèrement supérieures** à ton niveau.
- Remplis ton tableau de suivi **après chaque montée**, avant d'oublier.`,
  },
};

// =====================================================================
// VOLLEY-BALL (4 contre 4, terrain de 7 m × 7 m par camp) — niveau Terminale
// =====================================================================
const VB = "Volley-ball — théorie";
const VBE = "Volley-ball — évaluation";

export const COURS_VOLLEY = {
  "vb-jeu": {
    cours: VB,
    titre: "1. Le 4 contre 4 : terrain, but du jeu et attendus",
    md: `Le volley-ball est un sport collectif **sans contact** où deux équipes s'opposent de part et d'autre d'un filet. Le but est de **faire tomber le ballon dans le camp adverse** et d'**empêcher qu'il tombe dans le sien**, en **trois touches maximum** par équipe.

### Le cadre de jeu au lycée

| Élément | Règle en cycle |
| --- | --- |
| Équipes | 4 joueurs sur le terrain (+ remplaçants éventuels) |
| Terrain | **7 m × 7 m par camp** (14 m × 7 m au total), lignes comprises dans le terrain |
| Filet | Hauteur fixée par l'enseignant (environ 2,10 m à 2,24 m en mixte) |
| Ballon | Ballon de volley taille 5 |
| Durée | Sets en points (ex. 15 ou 25 points) ou au temps, selon l'organisation du cycle |

### Pourquoi le 4 contre 4 ?

Le terrain réduit et l'effectif à 4 obligent chaque joueur à **toucher beaucoup de ballons**, à **communiquer** et à **occuper un rôle précis** (passeur, attaquant, défenseur), tout en laissant des espaces à exploiter pour gagner le point.

### Ce qu'on attend d'un élève de Terminale

- **Construire** des attaques en 3 touches : réception (ou défense) → passe → attaque, le plus souvent possible.
- Utiliser une **attaque efficace** : smash ou attaque placée vers les zones libres.
- **Servir** de façon sûre et utile : service haut (tennis) ou service bas placé dans les zones faibles.
- **S'organiser** en défense (bloc, défenseurs, couverture) et changer rapidement de statut (attaquant ↔ défenseur).
- **Analyser le rapport de force** et adapter son projet de jeu à l'adversaire.
- **Connaître et appliquer le règlement**, assurer l'arbitrage et le rôle de coach ou d'observateur.`,
  },

  "vb-reglement": {
    cours: VB,
    titre: "2. Le règlement",
    md: `### Marquer les points

- Chaque échange rapporte **un point** à l'équipe qui le gagne, qu'elle ait servi ou non (**tie-break / rally point**).
- L'équipe qui gagne le point **obtient le service** suivant.
- Un set se gagne avec **2 points d'écart** (ex. 25-23, 16-14).

### Le service

| Règle | Détail |
| --- | --- |
| Lieu | Derrière la **ligne de fond**, sans mordre la ligne au moment de la frappe |
| Délai | Dans les **8 secondes** après le coup de sifflet de l'arbitre |
| Geste | Ballon lâché ou lancé, frappé **d'une seule main** ou du bras |
| Ballon | Peut toucher le filet s'il passe dans le camp adverse (règle actuelle) |
| Rotation | Quand une équipe **reprend le service**, ses joueurs **tournent d'une place dans le sens des aiguilles d'une montre** ; le nouveau serveur est celui qui arrive à la place de service |

### Les fautes de jeu

| Faute | Définition |
| --- | --- |
| Quatre touches | Plus de 3 touches de balle par l'équipe avant de renvoyer (le contre ne compte pas comme une touche) |
| Double touche | Un joueur touche le ballon deux fois de suite (sauf au contre, et sur la 1re touche d'équipe si l'action est simultanée et non intentionnelle) |
| Ballon tenu (porté) | Le ballon est bloqué, accompagné ou lancé au lieu d'être frappé |
| Filet | Un joueur touche le filet (bande du haut) pendant une action de jeu |
| Pénétration | Le pied dépasse **entièrement** la ligne centrale, ou le joueur gêne l'adversaire dans son camp |
| Ballon dehors | Le ballon tombe hors des lignes, touche le plafond, un mur, ou passe hors des antennes |
| Faute de position | Au moment du service, un joueur n'est pas à sa place dans l'ordre de rotation |
| Contre ou attaque sur le service | Interdit de contrer ou d'attaquer directement le service adverse au-dessus du filet |

### Ce qui est autorisé

- Toucher le ballon avec **n'importe quelle partie du corps**, y compris les pieds.
- **Passer la main au-dessus du filet** au contre, si l'adversaire a joué son attaque.
- Aller chercher un ballon **hors du terrain** (sauf dans le camp adverse sous le filet).

### L'arbitrage

L'arbitre siffle le début de chaque échange et chaque faute, puis indique avec le bras le **côté qui gagne le point** et la **faute commise** (gestes à connaître : ballon dedans, dehors, quatre touches, ballon tenu, filet, double touche).`,
  },

  "vb-technique": {
    cours: VB,
    titre: "3. Les gestes techniques",
    md: `| Geste | Quand l'utiliser | Points clés |
| --- | --- | --- |
| **Manchette** | Réception de service, défense sur attaque, ballons bas | Se placer sous et derrière le ballon, **plan de frappe** des avant-bras joints et tendus, jambes fléchies qui poussent, on oriente les épaules vers la cible ; on ne balance pas les bras |
| **Passe haute (à deux mains)** | 2e touche (passe à l'attaquant), ballons hauts | Mains en « coupe » au-dessus du front, contact du bout des doigts, extension simultanée des jambes et des bras, ballon **haut** et près du filet |
| **Service bas** | Service sûr | Pied opposé au bras de frappe devant, ballon tenu à hauteur de hanche, frappe avec le talon de la main, bras tendu de bas en haut |
| **Service haut (tennis)** | Service plus rapide et tendu, plus difficile à recevoir | Lancer **devant l'épaule** de frappe, à environ 1 m au-dessus de la tête ; coude haut, frappe main ouverte et ferme au point le plus haut ; viser une zone |
| **Attaque / smash** | 3e touche, ballon haut et près du filet | **Course d'élan** de 2 à 3 pas (le dernier pas long, appel deux pieds), bras armés en arrière puis lancés vers le haut, **frappe main ouverte au point le plus haut**, devant soi, poignet qui « enroule » le ballon vers le bas |
| **Attaque placée (feinte)** | Quand le bloc est en place ou la défense bien placée | Ballon poussé du bout des doigts derrière le bloc ou dans une zone vide, sans le tenir |
| **Contre (bloc)** | Face à un attaquant adverse au filet | Face au filet, mains à hauteur des épaules, saut **légèrement après** l'attaquant, bras tendus **au-dessus et au-delà du filet**, mains ouvertes et fermes, sans toucher le filet |
| **Plongeon / roulade** | Ballon de défense éloigné | Réservé aux joueurs à l'aise ; l'important est de jouer le ballon haut vers son camp |

### Les critères de qualité à viser

- **Réception** : ballon haut, au centre du terrain, à environ **1 m du filet**, jouable par le passeur.
- **Passe** : ballon **haut** (au moins 1 m au-dessus du filet), à **0,5 à 1 m du filet**, dans la zone de l'attaquant.
- **Attaque** : ballon frappé **au-dessus du filet**, vers le bas, dans une zone libre ou sur un joueur en difficulté.`,
  },

  "vb-roles": {
    cours: VB,
    titre: "4. Les rôles : passeur, attaquants, arrières",
    md: `En 4 contre 4, chaque joueur a un rôle principal, mais **tout le monde défend et tout le monde peut attaquer**.

| Rôle | Mission | Qualités recherchées |
| --- | --- | --- |
| **Passeur** | Joue la **2e touche** : transforme la réception en ballon d'attaque haut et précis ; choisit l'attaquant | Lecture du jeu, déplacements rapides, passe haute précise, communication (« Je prends ! », annonce de l'attaquant) |
| **Attaquants (avants)** | Jouent la **3e touche** au filet (smash, attaque placée) ; forment le **contre** en défense | Détente, timing, frappe, lecture du contre adverse |
| **Arrières (défenseurs)** | Assurent la **réception** du service et la **défense** sur les attaques ; peuvent attaquer depuis le fond | Placement, manchette, anticipation, couverture |

### Les dispositions de base

| Phase | Organisation conseillée |
| --- | --- |
| **Réception du service** | **3 réceptionneurs** en ligne ou en arc de cercle à environ 3-4 m du filet, le **passeur hors de la réception**, près du filet (centre-droit) |
| **Attaque** | Le passeur au filet, **1 ou 2 attaquants** prêts à prendre leur élan depuis l'arrière, un joueur en **couverture** de l'attaquant (pour récupérer un ballon contré) |
| **Défense** | **1 contreur** face à l'attaquant adverse (2 si l'attaque est forte), **2 à 3 défenseurs** répartis dans les zones non couvertes par le contre (fond de court et diagonale) |

### Le passeur pénétrant

Quand le passeur est en position arrière au moment du service, il **« pénètre »** vers le filet dès que le service est frappé, pour être prêt à jouer la 2e touche. Les 3 autres joueurs assurent la réception.

### La communication

- On **annonce** qui prend le ballon (« J'ai ! », « Moi ! ») pour éviter les hésitations.
- Le passeur annonce son **attaquant** ; les attaquants **appellent** le ballon.
- Après chaque point, l'équipe se **regroupe** et se rappelle le plan de jeu.`,
  },

  "vb-tactique": {
    cours: VB,
    titre: "5. La tactique : attaquer, défendre, analyser le rapport de force",
    md: `### Gagner le point en attaque : créer la rupture

- **Viser les espaces libres** : fond de court, zones entre deux joueurs, zone avant si les défenseurs sont reculés.
- **Viser le joueur en difficulté** (le moins à l'aise en réception) et le **passeur**, pour l'empêcher de jouer la 2e touche.
- **Varier** : alterner smash puissant et attaque placée derrière le contre.
- **Attaquer en 3 touches** le plus souvent possible : un renvoi en 1re ou 2e touche n'est utile que s'il surprend l'adversaire (ballon « deuxième main » du passeur, par exemple).
- **Accélérer** : une passe plus rapide réduit le temps de formation du contre adverse.

### Le service, première arme d'attaque

| Objectif | Moyen |
| --- | --- |
| Ne pas faire de faute | Service sûr (bas ou haut maîtrisé) dans les moments importants |
| Gêner la réception | Viser une **zone faible** (entre deux réceptionneurs, fond de court, le joueur fragile) |
| Empêcher l'attaque | Servir sur le **meilleur attaquant** ou sur le **passeur pénétrant** pour qu'il doive réceptionner |

### Défendre : protéger son terrain

- **Contre** placé face au bras d'attaque de l'adversaire : il ferme une zone, les défenseurs couvrent les autres.
- **Défenseurs bas et en appui**, prêts à jouer la manchette vers le **centre du terrain**, haut.
- **Couverture** de l'attaquant de son équipe : un joueur proche pour récupérer le ballon renvoyé par le contre.
- **Changement de statut rapide** : dès que l'adversaire renvoie, on se replace en défense ; dès qu'on récupère le ballon, on construit l'attaque.

### Analyser le rapport de force

Avant et pendant le match, l'équipe observe l'adversaire et ajuste son projet de jeu :

| Question | Exemple d'adaptation |
| --- | --- |
| Qui est le meilleur attaquant adverse ? | On le contre systématiquement, on lui sert dessus |
| Où sont les zones faibles adverses ? | On y oriente services et attaques |
| Quel est notre point fort ? | On construit les attaques pour notre meilleur attaquant |
| Sommes-nous en difficulté en réception ? | On simplifie : réception haute au centre, passe haute, attaque placée |

Le **temps mort** permet de réajuster le plan : le coach donne **une ou deux consignes simples**.`,
  },

  "vb-connaissances": {
    cours: VB,
    titre: "6. Ce sur quoi tu peux être interrogé",
    md: `Tu dois être capable de :

### Le règlement et l'arbitrage

- Expliquer le **décompte des points**, le gain d'un set et le principe du **service** et de la **rotation**.
- Citer et reconnaître les **fautes** (4 touches, double touche, ballon tenu, filet, pénétration, ballon dehors, faute de position).
- **Arbitrer** un match : coup de sifflet, gestes de l'arbitre, tenue du score.

### La technique

- Décrire les **points clés** de la manchette, de la passe haute, du service bas et haut, de l'attaque (smash) et du contre.
- Dire **quel geste** utiliser selon la trajectoire et la situation.

### Les rôles et l'organisation

- Expliquer le rôle du **passeur**, des **attaquants** et des **arrières**.
- Décrire une organisation de **réception**, d'**attaque** (avec couverture) et de **défense** (contre + défenseurs).
- Expliquer le principe du **passeur pénétrant**.

### La tactique

- Citer des moyens de **créer la rupture** (zones libres, joueur en difficulté, variation des attaques).
- Expliquer comment utiliser le **service** pour gêner l'adversaire.
- **Analyser un rapport de force** à partir d'observations et proposer un **projet de jeu** adapté.

### Les rôles sociaux

- Tenir le rôle d'**arbitre**, de **coach** et d'**observateur** (remplir une fiche d'observation, donner des conseils).`,
  },

  "vb-lexique": {
    cours: VB,
    titre: "7. Lexique",
    md: `| Terme | Définition |
| --- | --- |
| Manchette | Frappe du ballon avec les avant-bras joints |
| Passe haute | Frappe du ballon du bout des doigts, au-dessus du front |
| Smash | Attaque frappée fort vers le bas, après une course d'élan et un saut |
| Attaque placée (feinte) | Ballon poussé vers une zone libre au lieu d'être frappé fort |
| Contre (bloc) | Saut au filet, bras tendus, pour renvoyer ou freiner l'attaque adverse |
| Couverture | Placement d'un joueur près de son attaquant pour récupérer un ballon contré |
| Passeur pénétrant | Passeur qui part de l'arrière vers le filet au moment du service adverse |
| Rotation | Changement de place des joueurs dans le sens des aiguilles d'une montre quand l'équipe reprend le service |
| Rupture | Action qui déséquilibre l'adversaire et crée une occasion de marquer |
| Rapport de force | Comparaison des points forts et faibles des deux équipes |
| Temps mort | Arrêt de jeu demandé par une équipe pour ajuster son organisation |`,
  },

  // --------------------------- Volley-ball : évaluation ---------------------------
  "vb-eval-structure": {
    cours: VBE,
    titre: "1. L'épreuve du bac : structure de la note",
    md: `Le volley-ball fait partie du **champ d'apprentissage 4** : « Conduire et maîtriser un affrontement collectif ou interindividuel pour gagner ». La note est sur **20 points**, répartis en trois attendus de fin de lycée (AFL).

| Attendu | Intitulé | Points | Quand |
| --- | --- | --- | --- |
| **AFL1** | S'engager pour gagner une rencontre en faisant des choix techniques et tactiques pertinents au regard de l'analyse du rapport de force | **12 points** | Le jour de l'épreuve (fin de cycle) |
| **AFL2** | Se préparer et s'entraîner, individuellement ou collectivement, pour conduire et maîtriser un affrontement collectif | **2, 4 ou 6 points** | Au fil du cycle |
| **AFL3** | Choisir et assumer les rôles qui permettent un fonctionnement collectif solidaire | **6, 4 ou 2 points** | Au fil du cycle (et le jour de l'épreuve) |

### Ton choix de répartition (AFL2 / AFL3)

Avant l'épreuve, tu choisis comment répartir les **8 points** restants :

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

  "vb-eval-deroulement": {
    cours: VBE,
    titre: "2. Le jour de l'épreuve : ce qui est observé",
    md: `### Le déroulement

- Les équipes de **4 joueurs** sont constituées pour être **homogènes entre elles** et équilibrées (niveau, mixité) selon les règles fixées par l'enseignant.
- Chaque équipe dispute **plusieurs rencontres** (par exemple en poule), sur le terrain de **7 m × 7 m par camp**.
- Avant les matchs, chaque équipe présente son **projet de jeu** (organisation, rôles, intentions tactiques).
- Entre les rencontres, l'équipe **analyse** ses résultats et l'adversaire suivant, et peut **ajuster** son projet.

### Ce que l'enseignant observe (AFL1)

| Domaine | Indicateurs |
| --- | --- |
| **Construction de l'attaque** | Part des ballons joués en 3 touches ; qualité de la réception et de la passe (haute, près du filet) |
| **Efficacité offensive** | Attaques gagnantes (smash, attaque placée), service utile (zones faibles, service haut maîtrisé), peu de fautes directes |
| **Défense** | Placement, contre, défenseurs, couverture ; ballons défendus et relancés |
| **Rôle tenu** | Passeur, attaquant, défenseur : efficacité dans son poste choisi |
| **Choix tactiques** | Exploitation des zones faibles, adaptation à l'adversaire, respect et ajustement du projet de jeu |
| **Rapport de force** | Résultats obtenus face à des adversaires de niveau proche |

### Ce qui fait la différence en Terminale

- Des attaques **construites** et **variées**, pas seulement des renvois.
- Un **service haut** maîtrisé ou un service bas **placé**.
- Un **contre** et une **défense organisés**, pas seulement individuels.
- Une équipe qui **communique** et **s'adapte** pendant le match.`,
  },

  "vb-eval-roles": {
    cours: VBE,
    titre: "3. AFL2 et AFL3 : s'entraîner et assumer des rôles",
    md: `### AFL2 : se préparer et s'entraîner

Évalué **tout au long du cycle**, souvent à l'aide d'un **carnet d'entraînement** ou d'un outil de recueil de données.

- **Identifier** ses points forts et ses points faibles (et ceux de l'équipe) à partir d'observations.
- **Choisir** des exercices adaptés pour progresser (service, réception, attaque, organisation collective).
- **S'échauffer** de façon complète et spécifique (voir *Sport & Santé › L'échauffement*).
- **Mesurer** ses progrès (statistiques de service, de réception, d'attaques réussies) et ajuster son entraînement.

### AFL3 : assumer des rôles

Tu choisis **deux rôles** parmi ceux proposés et tu es évalué dans ces rôles :

| Rôle | Ce que l'on attend |
| --- | --- |
| **Arbitre** | Siffler juste et sans hésiter, faire les bons gestes, tenir le score, faire respecter les règles avec calme |
| **Coach** | Observer, donner une à deux consignes claires (temps mort, entre deux sets), encourager |
| **Observateur** | Remplir une fiche d'observation fiable (statistiques, zones), restituer des informations utiles à l'équipe |
| **Partenaire d'entraînement** | Proposer des ballons adaptés, s'investir pour faire progresser les autres |
| **Organisateur** | Mettre en place le matériel, gérer le tableau des rencontres et le temps |

Dans tous les cas, on attend une attitude **solidaire** : respect des partenaires, des adversaires et de l'arbitre, engagement constant.`,
  },
};

// =====================================================================
// BADMINTON (simple) — niveau Terminale
// =====================================================================
const BD = "Badminton — théorie";
const BDE = "Badminton — évaluation";

export const COURS_BADMINTON = {
  "bd-jeu": {
    cours: BD,
    titre: "1. Le badminton : but du jeu et attendus",
    md: `Le badminton est un sport d'opposition **interindividuel** : deux joueurs (simple) ou deux équipes de deux (double) s'affrontent de part et d'autre d'un filet. Le but est de **faire tomber le volant dans le terrain adverse** ou de **pousser l'adversaire à la faute**.

Le volant est le projectile le plus rapide des sports de raquette au départ du smash, mais il **ralentit très vite** : il faut donc jouer sur les **trajectoires** et les **déplacements**.

### Ce qu'on attend d'un élève de Terminale

- **Construire le point** : déplacer l'adversaire dans les 4 coins du terrain, en alternant jeu long (dégagés) et jeu court (amortis).
- **Conclure** quand l'occasion se présente : smash ou volant accéléré vers l'espace libre.
- **Défendre** efficacement : se replacer au centre après chaque frappe, relancer haut et long en difficulté.
- **Servir** de façon sûre et réglementaire, court ou long selon l'adversaire.
- **Analyser le rapport de force** et adapter sa tactique (jouer sur le revers, le fond de court, le filet…).
- **Connaître le règlement**, arbitrer et compter les points, observer et conseiller un partenaire.`,
  },

  "bd-reglement": {
    cours: BD,
    titre: "2. Le règlement",
    md: `### Le terrain

| Élément | Simple | Double |
| --- | --- | --- |
| Largeur | Lignes **intérieures** de côté (5,18 m) | Lignes **extérieures** de côté (6,10 m) |
| Longueur | Ligne de fond **extérieure** (13,40 m) | Ligne de fond extérieure en jeu, ligne de service long **intérieure** au service |
| Filet | 1,55 m aux poteaux, 1,524 m au centre | Idem |

Les lignes font partie du terrain : un volant qui touche la ligne est **bon**.

### Le décompte des points

- Chaque échange rapporte **un point** à celui qui le gagne, qu'il ait servi ou non.
- Un set se joue en **21 points** avec **2 points d'écart** ; à 29-29, le premier à **30** gagne.
- Un match se joue au meilleur des **3 sets** (au lycée, souvent un set ou un temps limité).
- Celui qui gagne le point **sert** le point suivant.

### Le service

| Règle | Détail |
| --- | --- |
| Côté | Le serveur sert de la **zone droite** quand son score est **pair** (0, 2, 4…), de la **zone gauche** quand il est **impair** |
| Direction | En **diagonale**, dans la zone de service opposée |
| Zone en simple | Zone **longue et étroite** : jusqu'à la ligne de fond, limitée par la ligne intérieure de côté |
| Hauteur | Le volant est frappé **sous 1,15 m** du sol au moment du contact |
| Geste | Mouvement vers l'avant continu, sans feinte ; les deux pieds restent au sol et immobiles dans la zone |
| Receveur | Il attend dans la zone opposée en diagonale, pieds au sol, jusqu'à la frappe |

### Les fautes

| Faute | Définition |
| --- | --- |
| Volant dehors | Le volant tombe hors des limites du terrain |
| Volant dans le filet | Le volant ne passe pas le filet ou passe en dessous |
| Contact du joueur | Le volant touche le corps ou les vêtements du joueur |
| Double frappe | Le volant est touché deux fois de suite par le même joueur (ou par les deux partenaires en double) |
| Filet | La raquette, le corps ou les vêtements touchent le filet ou les poteaux pendant l'échange |
| Envahissement | La raquette passe au-dessus du filet pour frapper le volant dans le camp adverse (l'accompagnement après la frappe est autorisé) |
| Faute de service | Volant frappé au-dessus de 1,15 m, mauvaise zone, pied qui bouge ou mord la ligne, feinte |
| Obstruction | Gêner l'adversaire, crier ou faire un geste pour le distraire |

### Le let (point à rejouer)

Le point est rejoué si le receveur n'était pas prêt au service, si un volant d'un autre terrain gêne le jeu, ou si le volant se bloque sur le filet après l'avoir franchi.`,
  },

  "bd-technique": {
    cours: BD,
    titre: "3. Les frappes et les déplacements",
    md: `### La prise de raquette

- **Prise universelle** (« poignée de main ») : le V formé par le pouce et l'index sur la tranche du manche ; doigts souples, on serre seulement au moment de la frappe.
- **Prise revers** : le pouce à plat sur le méplat du manche, pour plus de force en revers.

### Les frappes

| Frappe | Trajectoire | Objectif | Points clés |
| --- | --- | --- | --- |
| **Dégagé** | Haute et longue, vers le fond de court adverse | Repousser l'adversaire, gagner du temps pour se replacer | Se placer derrière le volant, profil, frappe au-dessus et devant la tête, bras tendu, poignet qui accélère |
| **Amorti** | Lente et courte, retombant juste derrière le filet | Faire avancer l'adversaire, l'obliger à lever le volant | Même préparation que le dégagé (pour cacher l'intention), frappe freinée |
| **Smash** | Rapide et descendante | Conclure le point | Volant devant soi, frappe au point le plus haut, vers le bas, à fond ; à jouer en position favorable (mi-court) |
| **Contre-amorti / filet** | Très courte, frôlant le filet | Gagner le point au filet ou forcer un volant haut | Raquette haute, toucher léger, volant pris le plus haut possible |
| **Lob** | Haute et longue, depuis le filet | Se dégager d'un amorti, repousser l'adversaire au fond | Fente avant, raquette sous le volant, mouvement vers le haut et l'avant |
| **Drive** | Tendue, parallèle au sol | Accélérer le jeu à mi-hauteur | Frappe devant soi, coup sec |
| **Rush** | Volant attaqué vers le bas au filet | Punir un volant trop haut au filet | Raquette haute, frappe courte et sèche |

### Le service

- **Service court** (revers ou coup droit) : volant qui frôle le filet et tombe juste derrière la ligne de service court ; utilisé pour empêcher l'attaque.
- **Service long** (coup droit) : volant haut qui tombe au fond de la zone de service ; utilisé pour repousser l'adversaire au fond, surtout en simple.

### Les déplacements

- **Position de base** au **centre du terrain** (légèrement en arrière du milieu), pieds écartés, genoux fléchis, raquette devant soi.
- **Replacement** au centre **après chaque frappe**.
- Déplacements en **pas chassés** et **pas croisés** ; **fente avant** pour les volants au filet (genou au-dessus du pied, pied dans l'axe).
- Petit **sursaut d'appui** (« split step ») au moment où l'adversaire frappe, pour réagir plus vite.`,
  },

  "bd-tactique": {
    cours: BD,
    titre: "4. La tactique : construire, conclure, défendre",
    md: `### Construire le point : déplacer l'adversaire

- **Jouer loin de l'adversaire** : là où il n'est pas, dans les **4 coins** du terrain.
- **Alterner long et court** : dégagé au fond puis amorti au filet, pour l'obliger à de grands déplacements.
- **Jouer sur son point faible** : souvent le **fond de court côté revers**.
- **Cacher ses intentions** : préparer dégagé, amorti et smash de la même façon.
- **Jouer à contre-pied** : renvoyer le volant là d'où l'adversaire vient de partir.

### Conclure le point

| Situation | Bonne décision |
| --- | --- |
| Volant haut et court (mi-court) | **Smash** vers l'espace libre ou sur le corps |
| Volant haut près du filet | **Rush** vers le bas |
| Adversaire en retard au fond | **Amorti** ou volant court |
| Adversaire en retard au filet | **Dégagé** ou lob par-dessus |

### Défendre et se dégager

- En difficulté, jouer **haut et long** (dégagé défensif, lob) pour se donner le temps de se replacer.
- Face à un smash, **raquette devant soi**, bloquer court ou relancer long.
- Toujours **revenir au centre** après la frappe.

### Analyser le rapport de force

| Question | Exemple d'adaptation |
| --- | --- |
| L'adversaire se déplace-t-il bien vers l'arrière ? | Si non : multiplier les dégagés au fond |
| Est-il à l'aise au filet ? | Si non : multiplier les amortis et services courts |
| Son revers est-il faible ? | Orienter le jeu vers son côté revers |
| Fait-il beaucoup de fautes directes ? | Jouer sûr, faire durer l'échange |
| Est-il plus fort physiquement ? | Varier les rythmes, chercher la précision plutôt que la vitesse |

### Les deux grands styles de jeu

- **Jeu de construction (patient)** : faire durer l'échange avec des dégagés précis, attendre la faute ou l'occasion de conclure.
- **Jeu d'attaque (rapide)** : prendre le volant tôt, accélérer, smasher dès que possible.

En Terminale, on choisit son **style de jeu** et on l'adapte à l'adversaire.`,
  },

  "bd-connaissances": {
    cours: BD,
    titre: "5. Ce sur quoi tu peux être interrogé",
    md: `Tu dois être capable de :

### Le règlement et l'arbitrage

- Décrire les **limites du terrain** en simple et en double, la **hauteur du filet**.
- Expliquer le **décompte des points** (21 points, 2 points d'écart, 30 maximum).
- Expliquer les règles du **service** (côté selon le score, diagonale, zone en simple, hauteur de 1,15 m).
- Citer et reconnaître les **fautes** et les cas de **let**.
- **Arbitrer** un match et tenir le score à voix haute (score du serveur annoncé en premier).

### La technique

- Décrire les **trajectoires** et l'**objectif** de chaque frappe (dégagé, amorti, smash, contre-amorti, lob, drive, rush).
- Expliquer le **service court** et le **service long** et quand les utiliser.
- Décrire la **position de base**, le **replacement** et la **fente avant**.

### La tactique

- Expliquer comment **construire** un point (déplacer l'adversaire, alterner long et court).
- Choisir la frappe adaptée pour **conclure** selon la situation.
- Expliquer comment **défendre** et se dégager.
- **Analyser un rapport de force** et proposer une tactique adaptée à un adversaire décrit.
- Présenter son **style de jeu**.

### Les rôles sociaux

- Tenir le rôle d'**arbitre**, d'**observateur** (fiche de points gagnés et perdus, zones) et de **coach**.`,
  },

  "bd-lexique": {
    cours: BD,
    titre: "6. Lexique",
    md: `| Terme | Définition |
| --- | --- |
| Dégagé | Frappe haute et longue vers le fond du terrain adverse |
| Amorti | Frappe lente qui retombe juste derrière le filet |
| Smash | Frappe rapide et descendante pour conclure |
| Contre-amorti | Réponse courte au filet sur un amorti adverse |
| Lob | Volant joué depuis le filet, haut et long |
| Drive | Frappe tendue à mi-hauteur |
| Rush | Volant attaqué vers le bas au filet |
| Fente avant | Grand pas en avant pour atteindre un volant au filet |
| Replacement | Retour au centre du terrain après chaque frappe |
| Let | Point à rejouer |
| Rupture | Action qui met l'adversaire en difficulté et crée une occasion de conclure |
| Rapport de force | Comparaison des points forts et faibles des deux joueurs |`,
  },

  // --------------------------- Badminton : évaluation ---------------------------
  "bd-eval-structure": {
    cours: BDE,
    titre: "1. L'épreuve du bac : structure de la note",
    md: `Le badminton fait partie du **champ d'apprentissage 4** : « Conduire et maîtriser un affrontement collectif ou interindividuel pour gagner ». La note est sur **20 points**, répartis en trois attendus de fin de lycée (AFL).

| Attendu | Intitulé | Points | Quand |
| --- | --- | --- | --- |
| **AFL1** | S'engager pour gagner une rencontre en faisant des choix techniques et tactiques pertinents au regard de l'analyse du rapport de force | **12 points** | Le jour de l'épreuve (fin de cycle) |
| **AFL2** | Se préparer et s'entraîner, individuellement ou collectivement, pour conduire et maîtriser un affrontement interindividuel | **2, 4 ou 6 points** | Au fil du cycle |
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

  "bd-eval-deroulement": {
    cours: BDE,
    titre: "2. Le jour de l'épreuve : ce qui est observé",
    md: `### Le déroulement

- Les élèves sont répartis en **poules de niveau homogène**, pour que chaque rencontre soit **équilibrée**.
- Chaque élève dispute **plusieurs matchs en simple** (en points ou au temps, selon l'organisation).
- Avant l'épreuve, tu présentes ton **projet de jeu** et ton **style de jeu** (construction patiente ou attaque rapide).
- Entre deux matchs, tu analyses l'adversaire suivant et tu peux **ajuster ta tactique**.

### Ce que l'enseignant observe (AFL1)

| Domaine | Indicateurs |
| --- | --- |
| **Construction du point** | Utilisation de la profondeur et de la largeur du terrain, alternance jeu long / jeu court |
| **Efficacité offensive** | Points gagnés par smash, amorti ou volant placé ; prise de risque adaptée |
| **Défense et replacement** | Retour au centre, volants défensifs hauts et longs, peu de points perdus sur déplacement |
| **Service** | Service réglementaire, court ou long selon l'adversaire, peu de fautes |
| **Fautes directes** | Rapport entre points gagnés et fautes commises |
| **Choix tactiques** | Jeu sur les points faibles adverses, adaptation au score et à l'adversaire, respect du projet |
| **Rapport de force** | Résultats obtenus face à des adversaires de niveau proche |

### Ce qui fait la différence en Terminale

- Des points **construits** (au moins 2 ou 3 frappes pour créer la rupture) et pas seulement des échanges au centre.
- Des frappes de **fond de court** (dégagé) suffisamment longues pour repousser l'adversaire.
- Un **smash** utilisé au bon moment, dans une position favorable.
- Une **adaptation visible** à l'adversaire au cours du match.`,
  },

  "bd-eval-roles": {
    cours: BDE,
    titre: "3. AFL2 et AFL3 : s'entraîner et assumer des rôles",
    md: `### AFL2 : se préparer et s'entraîner

Évalué **tout au long du cycle**, souvent à l'aide d'un **carnet d'entraînement** ou d'un outil de recueil de données.

- **Identifier** ses points forts et ses points faibles à partir d'observations (points gagnés et perdus, zones).
- **Choisir** des exercices adaptés (précision du dégagé, amortis, service, déplacements, smash).
- **S'échauffer** de façon complète et spécifique (voir *Sport & Santé › L'échauffement*).
- **Mesurer** ses progrès et ajuster son entraînement.

### AFL3 : assumer des rôles

Tu choisis **deux rôles** parmi ceux proposés et tu es évalué dans ces rôles :

| Rôle | Ce que l'on attend |
| --- | --- |
| **Arbitre** | Annoncer le score à voix haute (score du serveur en premier), juger les volants dedans / dehors, faire respecter les règles du service |
| **Observateur** | Remplir une fiche d'observation fiable (points gagnés / perdus, frappes, zones) et la restituer |
| **Coach** | Donner une à deux consignes tactiques claires entre les sets ou les matchs |
| **Partenaire d'entraînement** | Proposer des volants adaptés, s'investir pour faire progresser l'autre |
| **Organisateur** | Gérer les poules, le temps et les résultats |

Dans tous les cas, on attend une attitude **solidaire** et respectueuse des partenaires, des adversaires et de l'arbitre.`,
  },
};

// =====================================================================
// ÉVALUATIONS DE FIN DE CYCLE — CA5 : Musculation et Course de durée
// =====================================================================
const MUE = "Musculation — évaluation";
const CDE = "Course de durée — évaluation";

const STRUCTURE_CA5 = (activite, element1, element2) => `La ${activite} fait partie du **champ d'apprentissage 5** : « Réaliser et orienter son activité physique pour développer ses ressources et s'entretenir ». La note est sur **20 points**, répartis en trois attendus de fin de lycée (AFL).

| Attendu | Ce qui est attendu | Points | Quand |
| --- | --- | --- | --- |
| **AFL1** | S'engager pour obtenir les effets recherchés selon son projet personnel, en faisant des choix de paramètres d'entraînement cohérents avec le thème retenu | **12 points** | Le jour de l'épreuve (fin de cycle) |
| **AFL2** | S'entraîner, individuellement et collectivement, pour développer ses ressources et s'entretenir en fonction des effets recherchés | **2, 4 ou 6 points** | Au fil du cycle (carnet d'entraînement) |
| **AFL3** | Coopérer pour faire progresser : tenir des rôles qui aident les autres à s'entraîner | **6, 4 ou 2 points** | Au fil du cycle (et le jour de l'épreuve) |

### Ton choix de répartition (AFL2 / AFL3)

| Choix | AFL2 | AFL3 |
| --- | --- | --- |
| a | 2 points | 6 points |
| b | 4 points | 4 points |
| c | 6 points | 2 points |

### L'AFL1 en deux éléments

- **Élément 1 — Produire** : ${element1}
- **Élément 2 — Analyser** : ${element2}

Chaque élément vaut **au moins 4 points** ; la répartition exacte et les descripteurs des **4 degrés** sont fixés par le **référentiel de l'établissement**.

### Ce que tu choisis

- Ton **projet** et ton **thème d'entraînement** (le mobile : pourquoi tu t'entraînes).
- Tes **paramètres** d'entraînement (charges, durées, intensités, récupérations…).
- La **répartition** des points entre AFL2 et AFL3.`;

export const COURS_EVAL_CA5 = {
  // --------------------------- Musculation ---------------------------
  "mu-eval-structure": {
    cours: MUE,
    titre: "1. L'épreuve du bac : structure de la note",
    md: STRUCTURE_CA5(
      "musculation",
      "réaliser sa séance avec une **exécution sûre et efficace** (placement, trajet, amplitude, rythme, respiration), en respectant les **paramètres** de son projet (charges, répétitions, séries, récupération).",
      "**justifier** ses choix de paramètres au regard de son mobile, **identifier ses ressentis** (effort, fatigue, effets) et **réguler** sa séance si nécessaire (ajuster une charge, une récupération)."
    ),
  },

  "mu-eval-deroulement": {
    cours: MUE,
    titre: "2. Le jour de l'épreuve : ce qui est observé",
    md: `### Le déroulement

1. Tu présentes ton **projet** : ton **mobile** (envie, besoin, nécessité), ton **thème** (puissance R6, masse R10, tonicité R15, endurance R20/25, ou projet mixte) et les **ateliers** choisis.
2. Tu réalises ton **échauffement** complet et spécifique (séries d'approche).
3. Tu réalises ta **séance** sur **4 à 6 ateliers** (selon le référentiel), avec les charges, séries, répétitions et récupérations prévues dans ton carnet.
4. Pendant la séance, tu notes tes **réalisations** et tes **ressentis**, et tu **régules** si besoin.
5. À la fin, tu fais le **bilan** : effets ressentis, écarts entre le prévu et le réalisé, ce que tu modifierais à la prochaine séance.

### Ce que l'enseignant observe (AFL1)

| Domaine | Indicateurs |
| --- | --- |
| **Sécurité** | Dos gainé et plat, placement correct, parade sur les ateliers à barre libre, matériel sécurisé |
| **Qualité d'exécution** | Trajet et amplitude complets, rythme adapté au projet (explosif en R6, contrôlé en R10…), respiration coordonnée |
| **Respect des paramètres** | Charges cohérentes avec le % de 1RM du projet, nombre de répétitions et de séries, temps de récupération respectés |
| **Cohérence du projet** | Choix des ateliers en lien avec le mobile, équilibre agonistes / antagonistes, ordre des ateliers |
| **Analyse et régulation** | Ressentis identifiés (échelle de 1 à 10, zones de travail), ajustements justifiés pendant la séance, bilan lucide |

### Ce qui fait la différence en Terminale

- Un projet **personnel et argumenté**, pas une séance « copiée ».
- Des charges **calculées** à partir de sa charge de référence (tableau de conversion), puis **ajustées** à bon escient.
- Une exécution **irréprochable** sur l'ensemble des séries, même en fin de séance.
- Un bilan qui relie **ressentis, effets recherchés et choix** pour la suite.

### La partie connaissances

Les connaissances théoriques (muscles, contractions, projets, méthodes, sécurité, alimentation) sont attendues dans la présentation du projet et le bilan, et peuvent faire l'objet de **questions** : voir *Musculation › Théorie*, partie 9.`,
  },

  "mu-eval-roles": {
    cours: MUE,
    titre: "3. AFL2 et AFL3 : s'entraîner et coopérer",
    md: `### AFL2 : s'entraîner

Évalué **tout au long du cycle**, à partir du **carnet d'entraînement** (papier ou application **Muscu Pro**).

- **Rechercher** sa charge de référence (R15 ou R20) sur chaque atelier et en **déduire** ses charges de travail.
- **Planifier** ses séances : ateliers, paramètres, progression d'une séance à l'autre.
- **Noter** à chaque séance les charges, répétitions et ressentis, puis **analyser** l'évolution (série moyenne, tonnage).
- **Faire évoluer** son projet en fonction des résultats (augmentation de charge, changement de méthode).
- S'**engager** de façon régulière et sérieuse à chaque séance.

### AFL3 : coopérer pour faire progresser

Tu choisis le ou les **rôles** proposés et tu es évalué dans ces rôles :

| Rôle | Ce que l'on attend |
| --- | --- |
| **Pareur / partenaire de sécurité** | Placement correct, attention constante, intervention sans gêner le pratiquant |
| **Observateur** | Repérer les erreurs d'exécution (dos, amplitude, rythme) et les noter sur une fiche |
| **Coach** | Donner des conseils précis et bienveillants, encourager, rappeler les paramètres (temps de récupération, nombre de répétitions) |
| **Gestionnaire du matériel** | Installer, sécuriser et ranger le matériel (colliers, disques) |

Dans tous les cas, on attend une attitude **responsable** : respect de la sécurité des autres, entraide, rangement de la salle.`,
  },

  // --------------------------- Course de durée ---------------------------
  "cd-eval-structure": {
    cours: CDE,
    titre: "1. L'épreuve du bac : structure de la note",
    md: STRUCTURE_CA5(
      "course de durée",
      "réaliser sa séance en **respectant les allures** prévues (temps de passage, % de VMA), les **durées** et les **récupérations** de son projet, avec une course efficace et économique.",
      "**identifier ses ressentis** (essoufflement, échelle de Borg, fréquence cardiaque), les **relier aux effets recherchés** et **réguler** sa séance si nécessaire (ralentir, allonger une récupération), puis faire un **bilan** lucide."
    ),
  },

  "cd-eval-deroulement": {
    cours: CDE,
    titre: "2. Le jour de l'épreuve : ce qui est observé",
    md: `### Le déroulement

1. Tu présentes ton **projet** : ton **mobile** et ton **thème d'entraînement**, par exemple :
    - **Entretenir sa santé** : endurance fondamentale (65 à 75 % de VMA) sur une durée longue ;
    - **Développer sa capacité aérobie** : endurance active et seuil (75 à 90 % de VMA) ;
    - **Développer sa puissance aérobie (VMA)** : fractionné à 95-105 % de VMA ;
    - **Gestion du poids / affinement** : efforts longs à intensité modérée.
2. Tu présentes ta **séance** construite à partir de **ta VMA** : blocs de course, % de VMA, durées ou distances, récupérations, **temps de passage** calculés.
3. Tu réalises ton **échauffement** (voir *Sport & Santé › L'échauffement*).
4. Tu réalises ta séance (environ **30 à 45 minutes** de course selon le référentiel), en relevant tes **temps de passage**, ta **fréquence cardiaque** et ton **ressenti** (Borg) après chaque bloc.
5. Tu **régules** si besoin et tu fais ton **bilan** : écarts entre le prévu et le réalisé, explication, adaptation pour la suite.

### Ce que l'enseignant observe (AFL1)

| Domaine | Indicateurs |
| --- | --- |
| **Respect des allures** | Écart entre les temps de passage prévus et réalisés (régularité, pas de départ trop rapide) |
| **Réalisation du projet** | Durées, distances et récupérations prévues effectivement réalisées |
| **Cohérence du projet** | Allures et volumes en lien avec le thème et la VMA, calculs justes |
| **Efficacité de la course** | Foulée économique, posture, respiration régulière |
| **Analyse et régulation** | Ressentis relevés (FC, Borg, essoufflement), liens avec les effets recherchés, régulations justifiées, bilan lucide |

### Ce qui fait la différence en Terminale

- Des allures **calculées juste** et **tenues** au tour près.
- Une séance **construite** (échauffement, corps de séance, retour au calme) et cohérente avec le thème choisi.
- Une **régulation** pertinente plutôt qu'un abandon ou un excès de vitesse.
- Un bilan qui relie **allure, fréquence cardiaque, ressenti** et **filière énergétique** sollicitée.

### La partie connaissances

Les connaissances théoriques (filières, ATP, cœur, respiration, VMA, allures, récupération, alimentation) sont attendues dans la présentation du projet et le bilan, et peuvent faire l'objet de **questions** : voir *Course de durée › Théorie*, partie 13.`,
  },

  "cd-eval-roles": {
    cours: CDE,
    titre: "3. AFL2 et AFL3 : s'entraîner et coopérer",
    md: `### AFL2 : s'entraîner

Évalué **tout au long du cycle**, à partir du **carnet d'entraînement** (papier ou application **Course de Durée Pro**).

- Réaliser un **test de VMA** et s'en servir pour **calculer** ses allures.
- **Planifier** ses séances selon son thème : blocs, % de VMA, durées, récupérations.
- **Relever** à chaque séance ses temps de passage, sa FC et son ressenti (Borg), et noter si chaque bloc est réussi.
- **Analyser** l'évolution sur le cycle et **ajuster** ses séances (allures, volumes, récupérations).
- S'**engager** régulièrement et sérieusement à chaque séance.

### AFL3 : coopérer pour faire progresser

Tu choisis le ou les **rôles** proposés et tu es évalué dans ces rôles :

| Rôle | Ce que l'on attend |
| --- | --- |
| **Chronométreur** | Annoncer les temps de passage justes et au bon moment, relever les temps |
| **Observateur** | Relever les allures, la foulée et les signes de fatigue du coureur sur une fiche |
| **Coach / lièvre** | Aider un partenaire à tenir son allure (annonces, encouragements, course à ses côtés à l'allure prévue) |
| **Organisateur** | Installer les plots et repères, gérer le temps et les rotations de groupes |

Dans tous les cas, on attend une attitude **responsable et bienveillante** : aide aux partenaires, respect des allures de chacun, engagement constant.`,
  },
};
