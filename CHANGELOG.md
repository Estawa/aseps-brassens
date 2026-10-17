# Site EPS — journal des changements

Version actuelle : **1.3.0**

---

### v1.3.0 — 17/10/2026
- **Trois nouvelles rubriques**, sur le même modèle que Volley-ball et Badminton (une page
  « Théorie » + une page « Évaluation de fin de cycle », en parties dépliables), placées juste
  après Gymnastique :
  - **Relais 2 × 200 m** — *Théorie* : principe et attendus, règlement et zone de transmission
    (20 m + zone d'élan 5 m), technique, marques en pieds et stratégie d'équipe, préparation,
    questions possibles, lexique. *Évaluation* : structure de la note CA1 (Bac Pro, AFLP 1/2/4/5),
    **barème complet** de l'application Relais 200m (200 m filles/garçons, relais, indice de
    transmission), fil de séquence /8, et **exemple de notation du binôme Cyrille et Steph**
    (10,2 et 11,2 / 20).
  - **Football** (5 contre 5 sur terrain réduit) — *Théorie* : terrain et attendus, règlement,
    gestes techniques, rôles (porteur, soutien, appui), tactique et rapport de force, questions
    possibles, lexique. *Évaluation* : structure CA4, ce qui est observé, AFL2 et AFL3.
  - **Basket-ball** (4 contre 4) — *Théorie* : mêmes parties. *Évaluation* : structure CA4,
    ce qui est observé, AFL2 et AFL3, et **exemple de notation de Kevin** (14 / 20).
- **Escalade › Évaluation** : nouvelle partie « Exemple de notation au bac : le binôme Frédéric
  et Thierry » (18 et 13 / 20), avec un exemple de barème de performance (cotation × mode,
  bonus par couleur retirée).
- Ces contenus sont ajoutés **une seule fois** au site en ligne, au premier chargement de la
  nouvelle version : les pages existantes ne sont pas modifiées, et une page supprimée ensuite
  ne sera pas recréée.

### v1.2.0 — 16/10/2026
- **Nouvelle page (modèle)** dans Administration › Pages : crée en une fois une page sur le
  modèle de « L'alimentation » ou « L'échauffement » :
  - emplacement : dans une rubrique existante, ou dans une **nouvelle rubrique principale**
    créée en même temps (ex. « Sport & Santé » › « Le sommeil ») ;
  - titre, phrase d'introduction, puis autant de **parties dépliables** que voulu
    (titre + texte), à réordonner ou supprimer ;
  - options : numérotation automatique (1., 2., 3.…), première partie dépliée,
    galerie photos, vidéo et bloc de liens à remplir ensuite ;
  - la page s'ouvre directement en mode édition une fois créée.
- **Barre de mise en forme** au-dessus du texte des parties : Sous-titre, Gras, Italique,
  Liste, Liste numérotée, Tableau, et bouton **Aperçu** pour voir le rendu avant d'enregistrer.
  Bouton « Insérer un exemple de structure » pour partir d'une trame.
- Nouveau type de bloc **« Partie dépliable (à écrire) »** pour ajouter une partie à
  n'importe quelle page ; un bloc « Cours » peut aussi passer en « Partie écrite moi-même ».
- **Collègues (AS)** : bouton « Créer une nouvelle page AS (modèle) » dans leur espace
  (galerie photos ajoutée par défaut), pour que toutes les pages de l'AS aient la même
  présentation. Chaque collègue peut renommer ou supprimer les pages qu'il a créées
  (indiqué « créée par … »), pas celles des autres.

### v1.1.1 — 15/10/2026
- Bouton « Se déconnecter » en bas à droite, à côté de « Modifier cette page », pour quitter
  l'administration d'un clic (les boutons disparaissent alors et le site s'affiche comme pour
  un visiteur).
- Numéro de version plus lisible en bas de page.

### v1.1.0 — 15/10/2026
- **Nouvel onglet « Accès »** dans l'administration :
  - changement du code administrateur (4 chiffres, saisi deux fois), valable sur tous les appareils ;
  - codes personnels des collègues : ajout (nom + code), nouveau code, retrait de l'accès.
- **Accès collègue** : avec son code, un collègue arrive sur son espace et ne peut modifier
  que la rubrique « Association Sportive du Lycée » et ses pages (pas l'accueil, les autres
  rubriques, les documents, les liens ni les codes).
- Les codes ne sont pas enregistrés en clair dans la base en ligne (empreinte SHA-256).
- Correctif : la version 1.1.0 ne se compilait pas (erreur de syntaxe), elle est maintenant en ligne.

### v1.0.1 — 15/10/2026
- Nouvelle photo du lycée, en meilleure qualité (1260 × 708), livrée avec le site.
- Éditeur du bandeau : bouton « Photo du lycée » pour la remettre en fond en un clic
  (plus légère pour la base en ligne qu'une photo importée).

### v1.0.0 — 15/10/2026
- **Synchronisation en ligne** : le site est enregistré dans un espace séparé (collection
  « aseps ») du projet Firebase d'EPS Pro, sans toucher aux données d'EPS Pro.
  - Première mise en ligne : depuis l'espace Administration de l'appareil qui a la bonne version,
    bouton « Mettre le site en ligne depuis cet appareil ».
  - Ensuite, chaque modification faite par l'administrateur (ordinateur ou téléphone) est
    enregistrée en ligne automatiquement et apparaît sur tous les appareils, y compris chez
    les visiteurs, sans recharger la page.
  - État affiché dans le bandeau du mode édition (enregistré en ligne / enregistrement…) et dans
    l'administration, avec un bouton « Republier la version de cet appareil » en secours.
  - Sans connexion, le site reste consultable avec la dernière version reçue.

### v0.9.0 — 15/10/2026
- **Textes des cours modifiables depuis l'éditeur** (ordinateur et téléphone) : en cliquant sur
  une partie de cours, le panneau affiche son titre et son texte complet, modifiables directement
  (sous-titres, gras, listes, tableaux), avec un bouton « Revenir au texte d'origine ».
- Rappel : tant que la synchronisation en ligne n'est pas en place, les modifications restent
  sur l'appareil où elles sont faites.

### v0.8.3 — 15/10/2026
- **Photo du lycée dans le bandeau d'accueil sur tous les appareils** : la photo est désormais
  livrée avec le site (et non plus seulement stockée dans un téléphone). Un bandeau déjà
  personnalisé n'est pas modifié.

### v0.8.2 — 15/10/2026
- **Ordinateur : couleurs et repères** (téléphone inchangé) : tuiles des rubriques en couleurs
  franches avec bande colorée, sous-pages et parties de cours repliables bien identifiables
  (bordure orange, bouton rond pour ouvrir/fermer), liens en couleur, titres de section en orange.
- **Retour à l'accueil** : bouton « Accueil » dans l'en-tête et fil d'Ariane
  (Accueil › Rubrique › Page) en haut de chaque page, sur ordinateur.

### v0.8.1 — 15/10/2026
- **Affichage ordinateur repensé** (le téléphone ne change pas) : en-tête plus grand, bandeau
  d'accueil haut avec grand titre, tuiles des rubriques larges (3 par ligne) avec effet au survol,
  titres de pages, cartes des sous-pages, textes, liens et cours agrandis pour remplir l'écran.
  Sur très grand écran, la largeur utile passe à 1280 px.

### v0.8.0 — 14/10/2026
- **Nouvelle rubrique « Gymnastique »** (sol + mini-trampoline, code UNSS 2024-2028, en lien avec Gym Pro) :
  - *Théorie* (8 parties) : principes et sécurité, familles d'éléments et valeurs A-D (filles,
    garçons, mini-trampoline), composition et note D (8 éléments retenus, exigences, règle des
    3 conditions du lycée, enchaînement trop court), exécution et note E (fautes et pénalités),
    exemple de calcul, principes techniques et parade, jugement (juges D et E), ce sur quoi on peut
    être interrogé, lexique ;
  - *Évaluation de fin de cycle* (champ d'apprentissage 3) : structure de la note (AFL1 12 pts,
    AFL2/AFL3 au choix), déroulement et indicateurs observés, rôles (juge D, juge E, pareur…).
- Mises à jour automatiques plus sûres : une rubrique ou une page supprimée volontairement
  n'est plus jamais recréée par une mise à jour ultérieure.

### v0.7.0 — 14/10/2026
- **Nouvelle sous-page « Évaluation de fin de cycle » en Musculation et en Course de durée**
  (champ d'apprentissage 5), sur le modèle du volley-ball et du badminton :
  - structure de la note : AFL1 sur 12 points (élément « Produire » + élément « Analyser »),
    AFL2 / AFL3 sur 8 points au choix de l'élève (2-6, 4-4, 6-2) ;
  - déroulement de l'épreuve et indicateurs observés, adaptés à chaque activité (projets R6 à
    R20/25 et sécurité en musculation ; thèmes d'entraînement, allures et temps de passage,
    FC et Borg en course de durée) ;
  - AFL2 (carnet d'entraînement, Muscu Pro / Course de Durée Pro) et AFL3 (rôles : pareur,
    observateur, coach, chronométreur, lièvre…).
- Mise en page des cours : les sous-listes et le texte en *italique* s'affichent correctement
  (les renvois « voir *…* » ne montrent plus d'astérisques).

### v0.6.0 — 14/10/2026
- **Nouvelle rubrique « Volley-ball »** (4 contre 4, terrain de 7 m × 7 m par camp, niveau Terminale) :
  - *Théorie* (7 parties) : cadre de jeu et attendus, règlement et arbitrage, gestes techniques
    (manchette, passe, service bas/haut, smash, contre), rôles (passeur, attaquants, arrières,
    passeur pénétrant), tactique et rapport de force, ce sur quoi on peut être interrogé, lexique ;
  - *Évaluation de fin de cycle* : structure CA4 (AFL1 12 pts, AFL2/AFL3 au choix 2-6 / 4-4 / 6-2),
    déroulement et indicateurs observés, rôles.
- **Nouvelle rubrique « Badminton »** (simple, niveau Terminale) :
  - *Théorie* (6 parties) : attendus, règlement (terrain, score, service, fautes, let), frappes et
    déplacements, tactique et styles de jeu, ce sur quoi on peut être interrogé, lexique ;
  - *Évaluation de fin de cycle* : même structure CA4, indicateurs propres au badminton, rôles.
- Ordre : Course de durée, Escalade, Volley-ball, Badminton juste après Musculation.

### v0.5.0 — 14/10/2026
- **Nouvelle rubrique « Course de durée » › Théorie** (14 parties) : ATP et sa régénération,
  filières énergétiques, mitochondries, respiration et alvéoles, cœur et fréquence cardiaque
  (Karvonen), lactate et seuil, VMA (tests et développement), allures et calculs, projet de course,
  récupération, alimentation/hydratation/gestion du poids, ce sur quoi on peut être interrogé, lexique.
- **Nouvelle rubrique « Escalade »** :
  - *Théorie* (8 parties) : sécurité et contrôle croisé, matériel et baudrier, nœuds, assurage
    (5 temps, descente, moulinette/moulitête/tête), positions du corps et préhensions, lecture et
    cotation des voies, ce sur quoi on peut être interrogé, lexique ;
  - *Évaluation et tableau de performance* : construction de la note, codes du tableau (T, MT, M,
    A, numéro de dégaine) avec exemples.
- **Nouvelle rubrique « Association Sportive du Lycée »** avec 3 pages à compléter :
  Présentation et inscriptions, Résultats sportifs, Photos et vidéos.
- Ordre des rubriques : Course de durée et Escalade juste après Musculation, AS en dernier.
  Mise à jour automatique sans écraser les rubriques existantes.

### v0.4.1 — 14/10/2026
- **Page « L'échauffement » remplie** : principes communs (3 phases, règles d'or) puis
  un échauffement détaillé par activité : course de durée, musculation, sports collectifs
  (basket, volley, foot), escalade, badminton, gymnastique, course de vitesse et relais 2 × 200 m.
- La page **« L'échauffement » est déplacée dans « Sport & Santé »**, juste sous « L'alimentation ».
- Mise à jour automatique : si la page avait déjà été retravaillée, son contenu est conservé
  et les parties d'échauffement s'ajoutent à la suite.

### v0.4.0 — 14/10/2026
- **Cours théorique de musculation** intégré dans *Musculation › Théorie* : 10 parties
  repliables (sécurité et vocabulaire, muscles/fonctions/ateliers/étirements,
  agonistes-antagonistes, contractions et fibres, projets R6/R10/R15/R20-25, tableau de
  conversion et calcul de charge, méthodes, construction de séance et projet personnel,
  échauffement/étirements/récupération, **ce sur quoi les élèves peuvent être interrogés**,
  lexique). Les questions d'évaluation et leurs corrigés ne sont pas publiés.
- **Alimentation du sportif** intégrée dans *Sport & Santé › L'alimentation* (4 parties :
  nutriments, assiette équilibrée, manger autour de la séance, idées reçues).
- Nouveau type de bloc **« Cours (partie prête) »** dans l'éditeur : choix de la partie,
  dépliée ou non à l'ouverture. Les tableaux deviennent des fiches lisibles sur téléphone.
- Mise à jour automatique (une seule fois) : une page encore sur son texte d'origine est
  remplacée par le cours ; une page déjà retravaillée garde son contenu et reçoit le cours à la suite.

### v0.3.1 — 13/10/2026
- **Nouveau bloc « Galerie photos »** : plusieurs photos sur une même ligne, au choix :
  - *Grille* : photos réduites pour tenir côte à côte (passage à la ligne si besoin)
  - *Défilement ↔* : photos sur une seule ligne, à faire glisser du doigt
  - nombre de photos par ligne réglable séparément : ordinateur (1 à 6), téléphone (1 à 4)
  - forme : même taille (recadrées) ou photo entière ; légende par photo ; ordre modifiable
  - un clic / appui sur une photo l'ouvre en grand (photo précédente / suivante)
- **Largeur sur téléphone** réglable pour chaque bloc : pleine, ½, ⅓ ou ¼ — permet de
  mettre des blocs côte à côte aussi sur téléphone (par défaut : pleine largeur).
  En mode édition sur téléphone (ou en aperçu 📱), le bouton de largeur de la barre
  du bloc règle directement cette largeur téléphone.

### v0.3.0 — 13/10/2026
- **Mise en page libre en grille** : chaque bloc a une largeur (¼, ⅓, ½, ⅔, ¾,
  pleine, ou 1 à 12 colonnes). Les blocs se placent côte à côte sur ordinateur et
  passent automatiquement les uns sous les autres sur téléphone.
- **Éditeur visuel directement sur la page** (bouton « Modifier cette page » une fois
  l'administration déverrouillée, ou « Ouvrir la page et la mettre en page » depuis
  l'Administration) :
  - glisser-déposer des blocs par leur poignée ⠿ (repère turquoise avant/après)
  - barre orange à droite d'un bloc : tirer pour changer sa largeur (aimantée sur 12 colonnes)
  - flèches ‹ › (déplacement au tactile), bouton de largeur rapide, dupliquer, supprimer
  - clic sur un bloc : panneau de réglages (largeur, position verticale, alignement
    du texte) et contenu du bloc
  - barre du bas : ajouter un bloc (après le bloc sélectionné), Annuler (Ctrl+Z),
    aperçu ordinateur / téléphone, Terminer
- Nouveau bloc **« Espace vide »** pour laisser de la place (masqué sur téléphone).
- Contenu centré avec une largeur maximale sur grand écran ; tuiles « Enseignements »
  et sous-rubriques en colonnes sur ordinateur.
- Photos importées automatiquement réduites (1600 px, JPEG) pour économiser la mémoire.
- Alerte visible si la mémoire du navigateur est pleine (au lieu d'une perte silencieuse).
- L'ancien éditeur en liste de l'Administration est remplacé par l'éditeur visuel.

### v0.2.1 — 13/10/2026
- **Application installable** (PC, Android, iPhone) : ajout du manifest, des icônes
  ASEPS (dossier `public/icons/`) et d'un service worker (`public/sw.js`).
  Chrome/Edge proposent désormais « Installer » dans la barre d'adresse.
- Hors connexion : les pages déjà ouvertes restent consultables.

### v0.2.0 — 08/09/2026
- **Refonte en système de blocs** : chaque page (y compris la page d'accueil, désormais
  éditable) est composée d'une liste ordonnée de blocs — Bandeau (titre + fond),
  Texte, Photo, Vidéo, Diaporama, Liens externes
- **Page d'accueil éditable** : le bandeau titre peut désormais avoir un fond en
  couleur, en image, ou en **diaporama de photos défilantes** (vitesse réglable)
- **Diaporamas** disponibles comme bloc autonome sur n'importe quelle page, ou comme
  fond d'un bandeau
- **Réorganisation des blocs** : flèches monter/descendre (fiables au tactile) ET
  glisser-déposer à la souris sur ordinateur
- Les rubriques existantes ont été migrées vers ce nouveau système de blocs

### v0.1.0 — 08/09/2026
- Première version (coquille) : reprise du contenu du site existant
  (http://aseps.brassens.free.fr/) — rubriques Musculation (4 sous-pages),
  Sopra Flashmob, Échauffement, Sport & Santé, liens externes
- Espace Administration protégé par code PIN (1234 par défaut) :
  - Gestion complète des rubriques/sous-rubriques : ajout, renommage,
    suppression, réordonnancement
  - Éditeur de page : texte, fond (couleur ou image), photos/vidéos
    (fichier ou URL), liens externes
  - Gestion des documents à télécharger
  - Gestion des liens affichés en page d'accueil
- Stockage local (navigateur) pour l'instant — pas encore de synchronisation
  en ligne ni d'appli de dépôt pour les collègues (prochaine étape)
