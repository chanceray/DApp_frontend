import { vgriRequest } from '../../index'

// 获取本号码未被接单的服务
export function getMyCars(data) {
  return vgriRequest.post({
    url: 'GetMyCar',
    data
  })
}

// 车辆售出
export function saleCar(data) {
  return vgriRequest.post({
    url: 'SellCar',
    data
  })
}

// 上传维修记录
export function uploadLog(data) {
  return vgriRequest.post({
    url: 'UpdateRepair',
    data
  })
}

// 获取所有上链的车辆
export function getAllCar(data) {
  return vgriRequest.post({
    url: 'GetAllCar',
    data
  })
}
