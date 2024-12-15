<template>
  <div class="price-watch">
    <div class="page-header">
      <div class="header-content">
        <el-icon class="header-icon"><DataLine /></el-icon>
        <div class="title-content">
          <h2>价格监测</h2>
          <span class="subtitle">车辆价格评估与监控</span>
        </div>
      </div>
    </div>

    <div class="content-container">
      <div class="section">
        <div class="section-header">
          <el-icon><Monitor /></el-icon>
          <span>二手车上报信息</span>
        </div>
        <car-report></car-report>
      </div>
      <div class="section">
        <div class="section-header">
          <el-icon><User /></el-icon>
          <span>用户信息汇总</span>
        </div>
        <user-infos></user-infos>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { CarReport, UserInfos } from './cpns/index'
import { DataLine, CarFilled, User } from '@element-plus/icons-vue'

const store = useStore()

const _getAllUsers = async () => {
  store.dispatch('priceWatch/getAllUsersAction')
}
const _getAllCheckCars = async () => {
  store.dispatch('priceWatch/getAllCheckCarsAction')
}

_getAllUsers()
_getAllCheckCars()
</script>

<style lang="less" scoped>
.price-watch {
  height: 100%;
  background-color: #f0f5ff;
  
  .page-header {
    padding: 24px 32px;
    background: linear-gradient(135deg, #1890ff, #36cfc9);
    
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
      box-shadow: 0 4px 20px rgba(24, 144, 255, 0.1);
      overflow: hidden;

      .section-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 20px 24px;
        background: #fafcff;
        border-bottom: 1px solid #e6f0ff;

        .el-icon {
          font-size: 20px;
          color: #1890ff;
          background: #e6f7ff;
          padding: 8px;
          border-radius: 8px;
        }

        span {
          font-size: 16px;
          font-weight: 600;
          color: #1f2329;
        }
      }
    }
  }
}
</style>
