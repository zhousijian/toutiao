<template>
  <div id="personal">
    <router-link :to="`/editUserInfo/${this.userInfo.id}`">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="userInfo.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>
            {{userInfo.nickname}}
          </div>
          <div class="time">{{userInfo.create_date | dateFormat}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <myDYG left="我的关注" right="关注的用户" @click="$router.push({name : 'myfollow'})"></myDYG>
    <myDYG left="我的跟帖" right="跟帖/回复"></myDYG>
    <myDYG left="我的收藏" right="文章/视频" @click="$router.push({name : 'scarticle'})"></myDYG>
    <myDYG left="设置"></myDYG>
    <mybtn class="mybtn" @mysonclick='click'>退出</mybtn>
    <mybtn class="mybtn" @mysonclick="$router.push({name : 'index'})">返回首页</mybtn>
  </div>
</template>

<script>
import myDYG from "@/components/myDYG";
import mybtn from "@/components/mybtn";
import { getUser } from "@/apis/user";
import { dateFormat } from '@/filters/myfilters'
export default {
  data() {
    return {
      userInfo: ""
    };
  },
  filters: {
    dateFormat
  },
  components: {
    myDYG,
    mybtn
  },
  async mounted() {
    let res = await getUser(this.$route.params.id);
    // console.log(res);
    if (res.data.message == "获取成功") {
      this.userInfo = res.data.data;
      this.userInfo.head_img = "http://127.0.0.1:3000" + this.userInfo.head_img;
      // console.log(this.userInfo);
    }else {
      this.$router.push({name:'login'})
    }
  },
  methods: {
    click(){
      // console.log(111);
      localStorage.removeItem('token')
      this.$router.push({name:'index'})
      
    }
  }
};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.mybtn {
  background-color: red;
  margin-top: 20px;
}
</stylel>