<template>
  <div id="personal">
    <router-link to="/edit_profile">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img src="http://img1.imgtn.bdimg.com/it/u=3757784226,1202878475&fm=26&gp=0.jpg" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>我就是我
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <myDYG left='我的关注' right='关注的用户'></myDYG>
    <myDYG left='我的跟帖' right='跟帖/回复'></myDYG>
    <myDYG left='我的收藏' right='文章/视频'></myDYG>
    <myDYG left='设置'></myDYG>
    <mybtn class="mybtn">退出</mybtn>
  </div>
</template>

<script>
import myDYG from '@/components/myDYG'
import mybtn from '@/components/mybtn'
export default {
  components: {
    myDYG,mybtn
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