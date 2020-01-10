<template>
  <div class="index">
    <!--    头部     -->
    <header>
      <div class="login">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="seach" @click="$router.push({name : 'search'})">
        <van-icon name="search" class="seh" />
        <span>搜索新闻</span>
      </div>
      <div class="user">
        <van-icon name="manager" @click="$router.push({path : `/personal/${id}`})" />
      </div>
    </header>

    <div class="hidden"></div>

    <!--    导航栏    -->
    <nav>
      <van-tabs v-model="active" sticky swipeable :offset-top="60">
        <van-tab v-for="(v1,i1) in mydata" :key="i1" :title="v1.name">
          <!-- <articles v-for="(v2,i2) in v1.postList" :key="i2" :DATA="v2"></articles> -->
          <!-- <articles :DATA="mydata[active].postList"></articles> -->
          <van-list
            v-model="v1.loading"
            :finished="v1.finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="10"
          >
            <van-pull-refresh v-model="v1.isLoading" @refresh="onRefresh" success-text="刷新成功">
              <articles v-for="(v2,i2) in v1.postList" :key="i2" :DATA="v2"></articles>
            </van-pull-refresh>
            <!-- <articles v-for="(v2,i2) in v1.postList" :key="i2" :DATA="v2"></articles> -->
          </van-list>
        </van-tab>
      </van-tabs>
      <van-icon name="plus" @click="$router.push({name : 'lmManager'})" />
    </nav>
    <!--    主体内容    -->
    <main>
      <!-- <articles :DATA='mydata[active].postList'></articles> -->
    </main>
  </div>
</template>

<script>
import { articleList } from "@/apis/article";
import { categoryList } from "@/apis/category";
import articles from "@/components/articles";
export default {
  data() {
    return {
      id: localStorage.getItem("id"),
      active: localStorage.getItem("token") ? 1 : 0,
      mydata: {}
    };
  },
  components: {
    articles
  },
  methods: {

    // 下来刷新
    onRefresh() {
      // console.log(111);
      this.mydata[this.active].pageIndex = 1;
      this.mydata[this.active].postList.length = 0;
      // setTimeout(() => {
      this.info();
      // this.mydata[this.active].finished = false

      // }, 1000);

      // this.mydata[this.active].isLoading = false

      this.mydata[this.active].finished = false;
      // console.log(this.mydata[this.active].pageIndex);
      // console.log(222);
    },

    // 上拉列表
    onLoad() {
      if(this.mydata[this.active].isLoading == false){
        this.mydata[this.active].pageIndex++;
      // setTimeout(() => {
      this.info();
      // }, 1000);
      // console.log(this.mydata);
      // console.log(111);
      }
    },

    async info() {
      
      let res2 = await articleList({
        pageSize: this.mydata[this.active].pageSize,
        pageIndex: this.mydata[this.active].pageIndex,
        category: this.mydata[this.active].id
      });

      if (this.mydata[this.active].loading) {
        this.mydata[this.active].loading = false;
      }

      if (this.mydata[this.active].isLoading) {
        this.mydata[this.active].isLoading = false;
      }

      if (res2.data.data.length < this.mydata[this.active].pageSize) {
        this.mydata[this.active].finished = true;
      }

      // console.log(res2);
      this.mydata[this.active].postList.push(...res2.data.data);
      // console.log(this.mydata);
      // console.log(this.mydata[this.active].postList);
      // console.log(this.mydata[this.active]);
    }
  },
  async mounted() {
    // this.id = localStorage.getItem("id");
    // console.log(this.id);

    if(localStorage.getItem('list')){
      this.mydata = JSON.parse(localStorage.getItem('list'))
      if(localStorage.getItem('token')){
        this.mydata.unshift({id:0,name:'关注',is_top:1},{id:999,name:'头条',is_top:1})
      }else {
        this.mydata.unshift({id:999,name:'头条',is_top:1})
      }
    }else {
      // 获取栏目列表
    let res = await categoryList();
    // console.log(res);
    this.mydata = res.data.data;
    // console.log(this.mydata);
    }

    // 数据改造
    this.mydata = this.mydata.map(value => {
      return {
        ...value, // 展开对象，需要拿到里面的成员
        postList: [], // 这个栏目的新闻列表数据
        pageSize: 5, // 这个栏目每页所显示的记录数
        pageIndex: 1, // 这个栏目当前的页码
        loading: false, // 这个栏目的加载状态
        finished: false, // 这个栏目的数据是否加载完成
        isLoading: false // 这个栏目是否正在下拉刷新
      };
    });
    // console.log(this.mydata);

    // // 获取文章列表
    // let res2 = await articleList({
    //   pageSize: this.mydata[this.active].pageSize,
    //   pageIndex: this.mydata[this.active].pageIndex,
    //   category: this.mydata[this.active].id
    // });
    // // console.log(res2);
    // this.mydata[this.active].postList = res2.data.data;
    // // console.log(this.mydata);
    // // console.log(this.mydata[this.active].postList);
    this.info();
  },
  watch: {
    async active() {
      // console.log(this.active);
      // 获取文章列表
      // if(this.mydata[this.active].postList.length == 0){
      //   let res2 = await articleList({
      //   pageSize: this.mydata[this.active].pageSize,
      //   pageIndex: this.mydata[this.active].pageIndex,
      //   category: this.mydata[this.active].id
      // });
      // // console.log(res2);
      // this.mydata[this.active].postList = res2.data.data;
      // // console.log(this.mydata);
      // // console.log(this.mydata[this.active].postList);
      // }
      this.info();
    }
  }
};
</script>

<style lang="less" scoped>
// .index {
//   height: 3000px;
// }
header {
  display: flex;
  position: fixed;
  z-index: 1000;
  // margin-bottom: 50px;
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
  // position: fixed;
  // margin-top: 100px;
  top: 100px;
  width: 100%;
  display: flex;
  // margin-top: 60px;
  // background-color: rgb(19, 17, 17);
  /deep/.van-ellipsis {
    background-color: rgb(189, 189, 189);
  }
  /deep/.van-sticky {
    width: 90vw;
  }
  /deep/.van-tab__text {
    font-size:18px;
  }
  /deep/.van-icon-plus {
    position: fixed;
    display: inline-block;
    line-height: 44px;
    text-align: center;
    font-weight: 700;
    font-size: 20px;
    width: 10vw;
    height: 44px;
    z-index: 1000;
    right: 0;
    background-color: rgb(189, 189, 189);
  }
}
.hidden {
  height: 60px;
}
</style>