// 記得將 export 加入到 ./index.ts

export interface JdmReceiptFile {
  receiptType: string
  agency: string
  year: string
  startYear: string
  startMonth: string
  endYear: string
  endMonth: string
  treferDate: string | Date

}

export function jdmReceiptFileMapper(item: JdmReceiptFile) {
  const {
    receiptType,
    agency,
    year,
    startYear,
    startMonth,
    endYear,
    endMonth,
    treferDate,
  } = item
  return {
    receiptType,
    agency,
    year,
    startYear,
    startMonth,
    endYear,
    endMonth,
    treferDate,
  }
}

export function fromRawJdmReceiptFileMapper(item: JdmReceiptFile) {
  const obj = jdmReceiptFileMapper(item)
  return {
    ...obj,
  }
}

export function getDefaultjdmReceiptFile(): JdmReceiptFile {
  return {
    receiptType: '停車費',
    agency: '',
    year: '',
    startYear: '',
    startMonth: '',
    endYear: '',
    endMonth: '',
    treferDate: '',
  }
}
