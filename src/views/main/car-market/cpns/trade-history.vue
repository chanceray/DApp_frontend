<template>
  <div class="trade-history">
    <el-table 
      :data="historyData" 
      style="width: 100%"
      :stripe="true"
      :border="true"
      highlight-current-row
    >
      <el-table-column prop="index" label="序号" width="80" align="center" />
      <el-table-column prop="CarId" label="车架号" min-width="180" />
      <el-table-column prop="CarBrand" label="品牌" min-width="120" />
      <el-table-column prop="CarName" label="车型" min-width="120" />
      <el-table-column prop="buyername" label="购买人" width="120" align="center" />
      <el-table-column prop="price" label="成交价格" width="120" align="right">
        <template #default="{ row }">
          <span class="price-column">¥ {{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="交易状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="row.status === '已完成' ? 'success' : 'warning'">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="交易时间" width="180" align="center" />
    </el-table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const historyData = computed(() => store.state.carMarket.historeInfos)
</script>

<style lang="less" scoped>
.trade-history {
  height: 100%;
  background-color: white;

  :deep(.el-table) {
    background-color: transparent;
    
    .el-table__header {
      th {
        background-color: #f6ffed;
        color: #1f2329;
        font-weight: 600;
        padding: 12px 0;
      }
    }

    .el-table__row {
      td {
        padding: 12px 0;
        background-color: transparent;
      }

      &:hover > td {
        background-color: #f6ffed !important;
      }
    }

    .price-column {
      color: #52c41a;
      font-weight: 500;
      font-size: 15px;
    }

    .el-tag {
      border-radius: 4px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;

      &.el-tag--success {
        background: #f6ffed;
        border-color: #b7eb8f;
        color: #52c41a;
      }

      &.el-tag--warning {
        background: #fff7e6;
        border-color: #ffd591;
        color: #fa8c16;
      }
    }
  }
}
</style>
