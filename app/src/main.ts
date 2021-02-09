import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';

if ('serviceWorker' in navigator) {
  // i should HOPE it is... but may as well check if we're importing dynamically anyway
  import('./registerServiceWorker');
}

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
