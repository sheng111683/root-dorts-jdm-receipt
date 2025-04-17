// 記得將 export 加入到 ./index.ts

export interface Order {
  // id: number;
  encryptionId: string
  sysNumber: string
  orderDate: string | Date
  stateType: string
  removed?: boolean
}

export function orderMapper(item: Order) {
  const {
    // id,
    encryptionId,
    sysNumber,
    orderDate,
    stateType,
    removed,

  } = item
  return {
    // id,
    encryptionId,
    sysNumber,
    orderDate,
    stateType,
    removed,
  }
}

export function fromRawOrderMapper(item: Order) {
  const obj = orderMapper(item)
  return {
    ...obj,
    orderDate: new Date(new Date(obj.orderDate).getTime() + 28800000),
  }
}

export function getDefaultOrder() {
  return {
  // id: 0,
    encryptionId: '',
    sysNumber: '',
    orderDate: '',
    stateType: '',
  }
}
