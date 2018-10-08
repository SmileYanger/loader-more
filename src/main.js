// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import { Loadmore } from 'mint-ui';
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.component(Loadmore.name, Loadmore);

Vue.use(MintUI);
Vue.config.productionTip = false
//Vue.prototype.HOST = '/api'
/* eslint-disable no-new */
var qs = require('qs');
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log(config)
    if(config.istype==1){
      
    }else{
       config.headers = {
         'Content-type': 'application/x-www-form-urlencoded'
       }
       config.url = 'https://www.weixianyu.cn/app/index.php',
       config.data.i = 192
       config.data.t = 0
       config.data.v = 3.0
       config.data.from = 'wxaccp'
       config.data.c = 'entry'
       config.data.a = 'wxaccp'
       config.data.m = 'zh_tcwq'
       // config.data.sign='87126dee0e09e612981c63ece01a8715'
       config.data = qs.stringify(config.data)
    }
   
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
  
new Vue({
  el: '#app',
  router,
  
  template: '<App/>',
  components: { App }
})
