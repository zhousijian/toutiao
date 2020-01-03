import myaxios from '../utils/myaxion'

export const Login = (data)=>{
    return myaxios({
        method : 'post',
        url : '/login',
        data
    })
}