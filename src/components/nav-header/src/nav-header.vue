<template>
  <div class="nav-header">
    <div class="search">
      <!-- <el-input placeholder="搜索..." :prefix-icon="Search" style="width: 100%" /> -->
    </div>
    <div class="operations">
      <!-- <nav-operate></nav-operate> -->
      <user-info />
    </div>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import UserInfo from './user-info.vue'
// import NavOperate from './nav-operate.vue'
</script>

<style lang="less" scoped>
.nav-header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search {
    width: 30%;
    :deep(.el-input__wrapper) {
      background-color: #ededed;
    }
  }

  .operations {
    // flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    padding-top: 10px;
  }
}
</style>
