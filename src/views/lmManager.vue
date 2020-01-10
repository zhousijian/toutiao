<template>
  <div class="manager">
    <myheader title="栏目管理">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </myheader>
    <div class="main">
      <p>点击删除以下频道</p>
      <div class="pindao">
        <span v-for="(v,i) in managerlist" :key="i" @click="del(i)">{{v.name}}</span>
      </div>
    </div>
    <div class="main">
      <p>点击添加以下频道</p>
      <div class="pindao">
        <span v-for="(v,i) in tjmanagerlist" :key="i" @click="add(i)">{{v.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "@/components/myheader";
import { categoryList } from '@/apis/category'
export default {
  data () {
    return {
      managerlist : [],
      tjmanagerlist : []
    }
  },
  components: {
    myheader
  },
  async mounted () {
    let res = await categoryList()
    // console.log(res);
    if(localStorage.getItem('token')){
      if(localStorage.getItem('list')){
        this.managerlist = JSON.parse(localStorage.getItem('list'))
      }else {
        this.managerlist = res.data.data.splice(2)
      }
    }else {
      if(localStorage.getItem('list')){
        this.managerlist = JSON.parse(localStorage.getItem('list'))
      }else {
        this.managerlist = res.data.data.splice(1)
      }
    }
    // console.log(this.managerlist);
      if(localStorage.getItem('nolist')){
        this.tjmanagerlist = JSON.parse(localStorage.getItem('nolist'))
      }
    
  },
  methods: {
    // 点击删除频道
    del(i){
      // console.log(i);
      let delList = this.managerlist.splice(i,1)[0]
      console.log(delList);
      this.tjmanagerlist.unshift(delList)
      // console.log(this.tjmanagerlist);
      localStorage.setItem('nolist',JSON.stringify(this.tjmanagerlist))
      
      let list = this.managerlist
      localStorage.setItem('list',JSON.stringify(list))

      // this.tjmanagerlist = JSON.parse(localStorage.getItem('nolist'))
    },
    add(i){
      // console.log(i);
      // console.log(this.tjmanagerlist.splice(i)[0]);
      // console.log(i);
      // JSON.parse(localStorage.getItem('nolist')).splice(i,1)
      this.tjmanagerlist = JSON.parse(localStorage.getItem('nolist'))
      // console.log(xiadata);
       let res = this.tjmanagerlist.splice(i,1)
      // console.log(xiadata);
      localStorage.setItem('nolist',JSON.stringify(this.tjmanagerlist))
      // let res = xiadata.splice(i,1)
      // console.log(xiadata);
      // console.log(res);
      this.managerlist = JSON.parse(localStorage.getItem('list'))
      this.managerlist.push(res[0])
      // console.log(shangdata);
      localStorage.setItem('list',JSON.stringify(this.managerlist))
      
      
      // console.log(JSON.parse(localStorage.getItem('nolist')));
      
      
      // localStorage.setItem('nolist',JSON.stringify(this.tjmanagerlist.splice(i)))
      
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  padding: 15px;
  border: 1px solid #ccc;
  padding-bottom: 20px;
  p {
    color: rgb(61, 61, 61);
    // background-color: rgb(212, 212, 212);
    padding: 10px;
    padding-bottom: 0;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .pindao {
    display: flex;
    flex-wrap: wrap;
  }
  span {
    border: 1px solid #ccc;
    padding: 10px 15px;
    margin-right: 15px;
    flex: 0 0 14%;
    font-size: 18px;
    // display: flex;
    // align-items: center;
    text-align: center;
    margin-top: 15px;
  }
}
</style>