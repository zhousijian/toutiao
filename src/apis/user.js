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