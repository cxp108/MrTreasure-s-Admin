// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/';
// 第三方插件
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
window.axios = axios;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

Vue.use(BootstrapVue);
Vue.use(ElementUI);

//window.baseURL = 'http://resume.mrtreasure.cn/api';
window.baseURL = 'http://localhost:2001/api';

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
