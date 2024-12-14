// 环境配置
let BASE_URL = 'http://118.25.195.230:8000/'
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  BASE_URL = 'http://118.25.195.230:8000/'
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境
  BASE_URL = 'http://118.25.195.230:8000/'
}
  
export { BASE_URL, TIME_OUT }
