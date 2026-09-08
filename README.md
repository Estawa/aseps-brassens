# Site EPS — Lycée Georges-Brassens

Refonte du site EPS/ASEPS (remplace http://aseps.brassens.free.fr/), en React + Vite,
avec un espace d'administration protégé par code PIN permettant de gérer entièrement
la structure du site (rubriques, sous-rubriques, ordre) et le contenu de chaque page
(texte, fond couleur/image, photos/vidéos, liens externes), sans toucher au code.

## Démarrer en local

```
npm install
npm run dev
```

## Déploiement (même méthode que les autres projets)

1. Créer un dépôt GitHub (compte Estawa), y déposer tout le contenu de ce dossier.
2. Connecter le dépôt à Vercel (import de projet).
3. Chaque commit sur GitHub redéploie automatiquement le site.

## Code d'administration

Code PIN par défaut : **1234** — à changer avant la mise en ligne (variable `pinAdmin`
dans `src/App.jsx`, ligne `useState(() => lsLire("pinAdmin", "1234"))`). Une fois
déverrouillé, l'espace Administration (menu ☰ → « Administration ») permet de :

- Ajouter / renommer / supprimer / réordonner les rubriques et sous-rubriques
- Éditer le contenu de chaque page : texte, fond (couleur ou image), photos/vidéos
  (import de fichier ou URL), liens externes
- Gérer les documents à télécharger
- Gérer les liens affichés sur la page d'accueil

## Ce qui n'est PAS encore fait (prochaine étape)

- L'appli de dépôt pour les collègues (identification par code perso, envoi de
  photos/vidéos, consultation des pages) — nécessitera un stockage en ligne
  partagé (Firebase, comme pour EPS Pro) puisque plusieurs personnes doivent
  voir/modifier les mêmes données depuis des appareils différents.
- Pour l'instant, tout le contenu (rubriques, documents, médias importés) est
  stocké uniquement sur l'appareil utilisé — rien n'est encore partagé en ligne.
- Un second niveau de code d'accès (« collègue de confiance ») est prévu pour
  plus tard, une fois la synchronisation en ligne en place.
