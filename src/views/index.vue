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
      
    </nav>
    <!--    主体内容    -->
    <main>

    </main>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  header {
    display: flex;
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
      background-color: rgba(255, 255, 255,.5);
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
</style>