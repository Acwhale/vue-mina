// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import './assets/style/reset.css'
import './assets/style/border.css'
import axios from 'axios'
import  config from '@/util/config'
Vue.config.productionTip = false
axios.defaults.baseURL = '/api';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['appkey'] = 'xJW1wcWQBDj3FBpX';
/* eslint-disable no-new */
fastclick.attach(document.body)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted(){
    console.log(config.config.api_base_url)
    console.log(config.config.appkey)
  }
})
