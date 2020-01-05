<template>
  <div class="myheader">
      <div class="left">
          <slot name="left"></slot>
      </div>
      <div class="center">{{title}}</div>
      <div class="right">
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style lang="less" scoped>
    .myheader {
        display: flex;
        padding: 20px 0;
        width: 100%;
        // height: 50px;
        font-size: 18px;
        border-bottom: 1px solid #ccc;
        justify-content: space-between;
        align-items: center;
        .center {
            font-weight: 700;
            // text-align: center;
        }
        .left,.right {
            padding: 0 10px;
        }
    }
</style>