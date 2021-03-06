import myaxios from '../utils/myaxios'


// 登录
export const Login = (data)=>{
    return myaxios({
        method : 'post',
        url : '/login',
        data
    })
}

// 用户详情
export const getUser = (id)=>{
    return myaxios({
        url : `/user/${id}`,
        // 如果设置拦截器，则以后的每个请求不需要写下面一行代码
        // headers : {'Authorization':localStorage.getItem('token')}
    })
}

// 编辑用户信息
export const editInfo = (id,data)=>{
    return  myaxios({
        method : 'post',
        url : `/user_update/${id}`,
        data
    })
}

// 注册
export const register = (data)=>{
    return myaxios({
        method : 'post',
        url : '/register',
        data
    })
}

// 关注
export const guanzhuyh = (id)=>{
    return myaxios({
        url : `/user_follows/${id}`
    })
}

// 取消关注
export const qxguanzhu = (id)=>{
    return myaxios({
        url : `/user_unfollow/${id}`
    })
}

// 用户关注列表
export const userfollowlist = ()=>{
    return myaxios({
        url : `/user_follows`
    })
}

// 收藏文章列表
export const scarticlelist = ()=>{
    return myaxios({
        url : '/user_star'
    })
}

