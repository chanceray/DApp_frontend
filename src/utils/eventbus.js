import mitt from 'mitt'

const emitter = mitt()

export const eventBus = {
  // ... 其他事件
  CAR_UPLOADED: 'carUploaded',  // 添加车辆上链事件
  emit: emitter.emit,
  on: emitter.on,
  off: emitter.off
}
