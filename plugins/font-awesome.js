// plugins/font-awesome.js

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Ajouter les icônes à la bibliothèque
library.add(faEye, faEyeSlash);

// Ensuite, vous devez enregistrer le composant FontAwesomeIcon globalement
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("FontAwesomeIcon", FontAwesomeIcon);
});
