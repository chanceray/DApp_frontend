<template>
  <div class="price-watch">
    <page-title title="二手车上报信息"></page-title>
    <car-report></car-report>
    <page-title title="用户信息汇总"></page-title>
    <user-infos></user-infos>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { PageTitle } from '@/components/page-title'
import { CarReport, UserInfos } from './cpns/index'

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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
