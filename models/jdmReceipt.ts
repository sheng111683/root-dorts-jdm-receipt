// 記得將 export 加入到 ./index.ts

export interface JdmReceipt {
  encryptionId: string
  agency: string
  year: string
  receiptType: string
  receiptNumber: string
  payNumber: string
  payName: string
  paymentName: string
  payMoney: number
  makeDate: string | Date
  receipt_count: number
  removed: boolean

}

export function jdmReceiptMapper(item: JdmReceipt) {
  const {
    encryptionId,
    agency,
    year,
    receiptType,
    receiptNumber,
    payNumber,
    payName,
    paymentName,
    payMoney,
    makeDate,
    receipt_count,
    removed,
  } = item
  return {
    encryptionId,
    agency,
    year,
    receiptType,
    receiptNumber,
    payNumber,
    payName,
    paymentName,
    payMoney,
    makeDate,
    receipt_count,
    removed,
  }
}

export function fromRawJdmReceiptMapper(item: JdmReceipt) {
  const obj = jdmReceiptMapper(item)
  return {
    ...obj,
    makeDate: (new Date(new Date(obj.makeDate).getTime() + 28800000)),
  }
}

export function getDefaultjdmReceipt(): JdmReceipt {
  return {
    encryptionId: '',
    agency: '',
    year: '',
    receiptType: '',
    receiptNumber: '',
    payNumber: '',
    payName: '',
    paymentName: '',
    payMoney: 0,
    makeDate: '',
    receipt_count: 0,
    removed: false,
  }
}
