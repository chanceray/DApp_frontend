import { createStore } from 'vuex'
import login from './login/login'
import carIndex from './main/car-index'
import carMarket from './main/car-market'
import newCarSale from './main/new-car-sale'
import priceWatch from './main/price-watch'

const store = createStore({
  state() {
    return {
      name: 'vgri'
    }
  },
  mutations: {},
  actions: {},
  modules: {
    login,
    carIndex,
    carMarket,
    newCarSale,
    priceWatch
  }
})

// 初始化vuex，解决用户登录成功后进入首页，刷新页面，导致vuex中token，userInfo，userMenus没有数据的问题
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
