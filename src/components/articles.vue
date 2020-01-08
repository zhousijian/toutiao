<template>
  <div class="single" v-if="DATA.type==1 && DATA.cover.length < 3">
    <div class="left">
      <p class="content">{{DATA.title}}</p>
      <p class="info">
        <span>{{DATA.user.nickname}}</span>
        <span>{{DATA.comment_length}}跟帖</span>
      </p>
    </div>
    <div class="img">
      <img :src="DATA.cover[0].url" alt />
    </div>
  </div>
  <div class="single" v-else-if="DATA.type==2">
    <div class="left">
      <p class="content">{{DATA.title}}</p>
      <div class="img2">
        <img :src="DATA.cover[0].url" alt />
        <div class="tubiao">
          <van-icon name="play" />
        </div>
      </div>
      <p class="info">
        <span>{{DATA.user.nickname}}</span>
        <span>{{DATA.comment_length}}跟帖</span>
      </p>
    </div>
  </div>
  <div class="single" v-else-if="DATA.type==1 && DATA.cover.length >= 3">
    <div class="left">
      <p class="content">{{DATA.title}}</p>
      <div class="img3">
        <img :src="v.url" alt v-for="(v,i) in DATA.cover" :key="i" />
      </div>
      <p class="info">
        <span>{{DATA.user.nickname}}</span>
        <span>{{DATA.comment_length}}跟帖</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
    props: ['DATA'],
    mounted () {
        // console.log(this.DATA);
    }
}
</script>

<style lang='less' scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  background-color: rgb(236, 236, 236);
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    .content {
      font-size: 14px;
      padding: 0px 5px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .info {
    margin-top: 5px;
    font-size: 12px;
    padding-left:5px;
    color: #999;
    > span:nth-of-type(1) {
      padding-right: 15px;
    }
  }
  .img {
    display: flex;
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    // object-fit: cover;  // 开启时保持图片不变形
    padding-right: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .img3 {
    display: flex;
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    // object-fit: cover;  // 开启时保持图片不变形
    padding-right: 5px;
    img {
      width: 100%;
      height: 100%;
      &:nth-of-type(2) {
      border-left: 2px solid #fff;
      border-right: 2px solid #fff;
    }
    }
    
  }
  .img2 {
    // height: 100vw;
    width: 100vw;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      padding: 10px;
    }
    .tubiao {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      font-size: 50px;
      border: 1px solid #ccc;
      border-radius: 50%;
      color: #fff;
      background-color: rgba(255,255,255,.2);
    }
  }
  .imgs {
    display: flex;
    padding: 10px 0 0 0;
    > img {
      flex: 1;
      padding: 0 5px;
      box-sizing: border-box;
      display: block;
    }
  }
  .video {
    width: 100%;
    height: 170/360 * 100vw;
    padding: 10px;
    box-sizing: border-box;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>