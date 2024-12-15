<template>
  <div class="car-index">
    <div class="page-header">
      <div class="header-content">
        <el-icon class="header-icon"><Wallet /></el-icon>
        <div class="title-content">
          <h2>我的资产</h2>
          <span class="subtitle">车辆资产管理与区块链信息</span>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="content-container">
        <div class="section">
          <div class="section-header">
            <el-icon><TrendCharts /></el-icon>
            <span>我的车辆资产</span>
          </div>
          <div class="section-content">
            <car-table></car-table>
          </div>
        </div>
        
        <div class="section">
          <div class="section-header">
            <el-icon><Connection /></el-icon>
            <span>已上链车辆</span>
          </div>
          <div class="section-content">
            <car-lock></car-lock>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { CarTable, CarLock } from './cpns/index'
import { Wallet, TrendCharts, Connection } from '@element-plus/icons-vue'

const store = useStore()

const _getMyCars = async () => {
  store.dispatch('carIndex/getMyCarsAction')
}

const _getAllCars = () => {
  store.dispatch('carIndex/getAllCarAction')
}

_getMyCars()
_getAllCars()
</script>

<style lang="less" scoped>
.car-index {
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .page-header {
    flex-shrink: 0;
    padding: 24px 32px;
    background: linear-gradient(135deg, #722ed1, #1890ff);
    
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
      background: #d6c6ff;
      border-radius: 4px;
      
      &:hover {
        background: #722ed1;
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
      box-shadow: 0 4px 20px rgba(114, 46, 209, 0.1);
      overflow: visible;

      .section-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 20px 24px;
        background: #f9f0ff;
        border-bottom: 1px solid #d3adf7;

        .el-icon {
          font-size: 20px;
          color: #722ed1;
          background: #f9f0ff;
          padding: 8px;
          border-radius: 8px;
        }

        span {
          font-size: 16px;
          font-weight: 600;
          color: #1f2329;
        }
      }

      .section-content {
        overflow: visible;
        padding: 20px;
      }
    }
  }
}
</style>
