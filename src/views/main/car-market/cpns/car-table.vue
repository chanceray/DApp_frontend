<template>
  <div class="car-table">
    <el-table 
      :data="carDatas" 
      style="width: 100%"
      :header-cell-style="tableHeaderStyle"
      border
      highlight-current-row
      @row-click="handleRowClick"
    >
      <el-table-column prop="CarId" label="车架号" width="180" show-overflow-tooltip />
      <el-table-column prop="CarBrand" label="品牌" width="100" />
      <el-table-column prop="CarName" label="车型" width="140" show-overflow-tooltip />
      <el-table-column label="车况信息" width="180">
        <template #default="{ row }">
          <div class="car-status">
            <el-tag :type="row.SecondHandLevel ? 'warning' : 'success'" size="small">
              {{ row.SecondHandLevel ? '二手' : '新车' }}
            </el-tag>
            <el-tag type="info" size="small">
              {{ row.Domestic ? '国产' : '进口' }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="Engin" label="发动机型号" width="120" show-overflow-tooltip />
      <el-table-column prop="GuidePrice" label="售价" width="120">
        <template #default="{ row }">
          <span class="price">¥ {{ row.GuidePrice }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ExDate" label="上架时间" width="160" />
      <el-table-column label="操作" fixed="right" width="200">
        <template #default="{ row }">
          <div class="action-buttons">
            <el-tooltip content="查看车辆图片" placement="top">
              <el-button type="primary" circle @click.stop="detail(row)">
                <el-icon><Picture /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="维修记录" placement="top">
              <el-button type="warning" circle @click.stop="showServiceLog(row)">
                <el-icon><Tools /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="购买车辆" placement="top">
              <el-button 
                type="success" 
                circle
                @click.stop="handleBuy(row)"
              >
                <el-icon><ShoppingCart /></el-icon>
              </el-button>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <img-dia ref="imgDiaRef" />
    <service-log ref="serviceLogRef" />
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
  .car-status {
    display: flex;
    gap: 8px;
  }

  .price {
    color: #f56c6c;
    font-weight: bold;
    font-size: 15px;
  }

  .action-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;

    .el-button {
      padding: 8px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }

  :deep(.el-table) {
    border-radius: 8px;
    overflow: hidden;
    
    .el-table__row {
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #f5f7fa;
        td {
          background-color: transparent;
        }
      }
    }

    .el-tag {
      border-radius: 4px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
    }
  }
}
</style>
