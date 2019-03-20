import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import { store } from './store'
import router from './router'

Vue.use(Vuetify)

var config = {
  apiKey: "AIzaSyD0aVH9sPiOA7OQyCdA9TQHhzMgOrHYuEQ",
  authDomain: "vuese-8becb.firebaseapp.com",
  databaseURL: "https://vuese-8becb.firebaseio.com",
  projectId: "vuese-8becb",
  storageBucket: "vuese-8becb.appspot.com",
};
firebase.initializeApp(config);

Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App),
  created(){

  }
}).$mount('#app')
