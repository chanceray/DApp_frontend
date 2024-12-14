import { vgriRequest } from '../../index'

// 新车上传
export function uploadNewCar(data) {
  return vgriRequest.post({
    url: 'NewCar',
    data
  })
}

// 图片上传
export function uploadCarPicture(data) {
  return vgriRequest.post({
    url: 'UploadImg',
    data
  })
}
