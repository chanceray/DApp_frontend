import VgriRequest from './request/request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '../utils/cache'

const vgriRequest = new VgriRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // showLoading: true,
  interceptors: {
    async requestInterceptor(config) {
      // console.log('请求成功拦截')
      // 请求token的拦截 将token添加到请求头里面去
      const tokenInfo = localCache.cacheGet('tokenInfo')
      if (tokenInfo && config.headers) {
        config.headers.Authorization = `Bearer ${tokenInfo.token}`
      }
      return config
    },
    requestInterceptorCatch(err) {
      // console.log('请求失败拦截')
      console.log(err)
    },
    responseInterceptor(config) {
      // console.log('响应成功拦截')
      return config
    },
    responseInterceptorCatch(err) {
      // console.log('响应失败拦截')
      console.log(err)
    }
  }
})

export { vgriRequest }
