<template>
  <div class="car-market">
    <div class="market-container">
      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="section-header">
          <h2 class="section-title">
            <el-icon><Monitor /></el-icon>
            智能汽车交易平台
          </h2>
          <div class="header-right">
            <el-tag type="info" effect="dark">
              <el-icon><Timer /></el-icon>
              实时更新
            </el-tag>
          </div>
        </div>
        <car-search></car-search>
      </div>

      <!-- 在售车辆列表 -->
      <div class="list-section">
        <div class="section-header">
          <div class="header-left">
            <el-icon><CarFilled /></el-icon>
            <h3>在售车辆</h3>
            <el-tag type="success" size="small">{{ carDatas.length }}辆</el-tag>
          </div>
         
            
        
        </div>
    
      </div>

      <!-- 交易历史 -->
      <div class="history-section">
        <div class="section-header">
          <div class="header-left">
            <el-icon><Histogram /></el-icon>
            <h3>交易记录</h3>
            <el-tag type="info" size="small">{{ historyData.length }}笔</el-tag>
          </div>
          <el-button type="primary" :icon="Refresh" size="small" @click="refreshHistory">
            刷新记录
          </el-button>
        </div>
        <trade-history></trade-history>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { CarSearch, CarTable, CarGrid, TradeHistory } from './cpns/index'
import { 
  Monitor, 
  Timer, 
  CarFilled, 
  Histogram, 
  Refresh,
  Grid,
  List
} from '@element-plus/icons-vue'

const store = useStore()
const viewMode = ref('table') // 默认表格视图

const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'table' ? 'grid' : 'table'
}

const carDatas = computed(() => store.state.carMarket.allSaleCars)
const historyData = computed(() => store.state.carMarket.historeInfos)

const refreshList = () => {
  store.dispatch('carMarket/getAllSaleCarsAction')
}

const refreshHistory = () => {
  store.dispatch('carMarket/tradeHistoryListAction')
}

// 初始化数据
refreshList()
refreshHistory()
</script>

<style lang="less" scoped>
.car-market {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  padding: 20px;
  box-sizing: border-box;

  .market-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .section-title {
      color: #1a1a1a;
      margin: 0;
      font-weight: 600;
      font-size: 24px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      .header-left {
        display: flex;
        align-items: center;
        gap: 8px;

        h3 {
          margin: 0;
          color: #1a1a1a;
          font-weight: 500;
        }
      }
    }

    .search-section,
    .list-section,
    .history-section {
      background: #fff;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .list-section {
      flex: 2;
    }

    .history-section {
      flex: 1;
    }

    :deep(.el-icon) {
      font-size: 18px;
      vertical-align: middle;
    }

    :deep(.el-button-group) {
      .el-button {
        margin-left: -1px;
      }
    }

    :deep(.el-tag) {
      border-radius: 4px;
      
      .el-icon {
        margin-right: 4px;
        font-size: 14px;
      }
    }
  }
}
</style>
