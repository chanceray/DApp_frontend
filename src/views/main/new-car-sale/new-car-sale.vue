<template>
  <div class="new-car-sale">
    <div class="page-header">
      <div class="header-content">
        <el-icon class="header-icon"><Plus /></el-icon>
        <div class="title-content">
          <h2>新车上架</h2>
          <span class="subtitle">新车信息录入与区块链存证</span>
        </div>
      </div>
    </div>

    <div class="content-container">
      <div class="section">
        <div class="section-header">
          <el-icon><Upload /></el-icon>
          <span>车辆上链</span>
          <div class="header-actions">
            <el-button type="primary" :icon="Plus" @click="handleAddCar">
              确认上链
            </el-button>
          </div>
        </div>
        <add-car ref="addCarRef"></add-car>
      </div>
      
      <div class="section">
        <div class="section-header">
          <el-icon><List /></el-icon>
          <span>新车列表</span>
          <div class="header-actions">
            <el-button type="primary" :icon="Refresh" @click="refreshList">
              刷新列表
            </el-button>
          </div>
        </div>
        <car-table></car-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AddCar, CarTable } from './cpns/index'
import { useStore } from 'vuex'
import { Plus, Upload, List, Refresh } from '@element-plus/icons-vue'

const store = useStore()
const addCarRef = ref(null)

const handleAddCar = () => {
  addCarRef.value?.submit()
}

const refreshList = () => {
  store.dispatch('carIndex/getAllCarAction')
}

refreshList()
</script>

<style lang="less" scoped>
.new-car-sale {
  height: 100%;
  background-color: #f0f5ff;
  
  .page-header {
    padding: 24px 32px;
    background: linear-gradient(135deg, #ffa940, #fa8c16);
    
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
      box-shadow: 0 4px 20px rgba(250, 140, 22, 0.08);
      overflow: hidden;

      .section-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 20px 24px;
        background: #fff9f0;
        border-bottom: 1px solid #ffd591;
        position: relative;

        .el-icon {
          font-size: 20px;
          color: #ffa940;
          background: #fff4e6;
          padding: 8px;
          border-radius: 8px;
        }

        span {
          font-size: 16px;
          font-weight: 600;
          color: #1f2329;
        }

        .header-actions {
          margin-left: auto;
          
          .el-button {
            background: #ffa940;
            border-color: #ffa940;
            transition: all 0.3s ease;
            
            &:hover {
              transform: translateY(-2px);
              background: #ffb84d;
              border-color: #ffb84d;
              box-shadow: 0 4px 12px rgba(250, 140, 22, 0.2);
            }
          }
        }
      }
    }
  }
}
</style>
