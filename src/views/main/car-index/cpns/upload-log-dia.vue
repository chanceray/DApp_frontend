<template>
  <div class="upload-log-dia">
    <el-dialog
      v-model="isShow"
      title="上传维修记录"
      width="40%"
      :destroy-on-close="true"
      @closed="diaClosed"
    >
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="Vin号" prop="CarId">
          <el-input v-model="formData.CarId" placeholder="请输入Vin号" />
        </el-form-item>
        <el-form-item label="车主" prop="carowner">
          <el-input v-model="formData.carowner" placeholder="请输入车主" />
        </el-form-item>
        <el-form-item label="材料金额" prop="m_amount">
          <el-input v-model="formData.m_amount" placeholder="请输入材料金额" />
        </el-form-item>
        <el-form-item label="维修金额" prop="r_amount">
          <el-input v-model="formData.r_amount" placeholder="请输入维修金额" />
        </el-form-item>
        <el-form-item label="事故描述" prop="Describe">
          <el-input placeholder="请输入事故描述" v-model="formData.Describe" />
        </el-form-item>
        <el-form-item label="维修详情" prop="detail">
          <el-input placeholder="请输入维修详情" v-model="formData.detail" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="confirmUpload"> 提交售出请求 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import { rules } from '../config/upload.config'
import { useStore } from 'vuex'

const store = useStore()
const isShow = ref(false)
const formRef = ref(null)
const carData = ref({})
const formData = ref({
  CarId: '', // Vin号
  carowner: '', // 车主
  m_amount: '', // 材料金额
  r_amount: '', // 维修金额
  Describe: '', // 事故描述
  time: '', // 次数
  detail: '' // 维修详情
})

const show = (data) => {
  carData.value = data
  formData.value.CarId = data.CarId
  formData.value.carowner = data.carowner
  isShow.value = true
}

// 确认上传
const confirmUpload = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      store.dispatch('carIndex/uploadLogAction', formData.value).then(() => {
        isShow.value = false
      })
    }
  })
}

// 关闭弹窗清空表单内容
const diaClosed = () => {
  formData.value = {
    CarId: '',
    carowner: '',
    m_amount: '',
    r_amount: '',
    Describe: '',
    time: '',
    detail: ''
  }
}

defineExpose({
  show
})
</script>

<style lang="less" scoped></style>
