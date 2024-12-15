<template>
  <div class="car-table">
    <!-- 搜索和统计区域 -->
    <div class="table-header">
      <div class="search-section">
        <el-input
          v-model="searchQuery"
          placeholder="搜索车辆信息..."
          prefix-icon="Search"
          clearable
          @clear="handleSearch"
          @input="handleSearch"
          class="search-input"
        />
        <el-select 
          v-model="filterType" 
          placeholder="筛选类型" 
          @change="handleSearch"
          class="filter-select"
        >
          <el-option label="全部" value="" />
          <el-option label="国产" value="国产" />
          <el-option label="进口" value="进口" />
        </el-select>
      </div>

      <div class="stat-cards">
        <div class="stat-item">
          <div class="stat-icon">
            <el-icon><CarFilled /></el-icon>
          </div>
          <div class="stat-info">
            <span class="label">总车辆数</span>
            <span class="value">{{ carDatas.length }}</span>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <el-icon><HomeFilled /></el-icon>
          </div>
          <div class="stat-info">
            <span class="label">国产车数量</span>
            <span class="value">{{ domesticCount }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 表格部分 -->
    <div class="table-content">
      <el-table 
        :data="filteredCarDatas" 
        size="default" 
        style="width: 100%"
        :stripe="true"
        :border="true"
        highlight-current-row
      >
        <el-table-column prop="index" label="序号" width="60" />
        <el-table-column prop="CarId" label="车架号" width="200" />
        <el-table-column prop="CarName" label="车辆名称" />
        <el-table-column prop="CarBrand" label="车辆品牌" />
        <el-table-column prop="Engin" label="发动机型号" />
        <el-table-column prop="Domestic" label="是否国产">
          <template #default="{ row }">
            <el-tag :type="row.Domestic === '国产' ? 'success' : 'info'">
              {{ row.Domestic }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="SecondHandLevel" label="是否二手">
          <template #default="{ row }">
            <el-tag :type="row.SecondHandLevel ? 'warning' : 'success'">
              {{ row.SecondHandLevel ? '二手' : '新车' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="GuidePrice" label="出售价格">
          <template #default="{ row }">
            <span class="price">¥ {{ row.GuidePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ExDate" label="创建时间" width="180" />
        <el-table-column label="操作" width="220">
          <template #default="{ row }">
            <el-button type="primary" @click="detail(row)">
              <el-icon><View /></el-icon>
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredCarDatas.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <!-- 图片弹窗 -->
    <img-dia ref="imgDiaRef"></img-dia>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ImgDia } from '../../car-index/cpns'
import { CarFilled, HomeFilled, View, Search } from '@element-plus/icons-vue'

const store = useStore()
const imgDiaRef = ref(null)
const searchQuery = ref('')
const filterType = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const carDatas = computed(() => {
  return store.state.carIndex.allCars
})

const domesticCount = computed(() => {
  return carDatas.value.filter(car => car.Domestic === '国产').length
})

const filteredCarDatas = computed(() => {
  let result = carDatas.value
  if (searchQuery.value) {
    result = result.filter(car => 
      car.CarName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      car.CarBrand.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      car.CarId.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  if (filterType.value) {
    result = result.filter(car => car.Domestic === filterType.value)
  }
  return result
})

const detail = (data) => {
  imgDiaRef.value.show(data)
}

const handleSearch = () => {
  currentPage.value = 1
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
}

const handleCurrentChange = (val) => {
  currentPage.value = val
}
</script>

<style lang="less" scoped>
.car-table {
  padding: 0 20px 20px;

  .table-header {
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;

    .search-section {
      display: flex;
      gap: 12px;
      flex: 1;

      .search-input {
        max-width: 300px;
      }

      .filter-select {
        width: 120px;
      }

      :deep(.el-input__wrapper) {
        background: #fff9f0;
        border-color: #ffd591;
        transition: all 0.3s ease;

        &:hover {
          border-color: #ffa940;
          background: #fff4e6;
        }

        &.is-focus {
          background: white;
          border-color: #ffa940;
          box-shadow: 0 0 0 1px #ffa940;
        }
      }
    }

    .stat-cards {
      display: flex;
      gap: 20px;

      .stat-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 24px;
        background: #fff9f0;
        border-radius: 8px;
        border: 1px solid #ffd591;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(250, 140, 22, 0.1);
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #fff4e6;
          display: flex;
          align-items: center;
          justify-content: center;

          .el-icon {
            font-size: 20px;
            color: #ffa940;
          }
        }

        .stat-info {
          display: flex;
          flex-direction: column;

          .label {
            font-size: 13px;
            color: #666;
          }

          .value {
            font-size: 20px;
            font-weight: 600;
            color: #ffa940;
          }
        }
      }
    }
  }

  .table-content {
    background: white;
    border-radius: 8px;
    border: 1px solid #ffd591;
    overflow: hidden;

    :deep(.el-table) {
      // 表头样式
      .el-table__header {
        background-color: #fff9f0;
        
        th {
          background-color: #fff9f0;
          color: #666;
          font-weight: 600;
          padding: 16px 0;
        }
      }

      // 表格行样式
      .el-table__row {
        transition: all 0.3s ease;

        td {
          padding: 16px 0;
        }

        &:hover > td {
          background-color: #fff4e6 !important;
        }
      }

      // 操作按钮样式
      .el-button {
        &.el-button--primary {
          background: #ffa940;
          border-color: #ffa940;
          padding: 8px 16px;

          &:hover {
            background: #ffb84d;
            border-color: #ffb84d;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(250, 140, 22, 0.2);
          }

          .el-icon {
            margin-right: 4px;
          }
        }
      }

      // 状态标签样式
      .el-tag {
        padding: 4px 8px;
        border-radius: 4px;

        &.el-tag--success {
          background: #fff9f0;
          border-color: #ffd591;
          color: #ffa940;
        }

        &.el-tag--warning {
          background: #fff7e6;
          border-color: #ffd591;
          color: #fa8c16;
        }

        &.el-tag--info {
          background: #f5f5f5;
          border-color: #d9d9d9;
          color: #666;
        }
      }

      .price {
        color: #ffa940;
        font-weight: 600;
        font-size: 15px;
      }
    }

    .pagination {
      padding: 16px 24px;
      border-top: 1px solid #ffd591;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
