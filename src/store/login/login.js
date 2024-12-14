import {
  login,
  getUserInfo,
  getUserMenus,
  getUserMenus2,
  getUserMenus3,
  getUserMenus4
} from '../../service/login/login'
import localCache from '../../utils/cache'
import router from '../../router'
import { mapMenusToRoutes } from '../../utils/map-menu'

const loginModule = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      loginAccount: {}
      // codeInfo: {}
    }
  },
  mutations: {
    changeToken(state, payload) {
      state.token = payload
    },
    changeUserInfo(state, payload) {
      state.userInfo = payload
    },
    changeUserMenus(state, payload) {
      state.userMenus = payload

      // 动态添加路由
      const routes = mapMenusToRoutes(state.userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    },
    changeLoginAccount(state, payload) {
      state.loginAccount = payload
    }
  },
  actions: {
    async loginAccountAction({ commit }, payload) {
      // 1. 登录
      const loginRes = await login(payload)
      if (!loginRes) return
      commit('changeLoginAccount', payload)
      localCache.cacheSet('loginAccount', payload)
      const token = `${Math.round(Math.random()) * 1000000}`
      commit('changeToken', token)
      localCache.cacheSet('token', token)

      // 2. 获取用户信息
      const userInfoRes = await getUserInfo({ account: payload.account })
      const userInfo = userInfoRes.data
      commit('changeUserInfo', userInfo)
      localCache.cacheSet('userInfo', userInfo)

      // 3. 获取角色菜单
      let userMenuRes = []
      if (userInfo.usertype === '1') {
        userMenuRes = getUserMenus2()
      } else if (userInfo.usertype === '2') {
        userMenuRes = getUserMenus3()
      } else if (userInfo.usertype === '3') {
        userMenuRes = getUserMenus4()
      } else {
        userMenuRes = getUserMenus()
      }
      const userMenus = userMenuRes.data
      commit('changeUserMenus', userMenus)
      localCache.cacheSet('userMenus', userMenus)

      // 跳转到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.cacheGet('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.cacheGet('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.cacheGet('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
