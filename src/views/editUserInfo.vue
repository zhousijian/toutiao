<template>
  <div class="editUserInfo">
    <myheader title="编辑资料">
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
      <!-- <van-icon name="arrow" slot="right" /> -->
    </myheader>
    <div class="touxiang">
      <label>
        <van-uploader :after-read="afterRead" />
        <img :src="user.head_img" alt />
      </label>
    </div>
    <myDYG left="昵称" :right="user.nickname" @click="nickshow=true"></myDYG>
    <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="updatenick">
      <van-field :value="user.nickname" placeholder="请输入昵称" required label="昵称" ref="nick" />
    </van-dialog>

    <myDYG left="密码" :right="user.password" type="password" @click="passshow=!passshow"></myDYG>
    <van-dialog v-model="passshow" title="修改密码" show-cancel-button :before-close='beforeClose'>
      <van-field placeholder="请输入旧密码" required label="旧密码" ref="jiupass" />
      <van-field placeholder="请输入新密码" required label="新密码" ref="newpass" />
    </van-dialog>

    <myDYG left="性别" :right="user.gender=='0'?'女':'男'" @click="gendershow=true"></myDYG>
    <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm="updateGender">
      <!--  上面需要加事件代码@confirm="updateGender" -->
      <!-- <van-field :value="user.gender=='1'?'男':'女'" placeholder="请输入性别" required label="性别" ref="gender" /> -->
      <van-picker :columns="['女','男']" :default-index="user.gender" @change="onChange" />
    </van-dialog>
  </div>
</template>

<script>
import myheader from "@/components/myheader"; // 头部栏
import myDYG from "../components/myDYG"; // 单元格
import { getUser, editInfo } from "@/apis/user";
import { upload } from "@/apis/upload"; // 文件上传api
// import { editInfo } from '@/apis/user'
export default {
  data() {
    return {
      user: "",
      nickshow: false,
      gendershow: false,
      gender: "",
      passshow : false
    };
  },
  components: {
    myheader,
    myDYG
  },
  methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      //   console.log(file);
      let data = new FormData();
      data.append("file", file.file);
      let res = await upload(data);
      // console.log(res);
      if (res.data.message == "文件上传成功") {
        // console.log(111);
        this.user.head_img = "http://127.0.0.1:3000" + res.data.data.url;

        let res2 = await editInfo(this.user.id, {
          head_img: res.data.data.url
        });
        // console.log(res2);
        if (res2.data.message == "修改成功") {
          // this.user.head_img = 'http://127.0.0.1:3000'+res2.data.data.head_img
          this.$toast.fail(res2.data.message);
        } else {
          this.$toast.fail("修改失败");
        }
      } else {
        this.$toast.fail("文件上传失败");
      }
    },
    async updatenick() {
      // console.log(111);
      // 封装的van-filed中，文本框的ref值就是input
      let value = this.$refs.nick.$refs.input.value;
      // console.log(value);
      let res = await editInfo(this.user.id, { nickname: value });
      // console.log(res);
      if (res.data.message == "修改成功") {
        this.user.nickname = res.data.data.nickname;
        this.$toast.fail(res.data.message);
      } else {
        this.$toast.fail(res.data.message);
      }
    },
    // eslint-disable-next-line no-unused-vars
    onChange(picker, value, index) {
      // this.Toast(`当前值：${value}, 当前索引：${index}`);
      this.gender = index;
    },
    async updateGender() {
      // console.log(this.gender);

      let res = await editInfo(this.user.id, { gender: this.gender });
      // console.log(res);
      if (res.data.message == "修改成功") {
        this.user.gender = res.data.data.gender;
        this.$toast.fail(res.data.message);
      } else {
        this.$toast.fail("修改失败");
      }
    },
    // async updateGender(){
    //     let value = this.$refs.gender.$refs.input.value
    //     console.log(value);
    //     if(value == '男' || value == '女'){
    //       if(value == '男'){
    //         let res = await editInfo(this.user.id,{gender:'1'})
    //         console.log(res);
    //         this.user.gender = res.data.data.gender
    //       }else {
    //         let res = await editInfo(this.user.id,{gender:'0'})
    //         this.user.gender = res.data.data.gender
    //       }
    //     }
    //     // if(value == '男' || value == '女'){
    //     //     let res = await editInfo(this.user.id,{gender:value})
    //     //     // console.log(res);
    //     //     console.log(this.user);

    //     //     if(value == '男'){
    //     //         this.user.gender = '1'

    //     //     }else {
    //     //         this.user.gender = '0'
    //     //     }
    //     //     console.log(this.user.gender)
    //     //     this.$toast.fail(res.data.message)

    //     // }
    //     // else {
    //     //     this.$toast.fail('请正确输入性别')
    //     // }

    // }
    async beforeClose(action,done){
      // console.log(action);
      // done(false)
      if(action == 'confirm'){
        let jiupass = this.$refs.jiupass.$refs.input.value
        if(this.user.password == jiupass){
          let newpass = this.$refs.newpass.$refs.input.value
          if(/\S{3,9}/.test(newpass)){
            // eslint-disable-next-line no-unused-vars
            let res = await editInfo(this.user.id,{password:newpass})
            // console.log(res);
            done()
          }else {
            this.$toast.fail('请规范输入新密码')
            done(false)
          }
        }else {
          this.$toast.fail('旧密码输入不正确')
          done(false)
        }
      }else {
        done()
      }
    }
  },
  async mounted() {
    let res = await getUser(this.$route.params.id);
    //   console.log(res);
    if (res.data.message == "获取成功") {
      this.user = res.data.data;
      if (this.user.head_img) {
        this.user.head_img = "http://127.0.0.1:3000" + res.data.data.head_img;
      } else {
        this.user.head_img = "http://127.0.0.1:3000/uploads/image/05.jpg";
      }
    } else {
      this.$toast.success("获取信息失败");
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