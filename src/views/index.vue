<template>
  <div class="index">
    <!--    头部     -->
    <header>
      <div class="login">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="seach">
        <van-icon name="search" class="seh" />
        <span>搜索新闻</span>
      </div>
      <div class="user">
        <van-icon name="manager" />
      </div>
    </header>
    <!--    导航栏    -->
    <nav>
      <van-tabs v-model="active" sticky swipeable>
        <van-tab v-for="(v,i) in arr" :key="i" :title="v.name">
        </van-tab>
      </van-tabs>
    </nav>
    <!--    主体内容    -->
    <main></main>
  </div>
</template>

<script>
// import { articleList } from '@/apis/article'
import { categoryList } from '@/apis/category'
export default {
  data () {
    return {
      active : localStorage.getItem('token')?'0':'1',
      arr : ''
    }
  },
  async mounted () {
    // let res = await articleList()
    // console.log(res);
    
    // 获取栏目列表
    let res = await categoryList()
    // console.log(res);
    this.arr = res.data.data
    console.log(this.arr);
    
    
  }
};
</script>

<style lang="less" scoped>
.index {
  height: 3000px;
}
header {
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: rgb(209, 76, 76);
  .login span {
    color: #fff;
    font-size: 60px;
    padding: 0 15px;
  }
  .user {
    font-size: 28px;
    padding: 0 15px;
    color: #fff;
  }
  .seach {
    flex: 1;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    span {
      color: #fff;
      font-size: 20px;
    }
    .seh {
      color: #fff;
      font-size: 25px;
      margin-right: 5px;
      top: 5px;
    }
  }
}
nav {
  // margin-top: 50px;
  position: fixed;
  // margin-top: 100px;
  width: 100%;
  margin-top: 60px;
  background-color: #ccc;
  /deep/.van-ellipsis {
    background-color: rgb(230, 230, 230);
  }
}
</style>