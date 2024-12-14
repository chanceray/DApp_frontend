<template>
  <div class="new-car-sale">
    <add-car></add-car>
    <car-table></car-table>
  </div>
</template>

<script setup>
import { AddCar, CarTable } from './cpns/index'
import { useStore } from 'vuex'

const store = useStore()

const _getAllCars = () => {
  store.dispatch('carIndex/getAllCarAction')
}
_getAllCars()
</script>

<style lang="less" scoped>
.new-car-sale {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
}
</style>
