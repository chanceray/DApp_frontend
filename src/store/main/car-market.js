import {
  getAllSaleCars,
  buyCar,
  tradeHistoryList,
  getCarsByPrice,
  getCarsById,
  getCarsByBrand,
  getCarServiceLogs
} from '@/service/main/car-market/car-market'

const carIndexModule = {
  namespaced: true,
  state() {
    return {
      allSaleCars: [], // 所有在售车辆
      historeInfos: [],
      serviceLogs: []
    }
  },
  mutations: {
    changeAllSaleCars(state, payload) {
      state.allSaleCars = payload
    },
    changeHistoreInfos(state, payload) {
      state.historeInfos = payload
    },
    changeServiceLogs(state, payload) {
      state.serviceLogs = payload
    }
  },
  getters: {
    userInfo(state, getters, rootState) {
      return rootState.login.userInfo
    }
  },
  actions: {
    // 获取所有在售车辆
    async getAllSaleCarsAction({ commit }) {
      const res = await getAllSaleCars()
      res.data = res.data.map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeAllSaleCars', res.data)
    },
    // 购买车辆
    async buyCarAction({ dispatch }, payload) {
      const res = await buyCar(payload)
      console.log(res)
      dispatch('getAllSaleCarsAction')
    },
    // 获取所有交易信息
    async tradeHistoryListAction({ commit }, payload) {
      const res = await tradeHistoryList(payload)
      res.data = res.data.map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeHistoreInfos', res.data)
    },
    // 通过车辆价格查询车辆
    async getCarsByPriceAction({ commit }, payload) {
      const res = await getCarsByPrice(payload)
      res.data = res.data.map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeAllSaleCars', res.data)
    },
    // 通过车架号查询车辆
    async getCarsByIdAction({ commit }, payload) {
      const res = await getCarsById(payload)
      res.data = [res.data].map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeAllSaleCars', res.data)
    },
    // 通过车品牌查询车辆
    async getCarsByBrandAction({ commit }, payload) {
      const res = await getCarsByBrand(payload)
      res.data = res.data.map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeAllSaleCars', res.data)
    },
    // 获取车辆维修记录
    async getCarServiceLogsAction({ commit }, payload) {
      const res = await getCarServiceLogs(payload)
      res.data = res.data.map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeServiceLogs', res.data)
    }
  }
}

export default carIndexModule
