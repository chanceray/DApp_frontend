<template>
  <div class="car-table">
    <el-table :data="carDatas" size="default" style="width: 100%">
      <el-table-column prop="index" label="序号" width="60" />
      <el-table-column prop="CarId" label="车架号" width="200" />
      <el-table-column prop="CarName" label="车辆名称" width="120" />
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
          <el-popconfirm title="是否确认购买该车？" @confirm="buy(row)">
            <template #reference>
              <el-button type="primary" link>购买</el-button>
            </template>
          </el-popconfirm>
          <el-button type="primary" link @click="showServiceLog(row)">查看维修记录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 图片弹窗 -->
    <img-dia ref="imgDiaRef"></img-dia>
    <!-- 维修记录弹窗 -->
    <service-log ref="serviceLogRef"></service-log>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ImgDia, ServiceLog } from '../cpns/index'

const store = useStore()
const userInfo = store.state.login.userInfo
const carDatas = computed(() => {
  return store.state.carMarket.allSaleCars
})
const imgDiaRef = ref(null)
const serviceLogRef = ref(null)

const detail = (data) => {
  imgDiaRef.value.show(data)
}

const buy = (data) => {
  const params = {
    CarId: data.CarId,
    buyername: userInfo.account
  }
  store.dispatch('carMarket/buyCarAction', params)
}

const showServiceLog = (data) => {
  serviceLogRef.value.show(data)
  store.dispatch('carMarket/getCarServiceLogsAction', { CarId: data.CarId })
}
</script>

<style lang="less" scoped>
.car-table {
  max-height: 47%;
  margin-bottom: 20px;
  overflow: auto;
}
</style>
