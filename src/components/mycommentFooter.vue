<template>
  <div class="comment1">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span class="comment" @click="$router.push({path:`/comment/${post.id}`})">
        <i class="iconfont iconpinglun-"></i>
        <em>{{post.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" @click="scwz" :class="{red:this.post.has_star}"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5"></textarea>
      <div>
        <span @click="myclick($refs.commtext.value)">发送</span>
        <span @click="quxiao">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { scarticle, issuecomment } from "@/apis/article";
export default {
  props: ["post", "obj"],
  data() {
    return {
      isFocus: false
    };
  },
  mounted() {
    setTimeout(() => {
      // console.log(this.post);
    }, 1000);
  },
  methods: {
    //   获取焦点时触发
    handlerFocus() {
      this.isFocus = !this.isFocus;
      // this.$refs.commtext.focus();
    },
    async scwz() {
      let res = await scarticle(this.post.id);
      //  console.log(res);
      this.post.has_star = !this.post.has_star;
      this.$toast.fail(res.data.message);
    },
    quxiao() {
      // console.log(123);
      
      this.isFocus = false;
      // console.log(this.isFocus);
      
      this.$emit('reset')
    },
    async myclick() {   // 方法一要加一个value形参
      // this.$emit('click',value)
      // this.isFocus = this.isFocuss
      // let res = await issuecomment(this.post.id,{content:this.$refs.commtext.value,parent_id:this.post.id})
      // console.log(res);

      // 方法二
      let data = {
        content : this.$refs.commtext.value
      }
      // console.log(this.obj)
      
      if(this.obj){
        // console.log(this.obj.id);
        // console.log(this.post.id);
        
        data.parent_id = this.obj.id
      }
      // console.log(data);
      
      let res = await issuecomment(this.post.id,data)
      // console.log(res);
      


      // 方法一
      // let res
      // if (this.obj) {
      //   res = await issuecomment(this.post.id, {
      //     content: this.$refs.commtext.value,
      //     parent_id: this.post.id
      //   });
      //   // console.log(res);
      // }else {
      //   res = await issuecomment(this.post.id, { content: value });
      // }
      // console.log(res);


      if (res.data.message == "评论发布成功") {
        this.isFocus = false;
        // window.scrollTo(0,0)

        // 清空文本框
        this.$refs.commtext.value = ''

        // 告诉父组件，评论发布成功了可以进行数据刷新
        this.$emit("fabuchenggong");
      }
      this.$toast.fail(res.data.message);

    }
  },
  watch: {
    obj() {
      // console.log(this.obj);
      
      // console.log(111);
      if(this.obj){
        this.isFocus = true;
      }
      // console.log(this.post.id);
    }
  }
};
</script>

<style lang='less' scoped>
.red {
  color: red;
}
.comment1 {
  width: 100vw;
  position: fixed;
  left: 0;
  bottom: 0;
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #aaa;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 15px;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>
