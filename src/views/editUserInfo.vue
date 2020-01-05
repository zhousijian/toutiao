<template>
  <div class="editUserInfo">
    <myheader title="编辑资料">
      <van-icon name="arrow-left" slot="left" />
      <!-- <van-icon name="arrow" slot="right" /> -->
    </myheader>
    <div class="touxiang">
      <label>
          <van-uploader :after-read="afterRead" />
      <img :src="user.head_img" alt />
      </label>
    </div>
    <myDYG left="昵称" :right="user.nickname"></myDYG>
    <myDYG left="密码" :right="user.password" type='password'></myDYG>
    <myDYG left="性别" :right="user.gender==='1'?'男':'女'"></myDYG>
  </div>
</template>

<script>
import myheader from "@/components/myheader"; // 头部栏
import myDYG from "../components/myDYG";    // 单元格
import { getUser } from '@/apis/user'
export default {
    data () {
        return {
            user : ''
        }
    },
  components: {
    myheader,
    myDYG
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    }
  },
  async mounted () {
      let res = await getUser(this.$route.params.id)
    //   console.log(res);
      if(res.data.message == '获取成功'){
          this.user = res.data.data
          if(this.user.head_img){
              this.user.head_img = 'http://127.0.0.1:3000'+res.data.data.head_img
          }else {
              this.user.head_img = 'http://127.0.0.1:3000/uploads/image/05.jpg'
          }
      }else {
          this.$toast.success('获取信息失败')
      }
      
  }
};
</script>

<style lang="less" scoped>
.touxiang {
  position: relative;
  height: 180px;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 9000vw/360;
    height: 9000vw/360;
    border: 1px solid black;
    border-radius: 50%;
    background-color: red;
  }
}
/deep/.van-uploader__upload {
  width: 9000vw/360;
  height: 9000vw/360;
}
/deep/.van-uploader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}
</style>