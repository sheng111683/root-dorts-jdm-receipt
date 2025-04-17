// 記得將 export 加入到 ./index.ts

export interface JdmReceiptPrint {
  encryptionId: string
  jdmReceiptId: string
  printReason: string
  printNumber: number
  printDate: string | Date
  removed: boolean

}

export function jdmReceiptPrintMapper(item: JdmReceiptPrint) {
  const {
    encryptionId,
    jdmReceiptId,
    printReason,
    printNumber,
    printDate,
    removed,
  } = item
  return {
    encryptionId,
    jdmReceiptId,
    printReason,
    printNumber,
    printDate,
    removed,
  }
}

export function fromRawJdmReceiptPrintMapper(item: JdmReceiptPrint) {
  const obj = jdmReceiptPrintMapper(item)
  return {
    ...obj,
    printDate: (new Date(new Date(obj.printDate).getTime() + 28800000)),
  }
}

export function getDefaultjdmReceiptPrint(): JdmReceiptPrint {
  return {
    encryptionId: '',
    jdmReceiptId: '',
    printReason: '',
    printNumber: 0,
    printDate: '',
    removed: false,
  }
}
