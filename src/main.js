import Vue from 'vue'
import App from './App.vue'
import router from './router'
import allcss from './assets/all.css'
import store from './store'

Vue.use(allcss);
//导入element-ui
import ElementUI from 'element-ui'
//导入elementui的css样式
import 'element-ui/lib/theme-chalk/index.css'
//将elementui注册到VUE
Vue.use(ElementUI);

//导入vue的axios
import Axios from "axios";
//将axios配置到vue中
Vue.prototype.$axios = Axios;

// //导入api
// import API from '@/api/index'
// //将api配置到vue中
// Vue.prototype.$api = API;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
