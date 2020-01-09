<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="guanzhu" :class="{guanzhu:mydata.has_follow}">{{mydata.has_follow?'已关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{mydata.title}}</div>
      <div class="desc">
        <span>{{mydata.user.nickname || mydata.users}}</span> &nbsp;&nbsp;
        <span>{{mydata.create_date}}</span>
      </div>
      <div class="content1" v-html="mydata.content" v-if="mydata.type == 1"></div>
      <video :src="mydata.content" v-if="mydata.type == 2" controls></video>
      <div class="opt">
        <span class="like"  @click="dianzan" :class="{dianzan:mydata.has_like}">
          <van-icon name="good-job-o" />{{`点赞(${mydata.like_length})`}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="http://127.0.0.1:3000/uploads/image/04.jpg" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
  </div>
</template>

<script>
import { articlexq,dzarticle } from '@/apis/article'
import { guanzhuyh,qxguanzhu } from '@/apis/user'
export default {
    data () {
        return {
            mydata : {
                user : ''
            }
        }
    },
  async mounted () {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    // console.log(this.$route.params.id);
    let id = this.$route.params.id
    let res = await articlexq(id)
    // console.log(res);
    this.mydata = res.data.data
    // console.log(this.mydata);
    
  },
  methods: {
      async guanzhu(){
        //   let res = await guanzhuyh(this.$route.params.id)
        //   console.log(res);
        let res
        if(this.mydata.has_follow) {
            res = await qxguanzhu(this.mydata.user.id)
        }else {
            res = await guanzhuyh(this.mydata.user.id)
        }
        this.mydata.has_follow = !this.mydata.has_follow
        this.$toast.fail(res.data.message)
      },
      async dianzan(){
          let res = await dzarticle(this.mydata.id)
          // console.log(res);
        if(res.data.message == '点赞成功'){
            ++this.mydata.like_length
        }else {
            --this.mydata.like_length
        }
          this.mydata.has_like = !this.mydata.has_like
          this.$toast.fail(res.data.message)
      }
  }
}
</script>

<style lang='less' scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    border: 1px solid #ddd;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
  }
}
.guanzhu {
    background-color: red;
}
.dianzan {
    border: 1px solide red;
    color: red;
}

.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content1 {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    /deep/.photo {
      /deep/a{
        display: flex;
        flex-direction: column
      }
    }
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
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
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
