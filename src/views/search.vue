<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search
        v-model="userKey"
        placeholder="请输入搜索关键词"
        shape="round"
      >
      </van-search>
      <div @click="onSearch(userKey)">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <!-- <router-link to="" v-for="(v,i) in searchs" :key="i" @click="search">{{v}}</router-link> -->
      <a href="javascript:;" v-for="(v,i) in searchs" :key="i" @click="onSearch(v)">{{v}}</a>
      <!-- <router-link to="">美女</router-link> -->
    </div>
    <div class="historyList">
      <h2>搜索结果</h2>
      <router-link :to="{path : `/articlexq/${v.id}`}" v-for="(v,i) in mydata" :key="i">{{v.title}}</router-link>
      <!-- <router-link to="">美女</router-link> -->
    </div>
  </div>
</template>

<script>
import { searchArticle } from '@/apis/article'
export default {
  data(){
    return {
      userKey:'',
      mydata : [],
      searchs : []  // 存储搜索历史的记录
    }
  },
  mounted () {
    // 聚焦
    document.querySelector('.van-field__control').focus()

    if(localStorage.getItem('sch')){
      this.searchs = JSON.parse(localStorage.getItem('sch'))
      // if(this.searchs.indexOf(this.userKey) == 0){
      //   let index = this.searchs.indexOf(this.userKey)
      //   this.searchs.splice(index,1)
      //   this.searchs.unshift(this.userKey)
      //   localStorage.setItem('sch',JSON.stringify(this.searchs))
      // }else {
      //   this.searchs.unshift(this.userKey)
      //   localStorage.setItem('sch',JSON.stringify(this.searchs))
      // }
      // this.searchs = JSON.parse(localStorage.getItem('sch'))
    }
    // console.log(this.searchs);
    
    
  },
  methods:{
    async onSearch(value){
      let res = await searchArticle({
        keyword : value
      })
      // console.log(this.userKey);
      // console.log(res);
      this.mydata = res.data.data
      // this.searchs.unshift(this.userKey)
      // console.log(this.searchs);
      // localStorage.setItem('sch',JSON.stringify(this.searchs))
      // console.log(this.searchs);
      
      // console.log(this.searchs.indexOf(value));
      
      if(this.searchs.indexOf(value) !== -1){
        let index = this.searchs.indexOf(value)
        // console.log(this.searchs);
        // console.log(JSON.parse(localStorage.getItem('sch')));
        // console.log(index);
        this.searchs.splice(index,1)
        this.searchs.unshift(value)
        localStorage.setItem('sch',JSON.stringify(this.searchs))
      }else {
        this.searchs.unshift(value)
        localStorage.setItem('sch',JSON.stringify(this.searchs))
      }
    },
    // search(v){
    //   console.log(v);
      
    // }
  }
}
</script>

<style lang='less' scoped>
  .header{
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    .van-search{
      flex: 1;
      padding: 5px 12px;
    }
  }
  .historyList{
    padding:10px;
    border-bottom: 1px solid #ccc;
    h2{
      line-height: 40px;
      font-weight: bold;
    }
    > a {
      display: block;
      text-decoration: underline;
      line-height: 30px;
      color:#666;
    }
  }
</style>