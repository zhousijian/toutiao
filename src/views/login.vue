<template>
  <div id="login">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <myinput placeholder="请输入账号" v-model="user.username" :content='/^(\d{5,6})$|^(1\d{10})$/' msg="用户名或者手机号输入不正确"></myinput>
        <myinput placeholder="请输入密码" v-model="user.password" :content='/^\S{3,8}$/' msg="密码输入不正确"></myinput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <mybtn @mysonclick='login'>登&nbsp;录</mybtn>
    </div>
  </div>
</template>

<script>
import mybtn from "@/components/mybtn.vue";
import myinput from '@/components/myinput.vue'
import {Login} from '@/apis/login.js'
export default {
  data () {
    return {
        user : {
          username : '',
          password : ''
        }
    }
  },
  components: {
    mybtn,myinput
  },
  methods: {
    async login(){
      // console.log(111);
      // let res = await Login(this.user)
      // console.log(res);
      if(/^(\d{5,6})$|^(1\d{10})$/.test(this.user.username) && /^\S{3,16}$/.test(this.user.password)){
        let res = await Login(this.user)
        console.log(res);
        
        if(res.data.message == '登录成功'){
          // console.log('登录成功');
          this.$router.push({name : 'personal'})
          localStorage.setItem('token',res.data.data.token)
          localStorage.setItem('user',JSON.stringify(res.data.data.user))
        }else {
          this.$toast.fail(res.data.message)
        }
      }else {
        this.$toast.fail('用户信息输入不正确')
      }
      
     

    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>