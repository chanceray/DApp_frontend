<template>
  <div class="sale-dia">
    <el-dialog
      v-model="isShow"
      :title="`确认售出Vin号：${carData.CarId}的车辆`"
      width="40%"
      :destroy-on-close="true"
      @closed="diaClosed"
    >
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="期望售出价格" prop="GuidePrice">
          <el-input v-model="formData.GuidePrice" placeholder="请输入期望售出价格" />
        </el-form-item>
        <el-form-item label="车龄" prop="car_ages">
          <el-input v-model="formData.car_ages" placeholder="请输入车龄" />
        </el-form-item>
        <el-form-item label="折损评估数" prop="loss_amount">
          <el-input placeholder="请输入折损评估数" v-model="formData.loss_amount" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="confirmSale"> 提交售出请求 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import { rules } from '../config/sale.config'
import { useStore } from 'vuex'

const store = useStore()
const isShow = ref(false)
const formRef = ref(null)
const carData = ref({})
const formData = ref({
  CarId: '', // Vin号
  ExDate: '', // 创建日日期
  GuidePrice: '', // 期望售出价格
  CarAges: '', // 车龄
  LossAmount: '' // 折损评估数
})

const show = (data) => {
  carData.value = data
  formData.value.CarId = data.CarId
  formData.value.ExDate = data.ExDate
  isShow.value = true
}

// 确认售出
const confirmSale = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      store.dispatch('carIndex/saleCarAction', formData.value).then(() => {
        isShow.value = false
      })
    }
  })
}

// 关闭弹窗清空表单内容
const diaClosed = () => {
  formData.value = {
    CarId: '',
    ExDate: '',
    GuidePrice: '',
    CarAges: '',
    LossAmount: ''
  }
}

defineExpose({
  show
})
</script>

<style lang="less" scoped>
.sale-dia {
}
</style>
