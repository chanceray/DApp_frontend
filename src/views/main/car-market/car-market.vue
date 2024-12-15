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

    <div class="content-wrapper">
      <div class="content-container">
        <!-- 搜索区域 -->
        <div class="section">
          <div class="section-header">
            <el-icon><Search /></el-icon>
            <span>车辆搜索</span>
            <div class="live-update">
              <el-icon><Timer /></el-icon>
              <span>实时更新</span>
            </div>
          </div>
          <div class="section-content">
            <car-search></car-search>
          </div>
        </div>
        <!-- 在售车辆列表 -->
        <div class="section">
          <div class="section-header">
            <el-icon><Van /></el-icon>
            <span>在售车辆</span>
            
            <div class="header-actions">
              <el-button type="primary" :icon="Refresh" @click="refreshList">
                刷新列表
              </el-button>
            </div>
          </div>
          <div class="section-content">
            <car-table v-if="viewMode === 'table'"></car-table>
            <car-grid v-else></car-grid>
          </div>
        </div>

        <!-- 交易历史 -->
        <div class="section">
          <div class="section-header">
            <el-icon><Histogram /></el-icon>
            <span>交易记录</span>
           
            <div class="header-actions">
              <el-button type="primary" :icon="Refresh" @click="refreshHistory">
                刷新记录
              </el-button>
            </div>
          </div>
          <div class="section-content">
            <trade-history></trade-history>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { eventBus } from '@/utils/eventbus'
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

// 组件挂载时获取数据
onMounted(() => {
  refreshList()
  refreshHistory()
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  eventBus.off(eventBus.CAR_UPLOADED, refreshList)
})
</script>

<style lang="less" scoped>
.car-market {
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .page-header {
    flex-shrink: 0;
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

  .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow-y: auto;
    background-color: #f0f5ff;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f0f5ff;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #b7eb8f;
      border-radius: 4px;
      
      &:hover {
        background: #52c41a;
      }
    }
  }

  .content-container {
    flex: 1;
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .section {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(19, 194, 194, 0.1);
      overflow: visible;

      .section-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 20px 24px;
        background: #f6ffed;
        border-bottom: 1px solid #b7eb8f;

        .el-icon {
          font-size: 20px;
          color: #52c41a;
          background: #f6ffed;
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
          background: linear-gradient(135deg, #13c2c2, #52c41a);
          padding: 6px 14px;
          border-radius: 20px;
          color: white;
          font-size: 13px;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(19, 194, 194, 0.15);
          transition: all 0.3s ease;
          
          .el-icon {
            font-size: 14px;
            background: none;
            padding: 0;
            color: white;
            animation: pulse 2s infinite;
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
          background: #f6ffed;
          border-color: #b7eb8f;
          color: #52c41a;
        }

        .header-actions {
          margin-left: auto;
          
          .el-button {
            background: #52c41a;
            border-color: #52c41a;
            transition: all 0.3s ease;
            
            &:hover {
              transform: translateY(-2px);
              background: #73d13d;
              border-color: #73d13d;
              box-shadow: 0 4px 12px rgba(82, 196, 26, 0.2);
            }
          }
        }
      }

      .section-content {
        overflow: visible;
        padding: 20px;

        :deep(.el-table) {
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
            }

            &:hover > td {
              background-color: #f6ffed !important;
            }
          }

          .price-column {
            color: #52c41a;
            font-weight: 500;
          }

          .el-button {
            padding: 8px 16px;
            
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

          .el-tag {
            &.el-tag--success {
              background: #f6ffed;
              border-color: #b7eb8f;
              color: #52c41a;
            }
          }
        }
      }
    }
  }
}
</style>
