<template>
  <div class="img-dia">
    <el-dialog v-model="isShow" width="30%" destroy-on-close>
      <template #header>
        <h3>{{ `${carData.CarId}的车辆图片` }}</h3>
      </template>
      <div class="img">
        <img :src="url" :alt="carData?.CarId" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="isShow = false"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'

const isShow = ref(false)
const carData = ref({})
const url = ref('')

const show = (data) => {
  carData.value = data
  url.value = `http://118.25.195.230:8000/img/${carData.value?.CarId}.jpg`
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
