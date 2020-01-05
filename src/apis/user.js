import myaxios from '../utils/myaxion'

export const Login = (data)=>{
    return myaxios({
        method : 'post',
        url : '/login',
        data
    })
}

export const getUser = (id)=>{
    return myaxios({
        url : `/user/${id}`,
        // 如果设置拦截器，则以后的每个请求不需要写下面一行代码
        headers : {'Authorization':localStorage.getItem('token')}
    })
}