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
        <myinput placeholder="请输入账号" v-model="user.username" :content='/^(\d{5,6})$|^(1\d{10})$/' msg="用户名或者手机号输入规范"></myinput>
        <myinput placeholder="请输入密码" v-model="user.password" :content='/^\S{3,8}$/' msg="密码输入不规范"></myinput>
        <myinput placeholder="请输入昵称" v-model="user.nickname" :content='/^\S+$/' msg="昵称输入不规范"></myinput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/login" class>去登录</a>
      </p>
      <mybtn @mysonclick='register'>注&nbsp;册</mybtn>
    </div>
  </div>
</template>

<script>
import mybtn from "@/components/mybtn.vue";
import myinput from '@/components/myinput.vue'
import { register } from '@/apis/user'
export default {
    data () {
        return {
            user : {
                username : '',
                password : '',
                nickname : ''
            }
        }
    },
  components: {
    mybtn,myinput
  },
  methods: {
      async register(){
        //   console.log(111);
        // this.$router.push({name : 'login'})
        if(/^(\d{5,6})$|^(1\d{10})$/.test(this.user.username) && /^\S{3,8}$/.test(this.user.password) && /^\S+$/.test(this.user.nickname)){
          let res = await register(this.user)
        // console.log(res);
        if(res.data.message == '注册成功'){
            this.$toast.success('注册成功')
            this.$router.push({name : 'login'})
        }else {
            this.$toast.fail(res.data.message)
        }
        }else {
          this.$toast.fail('信息输入不规范')
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