<template>
  <div class="comments">
    <myheader title="精彩评论">
      <!-- <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span> -->
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />

    </myheader>
    <div class="lists" v-for="(v,i) in mydata" :key="i">
      <div class="item">
        <div class="head">
          <img src="" alt />
          <div>
            <p>{{v.user.nickname}}</p>
            <span>{{v.user.create_date}}</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{v.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "@/components/myheader.vue";
import { commentlist } from '@/apis/article'
export default {
    data () {
        return {
            mydata : {}
        }
    },
  components: {
    myheader
  },
  async mounted () {
      let res = await commentlist(this.$route.params.id,{
          pageSize : 40,
          pageIndex : 1
      })
    //   console.log(res);
    this.mydata = res.data.data.length>0?res.data.data:this.mydata

    this.mydata = this.mydata.map(value => {
        value.head_img = 'http://127.0.0.1:3000' + value.head_img
        return value
    })
    // console.log(this.mydata);
    
      
  }
};
</script>

<style lang='less' scoped>
.lists {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
}
</style>