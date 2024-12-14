import {
  getAllUsers,
  getAllCheckCars,
  publishCar
} from '../../service/main/price-watch/price-watch'
import { getCarsById } from '@/service/main/car-market/car-market'

const priceWatchModule = {
  namespaced: true,
  state() {
    return {
      allUsers: [],
      checkCars: []
    }
  },
  mutations: {
    changeAllUsers(state, payload) {
      state.allUsers = payload
    },
    changeCheckCars(state, payload) {
      state.checkCars = payload
    }
  },
  getters: {
    userInfo(state, getters, rootState) {
      return rootState.login.userInfo
    }
  },
  actions: {
    // 获取所有用户信息
    async getAllUsersAction({ commit }) {
      const res = await getAllUsers()
      res.data = res.data.map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeAllUsers', res.data)
    },
    // 获取所有待定价车
    async getAllCheckCarsAction({ commit }) {
      const res = await getAllCheckCars()
      res.data = res.data.map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeCheckCars', res.data)
    },
    // 发行车辆
    async publishCarAction({ dispatch }, payload) {
      await publishCar(payload)
      dispatch('getAllCheckCarsAction')
    },
    // 通过车架号查询车辆
    async getCarsByIdAction({ commit }, payload) {
      const res = await getCarsById(payload)
      res.data = [res.data].map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeCheckCars', res.data)
    }
  }
}

export default priceWatchModule
