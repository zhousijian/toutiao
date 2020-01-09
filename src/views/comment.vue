<template>
  <div class="comments">
    <myheader title="精彩评论">
      <!-- <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span> -->
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />

    </myheader>
    <div class="lists" v-for="(v,i) in mydata" :key="i">
      <div class="item">
        <div class="head">
          <img :src="v.user.head_img" alt />
          <div>
            <p>{{v.user.nickname}}</p>
            <span>{{v.user.create_date}}</span>
          </div>
          <span @click="huifu(v)">回复</span>
        </div>
        <commentItem v-if="v.parent" :parent='v.parent'></commentItem>
        <div class="text">{{v.content}}</div>
      </div>
    <!-- <mycommentFooter :post='v'></mycommentFooter> -->

    </div>
    <mycommentFooter :post='article' @fabuchenggong='fabuchenggong' :obj=commentObj @reset='commentObj=null'></mycommentFooter>
  </div>
</template>

<script>
import myheader from "@/components/myheader.vue";
import { commentlist,articlexq } from '@/apis/article'
import commentItem from '@/components/commentItem'
import mycommentFooter from '@/components/mycommentFooter'
export default {
    data () {
        return {
            mydata : [],
            article : {},
            commentObj : null
        }
    },
  components: {
    myheader,commentItem,mycommentFooter
  },
  async mounted () {
    
    this.init()

    let res2 = await articlexq(this.$route.params.id)
    // console.log(res2);
    this.article = res2.data.data
  },
  methods: {

    // 封装获取评论列表
    async init(){
      let res = await commentlist(this.$route.params.id,{
          pageSize : 40,
          pageIndex : 1
      })
      // console.log(res);
    this.mydata = res.data.data.length>0?res.data.data:this.mydata

    this.mydata = this.mydata.map(value => {
        value.user.head_img = 'http://127.0.0.1:3000' + value.user.head_img
        return value
    })
    // console.log(this.mydata);
    },


  //   async fabupinglun(value){
  //     // console.log(value);
  //     // console.log(this.$route.params.id);
  //     let res = await issuecomment(this.$route.params.id,{content:value})
  //     // console.log(res);
  //     if(res.data.message == '评论发布成功'){
  //       window.scrollTo(0,0)
  //       this.isFocus = false
  //     }
  //     this.$toast.fail(res.data.message)
  //   }

  // 刷新，回到顶位
    fabuchenggong(){
      this.init()
      window.scrollTo(0,0)
    },

    huifu(value){
      // console.log(this.mydata);
      this.commentObj = value
    }




  }
};
</script>

<style lang='less' scoped>
.comments {
  margin-bottom: 52px;
}
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