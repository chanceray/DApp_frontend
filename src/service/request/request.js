import axios from 'axios'
import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
import { ElMessage } from 'element-plus'

const DEFAULT_LOADING = true

class VgriRequest {
  instance // axios实例
  interceptors // 拦截器回调
  showLoading // 是否显示loading
  loading
  constructor(config) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading || DEFAULT_LOADING

    // 请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截
    // 请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例都有的请求成功拦截')
        // 为请求添加loading效果
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '数据请求中...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      (err) => {
        console.log(err)
      }
    )

    // 响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        const data = res?.data
        // 根据服务器返回的状态码判断请求是否成功
        if (data.code === 200) {
          return data
        } else {
          ElMessage({
            message: data.msg,
            type: 'error'
          })
        }
      },
      (err) => {
        this.loading?.close()
        // 根绝HttpErrorCode显示请求失败的不同错误信息，通过message弹出不同的错误提示
        switch (err.response.status) {
          case 404:
            ElMessage({
              message: 'not found',
              type: 'error'
            })
            break
          case 415:
            ElMessage({
              message: '格式不正确',
              type: 'error'
            })
            break
          default:
            break
        }
        // console.log(err)
        return err
      }
    )
  }

  request(config) {
    // 返回一个promise
    return new Promise((resolve, reject) => {
      // 某个请求独有的拦截
      // 请求拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 响应拦截
      if (config.interceptors?.responseInterceptor) {
        config = config.interceptors.responseInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request(config)
        .then((res) => {
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'GET' })
  }

  post(config) {
    return this.request({ ...config, method: 'POST' })
  }

  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch(config) {
    return this.request({ ...config, method: 'PATCH' })
  }

  put(config) {
    return this.request({ ...config, method: 'PUT' })
  }
}

export default VgriRequest
