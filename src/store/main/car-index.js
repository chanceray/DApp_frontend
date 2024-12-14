import { getMyCars, saleCar, uploadLog, getAllCar } from '@/service/main/car-index/car-index'

const carIndexModule = {
  namespaced: true,
  state() {
    return {
      myCars: [],
      allCars: []
    }
  },
  mutations: {
    changeMyCars(state, payload) {
      state.myCars = payload
    },
    changeAllCars(state, payload) {
      state.allCars = payload
    }
  },
  getters: {
    userInfo(state, getters, rootState) {
      return rootState.login.userInfo
    }
  },
  actions: {
    // 获取我的车辆
    async getMyCarsAction({ commit, getters }) {
      const res = await getMyCars({ Identity: getters.userInfo.Identity })
      res.data = res.data.map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeMyCars', res.data)
    },
    // 售出车辆
    saleCarAction({ dispatch }, payload) {
      return new Promise((resolve) => {
        saleCar(payload).then((res) => {
          resolve(res)
          dispatch('getMyCarsAction')
        })
      })
    },
    // 上传维修记录
    uploadLogAction({ dispatch }, payload) {
      return new Promise((resolve) => {
        uploadLog(payload).then((res) => {
          resolve(res)
          dispatch('getMyCarsAction')
        })
      })
    },
    // 获取所有上链的车辆
    async getAllCarAction({ commit }) {
      const res = await getAllCar()
      res.data = res.data.map((item, index) => {
        item.index = index + 1
        return item
      })
      commit('changeAllCars', res.data)
    }
  }
}

export default carIndexModule
