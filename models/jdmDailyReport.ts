// 記得將 export 加入到 ./index.ts
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