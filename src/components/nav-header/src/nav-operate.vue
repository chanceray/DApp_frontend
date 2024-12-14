<template>
  <div class="nav-operate">
    <div class="operate-item">
      <el-badge is-dot class="item">
        <el-icon :size="18"><ChatDotRound /></el-icon>
      </el-badge>
    </div>
    <div class="operate-item">
      <el-badge is-dot class="item">
        <el-icon :size="18"><Bell /></el-icon>
      </el-badge>
    </div>
    <div class="operate-item">
      <el-icon :size="18"><Setting /></el-icon>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.nav-operate {
  display: flex;
  align-items: center;
  position: relative;
  top: 2px;

  .operate-item {
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
