import Vue from 'vue'
import * as firebase from 'firebase'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import { store } from './store'
import DateFilter from './filters/date'
import Alert from './components/Shared/Alert.vue'

Vue.use(Vuetify, { theme: {
  primary: colors.red.darken4,
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({ // Change credentials after tests..
      apiKey: 'AIzaSyB98wEos_bjesmROHr2t740sJ_eLj_Fj-4',
      authDomain: 'cultist-meetup.firebaseapp.com',
      databaseURL: 'https://cultist-meetup.firebaseio.com',
      projectId: 'cultist-meetup',
      storageBucket: 'cultist-meetup.appspot.com'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
