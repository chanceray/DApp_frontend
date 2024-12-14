<template>
  <div class="car-table">
    <el-table :data="carDatas" size="default" style="width: 100%">
      <el-table-column prop="index" label="序号" width="60" />
      <el-table-column prop="CarId" label="车架号" width="200" />
      <el-table-column prop="CarName" label="车辆名称" />
      <el-table-column prop="CarBrand" label="车辆品牌" />
      <el-table-column prop="Engin" label="发动机型号" />
      <el-table-column prop="Domestic" label="是否国产" />
      <el-table-column prop="SecondHandLevel" label="是否二手" />
      <el-table-column prop="GuidePrice" label="出售价格" />
      <el-table-column prop="ExDate" label="创建时间" width="180" />
      <el-table-column label="操作" width="220">
        <template #default="{ row }">
          <el-button type="primary" link @click="detail(row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 图片弹窗 -->
    <img-dia ref="imgDiaRef"></img-dia>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ImgDia } from '../../car-index/cpns'

const store = useStore()
const imgDiaRef = ref(null)
const carDatas = computed(() => {
  return store.state.carIndex.allCars
})

const detail = (data) => {
  imgDiaRef.value.show(data)
}
</script>

<style lang="less" scoped>
.car-table {
  flex: 1;
  margin-bottom: 20px;
  overflow: auto;
}
</style>
