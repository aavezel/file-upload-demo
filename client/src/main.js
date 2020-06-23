import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
  beforeCreate() {
    store.dispatch("LOAD_FILES_LIST");
  }
}).$mount('#app')


