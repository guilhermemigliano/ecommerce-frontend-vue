import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

//url do serviço => gitpod npm spring-boot:run
axios.defaults.baseURL = 'https://8080-amber-barracuda-m7j6gr03.ws-us08.gitpod.io/ecommerce'


createApp(App).use(store).use(router).mount('#app')
