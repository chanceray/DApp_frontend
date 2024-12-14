<template>
  <div class="car-report">
    <el-row style="margin-bottom: 10px">
      <el-col :span="8">
        <el-form ref="formRef" :model="formData" :rules="rules" status-icon>
          <el-row>
            <el-col :span="19">
              <el-form-item label="通过车架号查询：" prop="CarId">
                <el-input v-model="formData.CarId" placeholder="车架号" />
              </el-form-item>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="4">
              <el-button type="primary" @click="search">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <div class="table">
      <el-table :data="carDatas" size="default" style="width: 100%">
        <el-table-column prop="index" label="序号" width="60" />
        <el-table-column prop="CarId" label="车架号" width="200" />
        <el-table-column prop="CarClass" label="车型级别" />
        <el-table-column prop="CarBrand" label="车辆品牌" />
        <el-table-column prop="loss_amount" label="评估折损量" />
        <el-table-column prop="car_ages" label="车龄" />
        <el-table-column prop="GuidePrice" label="出厂价格" />
        <el-table-column prop="ExDate" label="出厂时间" width="180" />
        <el-table-column label="操作" width="220">
          <template #default="{ row }">
            <el-button type="primary" link @click="detail(row)">查看</el-button>
            <el-popconfirm title="是否确认发布该车？" @confirm="distribute(row)">
              <template #reference>
                <el-button type="primary" link>发布</el-button>
              </template>
            </el-popconfirm>
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
  // 按照品牌查询
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
  max-height: 48%;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;

  .table {
    height: 85%;
    overflow: auto;
  }
}
</style>
