<template>
  <div class="trade-history">
    <el-table :data="carDatas" size="default" style="width: 100%">
      <el-table-column prop="index" label="序号" width="60" />
      <el-table-column prop="CarId" label="车架号" width="200" />
      <el-table-column prop="CarName" label="车辆名称" />
      <el-table-column prop="sellername" label="卖方" width="180" />
      <el-table-column prop="buyername" label="买方" />
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="time" label="创建时间" width="200" />
      <el-table-column prop="TxHash" label="区块链交易hash" width="200">
        <template #default="{ row }">
          <el-link
            type="primary"
            :href="`http://118.25.195.230:8080/?tab=transactions&transId=${row.TxHash}`"
            >{{ row.TxHash }}</el-link
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
import { ImgDia } from '../cpns/index'

const store = useStore()
const imgDiaRef = ref(null)
const carDatas = computed(() => {
  return store.state.carMarket.historeInfos
})

const detail = (data) => {
  imgDiaRef.value.show(data)
}
</script>

<style lang="less" scoped>
.trade-history {
  flex: 1;
  overflow: auto;
}
</style>
