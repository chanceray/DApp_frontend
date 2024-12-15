<template>
  <div class="trade-history">
    <el-table 
      :data="carDatas" 
      style="width: 100%"
      :header-cell-style="{ background: '#f5f7fa' }"
      border
      size="small"
    >
      <el-table-column prop="time" label="成交时间" width="160" />
      <el-table-column prop="CarId" label="车架号" width="180" show-overflow-tooltip />
      <el-table-column prop="CarName" label="车型" width="140" show-overflow-tooltip />
      <el-table-column prop="price" label="成交价格" width="120">
        <template #default="{ row }">
          <span class="price">¥ {{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sellername" label="卖家" width="120" />
      <el-table-column prop="buyername" label="买家" width="120" />
      <el-table-column label="区块链信息">
        <template #default="{ row }">
          <el-tooltip content="查看区块链交易详情" placement="top">
            <el-link 
              type="primary" 
              :href="`http://118.25.195.230:8080/?tab=transactions&transId=${row.TxHash}`"
              target="_blank"
              :underline="false"
            >
              <el-icon><Link /></el-icon>
              交易详情
            </el-link>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Link } from '@element-plus/icons-vue'

const store = useStore()
const carDatas = computed(() => store.state.carMarket.historeInfos)
</script>

<style lang="less" scoped>
.trade-history {
  .price {
    color: #f56c6c;
    font-weight: bold;
  }

  :deep(.el-link) {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
}
</style>
