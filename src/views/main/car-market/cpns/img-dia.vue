<template>
  <div class="img-dia">
    <!-- 图片查看弹窗 -->
    <el-dialog v-model="isShow" width="30%" destroy-on-close>
      <template #header>
        <h3>{{ `${carData.CarId}的车辆图片` }}</h3>
      </template>
      <!-- 图片展示区域 -->
      <div class="img">
        <img :src="url" :alt="carData?.CarId" />
      </div>
      <!-- 弹窗底部按钮 -->
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

// 控制弹窗显示状态
const isShow = ref(false)
// 存储当前车辆数据
const carData = ref({})
// 图片URL
const url = ref('')

/**
 * 显示图片弹窗
 * @param {Object} data - 车辆数据对象
 */
const show = (data) => {
  carData.value = data
  // 构建图片URL
  url.value = `http://118.25.195.230:8000/GetImage?imageName=img/${carData.value?.CarId}.jpg`
  isShow.value = true
}

// 暴露show方法给父组件
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
