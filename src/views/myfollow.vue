<template>
  <div class="myfollow">
    <myheader title="我的关注">
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
    </myheader>
    <div class="list" v-for="(v,i) in mydata" :key="i">
      <div class="box">
        <img :src="v.head_img" alt />
        <div class="center">
          <p>{{v.nickname}}</p>
          <span>{{v.create_date}}</span>
        </div>
        <span @click="unfollow(v.id,i)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "@/components/myheader";
import { userfollowlist,qxguanzhu } from '@/apis/user'
export default {
  data () {
    return {
      mydata : {}
    }
  },
  components: {
    myheader
  },
  methods: {
    async unfollow(id,i){
      // console.log(111);
      let res = await qxguanzhu(id)
      // console.log(res);
      // console.log(i);
      if(res.data.message == '取消关注成功'){
        this.$toast.success(res.data.message)
        this.mydata.splice(i,1)
      }
      
      
    }
  },
  async mounted () {
    let res = await userfollowlist()
    // console.log(res);
    this.mydata = res.data.data.map(value=>{
      value.head_img = 'http://127.0.0.1:3000' + value.head_img
      return value
    })
    // console.log(this.mydata);
    
    
  }
};
</script>

<style lang='less' scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>