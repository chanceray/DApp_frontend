<template>
  <div class="car-table">
    <el-table :data="carDatas" size="default" style="width: 100%">
      <el-table-column prop="index" label="序号" width="60" />
      <el-table-column prop="CarId" label="车架号" width="190" />
      <el-table-column prop="CarName" label="车辆名称" />
      <el-table-column prop="CarBrand" label="车辆品牌" />
      <el-table-column prop="Engin" label="发动机型号" />
      <el-table-column prop="Domestic" label="是否国产" />
      <el-table-column prop="SecondHandLevel" label="是否二手">
        <template #default="{ row }">
          {{ Number(row.SecondHandLevel) ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="GuidePrice" label="出售价格" />
      <el-table-column prop="ExDate" label="创建时间" width="180" />
      <el-table-column label="操作" width="220">
        <template #default="{ row }">
          <el-button type="primary" link @click="detail(row)">查看</el-button>
          <el-button type="primary" link @click="sale(row)">售出</el-button>
          <el-button type="primary" link @click="uploadCheckLog(row)">上传维修记录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 售出弹窗 -->
    <sale-dia ref="saleDiaRef"></sale-dia>
    <!-- 图片弹窗 -->
    <img-dia ref="imgDiaRef"></img-dia>
    <!-- 上传维修记录弹窗 -->
    <upload-log-dia ref="uploadLogDiaRef"></upload-log-dia>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SaleDia, ImgDia, UploadLogDia } from './index'
import { useStore } from 'vuex'

const store = useStore()
const carDatas = computed(() => {
  return store.state.carIndex.myCars
})
const saleDiaRef = ref(null)
const imgDiaRef = ref(null)
const uploadLogDiaRef = ref(null)

const detail = (data) => {
  imgDiaRef.value.show(data)
}
const sale = (data) => {
  saleDiaRef.value.show(data)
}
const uploadCheckLog = (data) => {
  uploadLogDiaRef.value.show(data)
}
</script>

<style lang="less" scoped>
.car-table {
  max-height: 48%;
  margin-bottom: 20px;
  overflow: auto;
}
</style>
