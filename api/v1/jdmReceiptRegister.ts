import type { MemoList, PagedList } from '~/models'
import { $apiGet, $apiPost, $apiPut } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<MemoList>>(`/v1/jdmReceiptRegister`, params)

export const Post = body => $apiPost<void>(`/v1/jdmReceiptRegister`, body)

export const Put = body => $apiPut<void>(`/v1/jdmReceiptRegister`, body)

export const PrintReceiptRegister = body => $apiPost<void>(`/v1/jdmReceiptRegister/PrintReceiptRegister`, body)

