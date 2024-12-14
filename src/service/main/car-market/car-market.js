import { vgriRequest } from '../../index'

// 获取所有在售车辆
export function getAllSaleCars(data) {
  return vgriRequest.post({
    url: 'GetAllCarOnSell',
    data
  })
}

// 购买车辆
export function buyCar(data) {
  return vgriRequest.post({
    url: 'BuyCar',
    data
  })
}

// 历史交易信息
export function tradeHistoryList(data) {
  return vgriRequest.post({
    url: 'GetAllTX',
    data
  })
}

// 通过车辆价格查询车辆
export function getCarsByPrice(data) {
  return vgriRequest.post({
    url: 'FindByPriceRange',
    data
  })
}

// 通过车架号查询车辆
export function getCarsById(data) {
  return vgriRequest.post({
    url: 'FindByCarId',
    data
  })
}

// 通过车品牌查询车辆
export function getCarsByBrand(data) {
  return vgriRequest.post({
    url: 'FindByCarBrand',
    data
  })
}

// 获取维修记录
export function getCarServiceLogs(data) {
  return vgriRequest.post({
    url: 'GetCarRepairInfo',
    data
  })
}
