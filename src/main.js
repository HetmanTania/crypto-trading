import { createApp } from 'vue'
import store from './store/store.js';
import router from './router/router.js';
import App from './App.vue'
import "../public/css/mystyles.css"


createApp(App).use(store).use(router).mount('#app')
