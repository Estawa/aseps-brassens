# Site EPS — journal des changements

Version actuelle : **0.5.0**

---

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
