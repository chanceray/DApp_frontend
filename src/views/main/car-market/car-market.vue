<template>
  <div class="car-market">
    <car-search></car-search>
    <car-table></car-table>
    <page-title title="历史交易信息"></page-title>
    <trade-history></trade-history>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { CarSearch, CarTable, TradeHistory } from './cpns/index'
import { PageTitle } from '../../../components/page-title'

const store = useStore()

const _getAllSaleCars = async () => {
  store.dispatch('carMarket/getAllSaleCarsAction')
}

const _getTradeHistoryList = async () => {
  store.dispatch('carMarket/tradeHistoryListAction')
}

_getAllSaleCars()
_getTradeHistoryList()
</script>

<style lang="less" scoped>
.car-market {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
