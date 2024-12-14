import { vgriRequest } from '../index'

// 注册
export function register(data) {
  return vgriRequest.post({
    url: 'Register',
    data
  })
}
