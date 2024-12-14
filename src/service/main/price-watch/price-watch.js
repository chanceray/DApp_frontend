import { vgriRequest } from '../../index'

// 获取所有在售车辆
export function getAllUsers(data) {
  return vgriRequest.post({
    url: 'FindAllUser',
    data
  })
}

// 获取所有待定价车
export function getAllCheckCars(data) {
  return vgriRequest.post({
    url: 'GetAllCarOnCheck',
    data
  })
}

// 发行车辆
export function publishCar(data) {
  return vgriRequest.post({
    url: 'AgreePublish',
    data
  })
}
