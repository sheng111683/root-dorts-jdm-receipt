// 記得將 export 加入到 ./index.ts

export type Response<T> = T | {
  success: boolean
  msg: string
  status: number
  data: any
}
