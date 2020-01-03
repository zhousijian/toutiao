// 1引入vue
import Vue from 'vue'

// 2引入vue-router
import VueRouter from 'vue-router'

// 6.1引入路由所需要映射的组件
import Login from '@/views/login.vue'

// 3挂在==挂载
Vue.use(VueRouter)

// 4创建路由对象
let router = new VueRouter({
    // 5配置路由
    routes : [
        // 6配置具体路由
        {
            name : 'login',
            path : '/login',
            component : Login
        }
    ]
})

// 暴露
export default router