<template>
  <div class="car-market">
    <div class="page-header">
      <div class="header-content">
        <el-icon class="header-icon"><Shop /></el-icon>
        <div class="title-content">
          <h2>汽车市场</h2>
          <span class="subtitle">智能汽车交易平台</span>
        </div>
      </div>
    </div>

    <div class="content-container">
      <div class="section">
        <div class="section-header">
          <el-icon><Search /></el-icon>
          <span>车辆搜索</span>
          <div class="live-update">
            <el-icon><Timer /></el-icon>
            <span>实时更新</span>
          </div>
        </div>
        <car-search></car-search>
      </div>

      <div class="section">
        <div class="section-header">
          <el-icon><Van /></el-icon>
          <span>在售车辆</span>
          <el-tag type="success" size="small" class="count-tag">
            {{ carDatas.length }}辆
          </el-tag>
          <div class="header-actions">
            <el-button type="primary" :icon="Refresh" size="small" @click="refreshList">
              刷新列表
            </el-button>
          </div>
        </div>
        <car-table v-if="viewMode === 'table'"></car-table>
        <car-grid v-else></car-grid>
      </div>

      <div class="section">
        <div class="section-header">
          <el-icon><Histogram /></el-icon>
          <span>交易记录</span>
          <el-tag type="info" size="small" class="count-tag">
            {{ historyData.length }}笔
          </el-tag>
          <div class="header-actions">
            <el-button type="primary" :icon="Refresh" size="small" @click="refreshHistory">
              刷新记录
            </el-button>
          </div>
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
  Shop, 
  Search,
  Timer, 
  Van,
  Histogram, 
  Refresh
} from '@element-plus/icons-vue'

const store = useStore()
const viewMode = ref('table')

const carDatas = computed(() => store.state.carMarket.allSaleCars)
const historyData = computed(() => store.state.carMarket.historeInfos)

const refreshList = () => {
  store.dispatch('carMarket/getAllSaleCarsAction')
}

const refreshHistory = () => {
  store.dispatch('carMarket/tradeHistoryListAction')
}

refreshList()
refreshHistory()
</script>

<style lang="less" scoped>
.car-market {
  height: 100%;
  background-color: #f0f5ff;
  
  .page-header {
    padding: 24px 32px;
    background: linear-gradient(135deg, #13c2c2, #52c41a);
    
    .header-content {
      display: flex;
      align-items: center;
      gap: 16px;

      .header-icon {
        font-size: 32px;
        color: white;
        background: rgba(255, 255, 255, 0.2);
        padding: 10px;
        border-radius: 10px;
        backdrop-filter: blur(4px);
      }

      .title-content {
        h2 {
          margin: 0;
          font-size: 24px;
          color: white;
          font-weight: 600;
        }

        .subtitle {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
          margin-top: 4px;
        }
      }
    }
  }

  .content-container {
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .section {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(19, 194, 194, 0.1);
      overflow: hidden;

      .section-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 20px 24px;
        background: #fafcff;
        border-bottom: 1px solid #e6f0ff;
        position: relative;

        .el-icon {
          font-size: 20px;
          color: #13c2c2;
          background: #e6fffb;
          padding: 8px;
          border-radius: 8px;
        }

        span {
          font-size: 16px;
          font-weight: 600;
          color: #1f2329;
        }

        .live-update {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: 12px;
          background: linear-gradient(135deg, #1890ff, #36cfc9);
          padding: 6px 14px;
          border-radius: 20px;
          color: white;
          font-size: 13px;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
          transition: all 0.3s ease;
          
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(24, 144, 255, 0.25);
          }
          
          .el-icon {
            font-size: 14px;
            background: none;
            padding: 0;
            color: white;
            animation: pulse 2s infinite;
          }

          span {
            background: none;
            color: white;
            font-size: 13px;
            font-weight: normal;
          }
        }

        @keyframes pulse {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .count-tag {
          margin-left: 8px;
        }

        .header-actions {
          margin-left: auto;
          
          .el-button {
            transition: all 0.3s ease;
            
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(19, 194, 194, 0.2);
            }
          }
        }
      }
    }
  }
}
</style>
