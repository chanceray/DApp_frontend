<template>
  <div class="car-report">
    <!-- 搜索区域 -->
    <div class="search-section">
      <el-form ref="formRef" :model="formData" :rules="rules" status-icon>
        <el-row :gutter="20" type="flex" align="middle">
          <el-col :span="16">
            <el-form-item label="通过车架号查询：" prop="CarId">
              <el-input 
                v-model="formData.CarId" 
                placeholder="请输入车架号进行查询"
                prefix-icon="Search"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" :icon="Search" @click="search">
              查询车辆
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 表格区域 -->
    <div class="table-section">
      <el-table 
        :data="carDatas" 
        size="default" 
        style="width: 100%"
        :stripe="true"
        :border="true"
        highlight-current-row
      >
        <el-table-column prop="index" label="序号" width="60" align="center" />
        <el-table-column prop="CarId" label="车架号" width="200" />
        <el-table-column prop="CarClass" label="车型级别" align="center" />
        <el-table-column prop="CarBrand" label="车辆品牌" align="center" />
        <el-table-column prop="loss_amount" label="折损量评估" align="center">
          <template #default="{ row }">
            <el-tag :type="row.loss_amount > 50 ? 'danger' : 'success'">
              {{ row.loss_amount }}%
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="car_ages" label="车龄" align="center">
          <template #default="{ row }">
            <el-tag type="info">{{ row.car_ages }}年</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="GuidePrice" label="出厂价格" align="center">
          <template #default="{ row }">
            <span class="price">¥ {{ row.GuidePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ExDate" label="出厂时间" width="180" align="center" />
        <el-table-column label="操作" width="280" align="center">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button 
                type="primary" 
                @click="detail(row)" 
                :icon="View"
                class="view-btn"
              >
                查看详情
              </el-button>
              <el-popconfirm 
                title="确认要发布该车辆信息吗?" 
                @confirm="distribute(row)"
                confirm-button-text="确认发布"
                cancel-button-text="取消"
              >
                <template #reference>
                  <el-button 
                    type="success" 
                    :icon="Upload"
                    class="publish-btn"
                  >
                    发布信息
                  </el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 图片弹窗 -->
    <img-dia ref="imgDiaRef"></img-dia>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ImgDia } from '../../car-index/cpns/index'
import { rules } from '../config/search.config'
import { Search, View, Upload } from '@element-plus/icons-vue'

const store = useStore()
const imgDiaRef = ref(null)
const formRef = ref(null)
const formData = ref({
  CarId: ''
})
const carDatas = computed(() => {
  return store.state.priceWatch.checkCars
})

const detail = (data) => {
  imgDiaRef.value.show(data)
}
const distribute = (data) => {
  store.dispatch('priceWatch/publishCarAction', { CarId: data.CarId })
}
const search = async () => {
  const valid = await validate(formRef.value)
  if (valid) {
    store.dispatch('priceWatch/getCarsByIdAction', formData.value)
  }
}

const validate = (form) => {
  return form.validate((valid) => {
    return valid
  })
}
</script>

<style lang="less" scoped>
.car-report {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 24px 24px;

  .search-section {
    padding: 20px;
    background: #fafcff;
    border-radius: 8px;
    border: 1px solid #e6f0ff;

    :deep(.el-form-item__label) {
      font-weight: 500;
      color: #1f2937;
    }

    .el-input {
      :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 1px #d9e6ff inset;
        background: white;
        transition: all 0.3s ease;
        
        &:hover {
          box-shadow: 0 0 0 1px #1890ff inset;
        }

        &.is-focus {
          box-shadow: 0 0 0 2px #1890ff inset;
        }
      }
    }

    .el-button {
      width: 100%;
      height: 40px;
      background: #1890ff;
      border-color: #1890ff;
      transition: all 0.3s ease;

      &:hover {
        background: #40a9ff;
        border-color: #40a9ff;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(24, 144, 255, 0.2);
      }
    }
  }

  .table-section {
    flex: 1;
    overflow: auto;
    background: white;
    border-radius: 8px;
    border: 1px solid #e6f0ff;

    :deep(.el-table) {
      border: none;
      
      .el-table__header {
        background-color: #fafcff;
        
        th {
          background-color: #fafcff;
          color: #1f2937;
          font-weight: 600;
        }
      }

      .el-table__row {
        transition: all 0.3s ease;

        &:hover {
          background-color: #f0f7ff;
        }
      }

      .price {
        color: #1890ff;
        font-weight: 600;
        font-size: 15px;
      }

      .action-buttons {
        display: flex;
        justify-content: center;
        gap: 12px;

        .el-button {
          padding: 8px 16px;
          border-radius: 6px;
          transition: all 0.3s ease;
          min-width: 100px;

          &.view-btn {
            background: #1890ff;
            border-color: #1890ff;
            
            &:hover {
              background: #40a9ff;
              border-color: #40a9ff;
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(24, 144, 255, 0.2);
            }
          }

          &.publish-btn {
            background: #52c41a;
            border-color: #52c41a;
            
            &:hover {
              background: #73d13d;
              border-color: #73d13d;
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(82, 196, 26, 0.2);
            }
          }

          .el-icon {
            margin-right: 4px;
            font-size: 16px;
          }
        }
      }

      .el-table__row {
        td {
          padding: 16px 0;
        }
      }

      .el-tag {
        padding: 4px 8px;
        border-radius: 4px;
        font-weight: 500;

        &.el-tag--success {
          background: #f6ffed;
          border-color: #b7eb8f;
          color: #52c41a;
        }

        &.el-tag--danger {
          background: #fff2f0;
          border-color: #ffccc7;
          color: #ff4d4f;
        }

        &.el-tag--info {
          background: #f5f5f5;
          border-color: #d9d9d9;
          color: #666;
        }
      }
    }
  }
}

:deep(.el-popconfirm) {
  .el-popconfirm__main {
    padding: 16px 0;
    font-size: 14px;
    color: #1f2329;
  }

  .el-button {
    padding: 8px 16px;
    min-width: 80px;
  }
}
</style>
