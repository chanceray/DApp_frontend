import { uploadNewCar, uploadCarPicture } from '@/service/main/new-car-sale/new-car-sale'

const newCarSaleModule = {
  namespaced: true,
  state() {
    return {}
  },
  mutations: {},
  getters: {
    userInfo(state, getters, rootState) {
      return rootState.login.userInfo
    }
  },
  actions: {
    // 新车上传
    uploadNewCarAction({ dispatch }, payload) {
      return new Promise((resolve) => {
        uploadNewCar(payload).then((res) => {
          console.log(res)
          resolve(res)
          dispatch('carIndex/getAllCarAction', {}, { root: true })
        })
      })
    },
    // 新车图片上传
    uploadCarPictureAction(context, payload) {
      return new Promise((resolve) => {
        uploadCarPicture(payload).then((res) => {
          resolve(res)
        })
      })
    }
  }
}

export default newCarSaleModule
