// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios';
import echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import jQuery from 'jquery'
import Element from 'element-ui';
import * as custom from './config/dateFilter';
import "../src/assets/iconfont/iconfont.css";
import { get, post, put, patch } from "./service/http";
import QRCode from 'qrcode' 
var qs = require('qs');
Vue.use(Element, {
  size: 'small',
  zIndex: 3000
});
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$qs = qs;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$put = put;
Vue.prototype.$patch = patch;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
