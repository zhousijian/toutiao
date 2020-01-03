<template>
  <input type="text" @input="tell" :class="{suc:statu,err:!statu}" @blur="blur">
</template>

<script>
export default {
    props: ['content','msg'],
    data () {
        return {
            statu : true
        }
    },
    methods: {
        tell(e){
            let value = e.target.value
            if(this.content && this.content.test(value)){
                this.statu = true
            }else {
                this.statu = false
            }
            this.$emit('input',value)
        },
        blur(e){
            let value = e.target.value
            if(this.content && !this.content.test(value)){
                // console.log(this.msg || '输入不正确')
                this.$toast.fail(this.msg)
            }
        }
    }
}
</script>

<style lang="less" scoped>
    input {
        width:318/360*100vw;
        height: 60px;
        outline:none;
        border:none;
        border-bottom: 2px solid #ccc;
        font-size: 20px;
        line-height: 60px;
    }
    .err {
        border-bottom: 2px solid red;
    }
    .suc{
        border-bottom-color:rgb(64, 187, 64);
    }
</style>