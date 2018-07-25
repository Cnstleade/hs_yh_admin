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
import store from './store'
import "../src/assets/iconfont/iconfont.css";
import {
  powerRouter
} from './router';
import {
  get,
  post,
  put,
  patch
} from "./service/http";
import QRCode from 'qrcode';
import FastClick from 'fastclick'
import VueLozyLoad from 'vue-lazyload'
var qs = require('qs');
Vue.use(Element, {
  size: 'small',
  zIndex: 3000
});
FastClick.attach(document.body)
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
Vue.use(VueLozyLoad, {
  loading: require('./assets/logo.png'),
  error: require('./assets/logo.png'),
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
//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//   const role = localStorage.getItem('fk_username');
//   if(!role && to.path !== '/login'){
//       next('/login');
//   }else if(to.meta.permission){
//       // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//       role === 'admin' ? next() : next('/403');
//   }else{
//       // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//       if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
//           Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//               confirmButtonText: '确定'
//           });
//       }else{
//           next();
//       }
//   }
// })
//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//   const role = sessionStorage.getItem('fk_username');
//   if (!role && to.path !== '/login') {
//     next('/login');
//   } else next();

// })
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  console.log(to, store.getters.role);
  if (store.getters.role) { //判断role 是否存在
    let arr = Array.isArray(store.getters.role) ? store.getters.role : store.getters.role.split(',');
    console.log(arr);
    if (store.getters.newrouter.length !== 0) {
      let ar = arr.concat(['admin', '404', '403', 'login','appRegister'])
      next();
      if (ar.some(v => {
          return to.fullPath.slice(1) == v
        })) {
        next();
      } else {
        next('/403')
      }
    } else {

      let newrouter, roles = [];
      arr.forEach(role => {
        console.log(role);

        if (powerRouter[0].children.filter(route => {
            if (route.meta) {
              return route.meta.role == role
            } else {
              return true
            }
          })[0] !== undefined) {
          roles.push(
            powerRouter[0].children.filter(route => {
              if (route.meta) {
                return route.meta.role == role
              } else {
                return true
              }
            })[0]
          )
        }

      })
      newrouter = powerRouter
      newrouter[0].children = roles;
      router.addRoutes(newrouter) //添加动态路由
      console.log(newrouter, roles)
      store.dispatch('Roles', newrouter).then(res => {
        next({ ...to
        })
      }).catch(() => {

      })
    }
  } else {
    if (['/login'].indexOf(to.path) !== -1) {
      next()
    } else {
      sessionStorage.removeItem('hsjr_username');
      next('/login')
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,

  components: {
    App
  },
  template: '<App/>'
})
