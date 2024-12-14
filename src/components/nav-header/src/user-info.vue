<template>
  <div class="user-info">
    <el-icon :size="30" color="#ced8df">
      <User />
    </el-icon>
    <div class="names">
      <div class="name">{{ userInfo.name }}</div>
    </div>
    <el-button color="#1d65e3" @click="logoff">退出</el-button>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import localCache from '../../../utils/cache'
import { User } from '@element-plus/icons-vue'

const store = useStore()
const router = useRouter()
const userInfo = store.state.login.userInfo

const logoff = () => {
  localCache.clearCache()
  router.push('/login')
}
</script>

<style lang="less" scoped>
.user-info {
  display: flex;
  align-items: center;

  .names {
    color: #595959;
    margin-left: 5px;
    margin-right: 10px;
  }
}
</style>
