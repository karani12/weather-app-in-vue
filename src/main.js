import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vant';
import 'vant/lib/index.css';
import './registerServiceWorker'



createApp(App).use(router).mount('#app')
