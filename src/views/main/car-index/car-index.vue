<template>
  <div class="car-index">
    <page-title title="我的车辆资产"></page-title>
    <car-table></car-table>
    <page-title title="已上链车辆"></page-title>
    <car-lock></car-lock>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { PageTitle } from '../../../components/page-title/index'
import { CarTable, CarLock } from './cpns/index'

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
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
}
</style>
