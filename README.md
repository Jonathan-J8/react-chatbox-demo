# React Chatbox Demo

- goal : create a chatbox who display client/user messages
- stack : react+typescript
- additionnal stack : vite+react-infinite-scroll-component+uuid

![Screenshot](./public/screenshot.png)

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
- partir du principe que la pagination se fait sous forme de promise pour simuler un appel api, et peut soit être une donnée en dure, soit via un générateur.
- Les messages pourront être stockés dans un store.
- utilisation de libs externes.
- Il n’y a pas de notions d’utilisateurs / websocket ou autres dépendances.

## Todo

- [x] basic css
- [x] isolate chatbox by user and client ids
- [x] faking client incom message with https://jsonplaceholder.typicode.com/
- [x] faking database api with localStorage
- [x] lazy load previous messages
- [x] load range of messages on init
- [x] load range of messages on scroll to top
- [x] e2e tests
- [ ] button scroll down on new message
- [ ] scroll down on chatbox focus
- [ ] redux store for messages notifications
- [ ] add https://ant.design/ library
