import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 获取token
    let token = localStorage.getItem('token')
    // 判断是否有token，如果有，则以请求头的方式进行传递
    if(token){
        //  相当于headers:{'Authorization':localStorage.getItem('token')}
        config.headers.Authorization = token
    }
    // 可以拦截请求对报文进行处理，但是拦截器并不会代替你来发送请求，只是对发送请求时所传递的报文，数据进行必要的处理
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response)
    if(response.data.message == '用户信息验证失败' || response.data.message == '用户信息验证失败！') {
        // 需要跳转回登录页面
        window.location.href = '#/login'
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default axios
