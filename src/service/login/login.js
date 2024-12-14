import { vgriRequest } from '../index'
import { userMenus, userMenus2, userMenus3, userMenus4 } from '../../views/main/config/menuList'

// 登录
export function login(data) {
  return vgriRequest.post({
    url: 'Login',
    data
  })
}

// 获取用户信息
export function getUserInfo(data) {
  return vgriRequest.post({
    url: 'GetMyInf',
    data
  })
}

// 获取用户菜单
export function getUserMenus() {
  return {
    code: 0,
    data: userMenus
  }
}

// 获取用户菜单(消费者)
export function getUserMenus2() {
  return {
    code: 0,
    data: userMenus2
  }
}

// 获取用户菜单(生产厂家)
export function getUserMenus3() {
  return {
    code: 0,
    data: userMenus3
  }
}

// 获取用户菜单(二手车销售商)
export function getUserMenus4() {
  return {
    code: 0,
    data: userMenus4
  }
}
