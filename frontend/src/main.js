import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';

import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import { ToastService } from 'primevue';

import './assets/main.css'; // global css

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        unstyled: true ,
        pt: 'Lara',
    }
});
app.use(router);
app.mount('#app');
