// 記得將 export 加入到 ./index.ts

export interface PagedList<T> {
  firstItemOnPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  isFirstPage: boolean
  isLastPage: boolean
  items: T[]
  lastItemOnPage: number
  pageCount: number
  pageNumber: number
  pageSize: number
  totalItemCount: number
  AMT: number
}

export function getDefaultPageList<T>(): PagedList<T> {
  return {
    firstItemOnPage: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    isFirstPage: true,
    isLastPage: false,
    items: [],
    lastItemOnPage: 0,
    pageCount: 0,
    pageNumber: 1,
    pageSize: 20,
    totalItemCount: 0,
    AMT: 0,
  }
}
