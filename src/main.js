import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import { store } from './store'
import router from './router'
import Alert from './components/Shared/Alert.vue'
import EditDialog from './components/Article/Edit/Edit.vue'
import DeleteDialog from './components/Article/Edit/Delete.vue'

Vue.use(Vuetify)
Vue.component('app-alert',Alert)
Vue.component('app-edit',EditDialog)
Vue.component('app-delete',DeleteDialog)

Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App),
  created(){
    var config = {
      apiKey: "AIzaSyD0aVH9sPiOA7OQyCdA9TQHhzMgOrHYuEQ",
      authDomain: "vuese-8becb.firebaseapp.com",
      databaseURL: "https://vuese-8becb.firebaseio.com",
      projectId: "vuese-8becb",
      storageBucket: "vuese-8becb.appspot.com",
    };
    firebase.initializeApp(config);
    firebase.auth().signOut()
    firebase.auth().onAuthStateChanged((user) => {
      //console.log('updatedUser')
      //console.log(user)
      if(user){
        this.$store.dispatch('loadsaveArticles')
        //console.log('1')
      }
      
    })
    this.$store.dispatch('loadArticles')
    
  }

}).$mount('#app')
