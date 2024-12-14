<template>
  <div class="img-dia">
    <el-dialog
      v-model="isShow"
      :title="`${carData.CarId}的车辆维修记录`"
      width="70%"
      destroy-on-close
    >
      <div v-if="serviceLogs.length">
        <el-table :data="serviceLogs" size="default" style="width: 100%">
          <el-table-column prop="index" label="序号" width="60" />
          <el-table-column prop="CarId" label="车架号" width="200" />
          <el-table-column prop="carowner" label="车主" />
          <el-table-column prop="describe" label="事故描述" />
          <el-table-column prop="detail" label="维修详情" />
          <el-table-column prop="m_amount" label="材料金额" />
          <el-table-column prop="r_amount" label="维修金额" />
          <el-table-column prop="time" label="事故时间" width="180" />
        </el-table>
      </div>
      <h3 v-else>暂无维修记录</h3>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="isShow = false"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineExpose, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isShow = ref(false)
const carData = ref({})

const serviceLogs = computed(() => {
  return store.state.carMarket.serviceLogs
})

const show = (data) => {
  carData.value = data
  isShow.value = true
}

defineExpose({
  show
})
</script>

<style lang="less" scoped>
.img-dia {
  .img {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
