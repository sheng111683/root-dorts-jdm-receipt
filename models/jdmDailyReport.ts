// 記得將 export 加入到 ./index.ts

// export interface JdmDailyReport {
//   agency: string,
//   printType: string,
//   handleType: string,
//   type: string,
//   certDate: string | Date,
// }

export interface MemoList {
  agency: string,
  certDate: string | Date,
  type:string,
  row: string,
  memo: string,
  encryptionId: string,
}

export function memoListMapper(item: MemoList) {
  const {
    agency,
    certDate,
    type,
    row,
    memo,
    encryptionId,
  } = item
  return {
    agency,
    certDate,
    type,
    row,
    memo,
    encryptionId,
  }
}

export function fromMemoListMapper(item: MemoList) {
  const obj = memoListMapper(item)
  return {
    ...obj,
  }
}

// export function jdmDailyReportMapper(item: JdmDailyReport) {
//   const {
//     agency,
//     printType,
//     handleType,
//     type,
//     certDate
//   } = item
//   return {
//     agency,
//     printType,
//     handleType,
//     type,
//     certDate
//   }
// }

// export function fromRawJdmDailyReportMapper(item: JdmDailyReport) {
//   const obj = jdmDailyReportMapper(item)
//   return {
//     ...obj,
//     certDate: (new Date(new Date(obj.certDate).getTime() + 28800000)),
//   }
// }

// export function getDefaultjdmDailyReport(): JdmDailyReport {
//   return {
//     agency: '',
//     printType: '',
//     handleType: '',
//     type: '1',
//     certDate: '',
//     }
// }
