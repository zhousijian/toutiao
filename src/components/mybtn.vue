<template>
  <div class="mybtn" @click="myclick">
    <slot>插槽</slot>
  </div>
</template>

<script>
export default {
    methods: {
        myclick(e){
            this.$emit('mysonclick',e)
        }
    }
};
</script>

<style lang="less" scoped>
.mybtn {
    margin: 0 auto;
  width: 318 * 100vw/360;
  height: 50px;
  background-color:rgb(74, 199, 58);
  border-radius: 25px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  &:hover {
      opacity: 0.6;
  }
}
</style>