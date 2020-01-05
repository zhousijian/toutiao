<template>
  <div class="myDYG">
    <div class="left">{{left}}</div>
    <div class="right">{{type==='password'?'******':right}}
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["left", "right","type"]
};
</script>

<style lang="less" scoped>
.myDYG {
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  > .right {
    font-size: 13px;
    color: #888;
  }
}
</style>