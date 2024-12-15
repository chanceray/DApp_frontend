<template>
  <div class="car-table">
    <el-table 
      :data="tableData" 
      style="width: 100%"
      :stripe="true"
      :border="true"
      highlight-current-row
    >
      <el-table-column prop="index" label="序号" width="80" align="center" />
      <el-table-column prop="CarId" label="车架号" min-width="180" />
      <el-table-column prop="CarBrand" label="品牌" min-width="120" />
      <el-table-column prop="CarName" label="车型" min-width="120" />
      <el-table-column prop="Engin" label="发动机型号" min-width="120" />
      <el-table-column prop="Domestic" label="是否国产" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="row.Domestic === '是' ? 'success' : 'info'">
            {{ row.Domestic }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="GuidePrice" label="售价" width="120" align="right">
        <template #default="{ row }">
          <span class="price-column">¥ {{ row.GuidePrice }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ExDate" label="上架时间" width="180" align="center" />
      <el-table-column label="操作" width="200" fixed="right" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleView(row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import { Picture, Tools, ShoppingCart } from '@element-plus/icons-vue'
import { ImgDia, ServiceLog } from '../cpns/index'

const store = useStore()
const userInfo = store.state.login.userInfo
const carDatas = computed(() => {
  return store.state.carMarket.allSaleCars
})
const imgDiaRef = ref(null)
const serviceLogRef = ref(null)

const tableHeaderStyle = {
  background: '#fafafa',
  color: '#1a1a1a',
  fontWeight: '500',
  fontSize: '14px',
  height: '50px'
}

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

const handleBuy = (row) => {
  ElMessageBox.confirm(
    `确认以 ¥${row.GuidePrice} 的价格购买该车辆？`,
    '购买确认',
    {
      confirmButtonText: '确认购买',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    buy(row)
  })
}

const handleRowClick = (row) => {
  // 点击行时的效果
  console.log('查看车辆详情:', row)
}
</script>

<style lang="less" scoped>
.car-table {
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

      &.el-tag--info {
        background: #f5f5f5;
        border-color: #d9d9d9;
        color: #666;
      }
    }

    .el-button {
      padding: 8px 16px;
      transition: all 0.3s ease;

      &.el-button--primary {
        background: #52c41a;
        border-color: #52c41a;

        &:hover {
          background: #73d13d;
          border-color: #73d13d;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(82, 196, 26, 0.2);
        }
      }
    }
  }
}
</style>
