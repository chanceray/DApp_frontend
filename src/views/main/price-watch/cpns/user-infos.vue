<template>
  <div class="user-infos">
    <el-table :data="users" size="default" style="width: 100%">
      <el-table-column prop="index" label="序号" width="60" />
      <el-table-column prop="account" label="用户名" width="200" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="usertype" label="用户类别">
        <template #default="{ row }">
          {{ userTypeFilter(row.usertype) }}
        </template>
      </el-table-column>

      <el-table-column prop="address" label="地址" />
      <el-table-column prop="Identity" label="身份证号" />
      <el-table-column prop="amount" label="名下资产量" width="180" />
    </el-table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const users = computed(() => {
  return store.state.priceWatch.allUsers
})
</script>

<style lang="less" scoped>
.user-infos {
  flex: 1;
  overflow: auto;
}
</style>
