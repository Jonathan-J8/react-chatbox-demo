# Tchabox demo

- goal : create a chatbox who display client/user messages
- stack : react+typescript+vite

![Screenshot](screenshot.png)

## Folders structure

- ref : https://www.robinwieruch.de/react-folder-structure/

## Project Setup

```sh
npm install
```

```sh
npm run preview
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

## Constraints (in french)

- Ajouter un message (depuis l’input avec le texte en violet) qui s’affiche en bas de la zone. Il devra toujours être le dernier élément visible.
- Récupérer l’historique des messages en lazy loading (sous forme de pagination infinie) lors du scroll top (curseur en bleu)
- A l’initialisation, la page 1 contenant les premiers messages seront placés dans la zone d’affichage
- La hauteur du contenu (en vert) peut varier et sera précédée de la date d’insertion (en orange)
- Optimiser le rendu, pour n’avoir que les messages affichés dans le DOM.
- L’app doit être en Reactjs
- Pour simplifier le test, on pourra partir du principe que la pagination se fait sous forme de promise pour simuler un appel api, et peut soit être une donnée en dure, soit via un générateur.
- Les messages pourront être stockés dans un store.
- L’utilisation de libs externes est fortement conseillée.
- Il n’y a pas de notions d’utilisateurs / websocket ou autres dépendances.
