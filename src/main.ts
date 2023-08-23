import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

import {store, key } from './store';
import router from './router';

const app = createApp(App);

app.use(store, key);
app.use(router);
app.use(vuetify);

app.mount('#app')
