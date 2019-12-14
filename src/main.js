import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from "./router/indexRouter";
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSimpleAlert from "vue-simple-alert";
import store from './store/store'

Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.use(VueSimpleAlert)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
