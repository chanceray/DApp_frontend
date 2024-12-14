<template>
  <div class="car-search">
    <el-row>
      <el-col :span="8">
        <el-form ref="formRef1" :model="formData" :rules="rules1" status-icon>
          <el-row>
            <el-col :span="12">
              <el-form-item label="按照价格查询：" prop="StartKey">
                <el-input v-model="formData.StartKey" placeholder="最低价格" />
              </el-form-item>
            </el-col>
            <el-col :span="1"> </el-col>
            <el-col :span="6">
              <el-form-item label="" prop="EndKey">
                <el-input v-model="formData.EndKey" placeholder="最高价格" />
              </el-form-item>
            </el-col>
            <el-col :span="1"> </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="search('price')">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-form ref="formRef2" :model="formData" :rules="rules2" status-icon>
          <el-row>
            <el-col :span="19">
              <el-form-item label="通过车架号查询：" prop="CarId">
                <el-input v-model="formData.CarId" placeholder="车架号" />
              </el-form-item>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="4">
              <el-button type="primary" @click="search('id')">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-form ref="formRef3" :model="formData" :rules="rules3" status-icon>
          <el-row>
            <el-col :span="19">
              <el-form-item label="通过品牌查询：" prop="CarBrand">
                <el-input v-model="formData.CarBrand" placeholder="车车辆品牌架号" />
              </el-form-item>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="4">
              <el-button type="primary" @click="search('brand')">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { rules1, rules2, rules3 } from '../config/search.config'

const store = useStore()
const formData = ref({
  StartKey: '',
  EndKey: '',
  CarId: '',
  CarBrand: ''
})
const formRef1 = ref(null)
const formRef2 = ref(null)
const formRef3 = ref(null)

const search = async (type) => {
  let params = {}
  let valid = false
  if (type === 'price') {
    // 按照价格查询
    const { StartKey, EndKey } = formData.value
    params = { StartKey, EndKey }
    valid = await validate(formRef1.value)
    if (valid) {
      store.dispatch('carMarket/getCarsByPriceAction', params)
    }
  } else if (type === 'id') {
    // 按照车架号查询
    const { CarId } = formData.value
    params = { CarId }
    valid = await validate(formRef2.value)
    if (valid) {
      store.dispatch('carMarket/getCarsByIdAction', params)
    }
  } else {
    // 按照品牌查询
    const { CarBrand } = formData.value
    params = { CarBrand }
    valid = await validate(formRef3.value)
    if (valid) {
      store.dispatch('carMarket/getCarsByBrandAction', params)
    }
  }
}

const validate = (form) => {
  return form.validate((valid) => {
    return valid
  })
}
</script>

<style lang="less" scoped>
.car-search {
  margin-bottom: 20px;
  text-align: left;
}
</style>
