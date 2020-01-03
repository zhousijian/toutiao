import Vue from 'vue'
import App from './App.vue'

import '@/style/reset.css'

import { Toast } from 'vant'
Vue.use(Toast);

// 引入路由组件
import router from '@/router/index.js'

Vue.config.productionTip = false

new Vue({
  // 注入，让整个应用都可以使用路由功能
  router,
  render: h => h(App),
}).$mount('#app')
