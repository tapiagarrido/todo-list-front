import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './index.css';
import 'primeicons/primeicons.css'
import Toast from 'vue-toastification'; 
import 'vue-toastification/dist/index.css'; 

// Agregamos las opciones para nuestro toast
const options = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
};

const app = createApp(App)

app.use(createPinia());
app.use(router);
app.use(Toast, options);

app.mount('#app')
