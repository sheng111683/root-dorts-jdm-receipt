import type { JdmReceiptPrint, PagedList } from '~/models'
import { $apiGet, $apiPost, $apiPut } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<JdmReceiptPrint>>(`/v1/jdmReceiptPrint`, params)

export const GetByEncryptionId = encryptionId => $apiGet<JdmReceiptPrint>(`/v1/jdmReceiptPrint/${encryptionId}`)

export const Post = body => $apiPost<void>(`/v1/jdmReceiptPrint`, body)

export const PrintReceipt = body => $apiPost<void>(`/v1/jdmReceiptPrint/printReceipt`, body)

export const Put = (encryptionId, body) => $apiPut<void>(`/v1/jdmReceiptPrint/${encryptionId}`, body)

export const Remove = encryptionId => $apiPut<void>(`/v1/jdmReceiptPrint/Remove/${encryptionId}`)
