import {
  getAllSaleCars,
  buyCar,
  tradeHistoryList,
  getCarsByPrice,
  getCarsById,
  getCarsByBrand,
  getCarServiceLogs
} from '@/service/main/car-market/car-market'

/**
 * 汽车市场模块的状态管理
 * 处理在售车辆、交易记录和维修记录等相关功能
 */
const carIndexModule = {
  namespaced: true,
  // 状态定义
  state() {
    return {
      allSaleCars: [], // 存储所有在售车辆列表数据
      historeInfos: [], // 存储交易历史记录数据
      serviceLogs: []  // 存储车辆维修记录数据
    }
  },

  // mutations用于同步修改state
  mutations: {
    // 更新在售车辆列表
    changeAllSaleCars(state, payload) {
      state.allSaleCars = payload
    },
    // 更新交易历史记录
    changeHistoreInfos(state, payload) {
      state.historeInfos = payload
    },
    // 更新维修记录
    changeServiceLogs(state, payload) {
      state.serviceLogs = payload
    }
  },

  // getters用于从根状态获取用户信息
  getters: {
    userInfo(state, getters, rootState) {
      return rootState.login.userInfo
    }
  },

  // actions用于处理异步操作
  actions: {
    /**
     * 获取所有在售车辆列表
     * @param {Object} param0 包含commit方法的对象
     */
    async getAllSaleCarsAction({ commit }) {
      const res = await getAllSaleCars()
      // 为每条数据添加序号
      res.data = res.data.map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeAllSaleCars', res.data)
    },

    /**
     * 购买车辆
     * @param {Object} param0 包含dispatch方法的对象
     * @param {Object} payload 包含车辆ID和买家信息的对象
     */
    async buyCarAction({ dispatch }, payload) {
      await buyCar(payload)
      // 购买成功后刷新车辆列表
      dispatch('getAllSaleCarsAction')
    },

    /**
     * 获取交易历史记录
     * @param {Object} param0 包含commit方法的对象
     * @param {Object} payload 查询参数
     */
    async tradeHistoryListAction({ commit }, payload) {
      const res = await tradeHistoryList(payload)
      // 为交易记录添加序号
      res.data = res.data.map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeHistoreInfos', res.data)
    },

    /**
     * 按价格区间查询车辆
     * @param {Object} param0 包含commit方法的对象
     * @param {Object} payload 价格区间参数
     */
    async getCarsByPriceAction({ commit }, payload) {
      const res = await getCarsByPrice(payload)
      res.data = res.data.map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeAllSaleCars', res.data)
    },

    /**
     * 按车架号查询车辆
     * @param {Object} param0 包含commit方法的对象
     * @param {Object} payload 包含车架号的对象
     */
    async getCarsByIdAction({ commit }, payload) {
      const res = await getCarsById(payload)
      // 将单个车辆数据转换为数组格式
      res.data = [res.data].map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeAllSaleCars', res.data)
    },

    /**
     * 按品牌查询车辆
     * @param {Object} param0 包含commit方法的对象
     * @param {Object} payload 包含品牌信息的对象
     */
    async getCarsByBrandAction({ commit }, payload) {
      const res = await getCarsByBrand(payload)
      res.data = res.data.map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeAllSaleCars', res.data)
    },

    /**
     * 获取车辆维修记录
     * @param {Object} param0 包含commit方法的对象
     * @param {Object} payload 包含车架号的对象
     */
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
