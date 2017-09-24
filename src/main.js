// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/';
// 第三方插件
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import axios from 'axios';
window.axios = axios;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['token'] = 'token-Sunshine';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

//window.baseURL = 'http://resume.mrtreasure.cn/api';
window.baseURL = process.env.API;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
