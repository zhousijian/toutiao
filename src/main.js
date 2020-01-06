import Vue from 'vue'
import App from './App.vue'

// 引入重置样式css
import '@/style/reset.css'

import { Toast,Icon,Uploader,Dialog,Field,Picker } from 'vant'
Vue.use(Picker)
   .use(Field)
   .use(Dialog)
   .use(Uploader)
   .use(Icon)
   .use(Toast);

// 引入路由组件
import router from '@/router/router.js'

Vue.config.productionTip = false

new Vue({
  // 注入，让整个应用都可以使用路由功能
  router,
  render: h => h(App),
}).$mount('#app')
