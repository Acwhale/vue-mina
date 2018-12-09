// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import './assets/style/reset.css'
import './assets/style/border.css'
import axios from 'axios'
import config from '@/util/config'
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://bl.7yue.pro/v1/';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['appkey'] = 'xJW1wcWQBDj3FBpX';
/* eslint-disable no-new */
fastclick.attach(document.body)
import { Toast } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import 'vant/lib/Tabbar/style';
import 'vant/lib//Tabbar-Item/style';
Vue.use(Tabbar).use(TabbarItem);
import 'vant/lib//toast/style';
Vue.use(Toast);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})
