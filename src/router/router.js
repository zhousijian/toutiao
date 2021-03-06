// 1引入vue
import Vue from 'vue'

// 2引入vue-router
import VueRouter from 'vue-router'

// 6.1引入路由所需要映射的组件
import Login from '@/views/login.vue'   // 登录页面
import Personal from '@/views/personal.vue'     // 个人中心
import EditUserInfo from '@/views/editUserInfo.vue'    // 编辑信息
import Index from '@/views/index.vue'   // 首页
import Register from '@/views/register.vue'  // 注册页面
import Articlexq from '@/views/articlexq.vue'   // 新闻详情页面
import Myfollow from '@/views/myfollow.vue'   // 我的关注
import Scarticle from '@/views/SCarticle.vue'   // 我的收藏
import Comment from '@/views/comment.vue'   // 评论页面
import LmManager from '@/views/lmManager.vue'   // 栏目管理
import Search from '@/views/search.vue'     // 搜索页面


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
        },
        {
            name : 'personal',
            path : '/personal/:id',
            component : Personal
        },
        {
            name : 'editUserInfo',
            path : '/editUserInfo/:id',
            component : EditUserInfo
        },
        {
            name : 'index',
            path : '/',
            component : Index
        },
        {
            name : 'register',
            path : '/register',
            component : Register
        },
        {
            name : 'articlexq',
            path : '/articlexq/:id',
            component : Articlexq
        },
        {
            name : 'myfollow',
            path : '/myfollow',
            component : Myfollow
        },
        {
            name : 'scarticle',
            path : '/scarticle/:id',
            component : Scarticle
        },
        {
            name : 'comment',
            path : '/comment/:id',
            component : Comment
        },
        {
            name : 'lmManager',
            path : '/lmManager',
            component : LmManager
        },
        {
            name : 'search',
            path : '/search',
            component : Search
        }
    ]
})

// 7添加导航守卫：前置卫士：在跳转之前进行调用
// 所有路由跳转请求都会经过这个导航守卫
// to：目标路由
// from：源路由
// next：下一步的操作，就是用户当前需要进行的操作
router.beforeEach((to, from, next) => {
    // console.log(to);
    // console.log(from);
    // console.log(next);
    if(to.path.indexOf('/personal') ===0 ){
        let token = localStorage.getItem('token')
        if(token){
            next()
        }else {
            next({name:'login'})
        }
    }else {
        next()
    }
    
    
    
})

// 暴露
export default router