<template>
  <div class="not-found">
    <el-empty class="empty" description="页面不存在" :image-size="200"></el-empty>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.not-found {
  width: 100%;
  height: 100%;
  position: relative;
  .empty {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
  }
}
</style>
