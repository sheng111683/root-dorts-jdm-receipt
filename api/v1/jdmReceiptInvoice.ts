import type { JdmReceiptInvoice, PagedList } from '~/models'
import { $apiGet, $apiPost, $apiPut } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<JdmReceiptInvoice>>(`/v1/jdmReceiptInvoice`, params)

export const GetByEncryptionId = encryptionId => $apiGet<JdmReceiptInvoice>(`/v1/jdmReceiptInvoice/${encryptionId}`)

export const Post = body => $apiPost<void>(`/v1/jdmReceiptInvoice`, body)

export const PrintInvoiceReceipt = body => $apiPost<void>(`/v1/jdmReceiptInvoice/printInvoiceReceipt`, body)

export const Put = (encryptionId, body) => $apiPut<void>(`/v1/jdmReceiptInvoice/${encryptionId}`, body)

export const Remove = encryptionId => $apiPut<void>(`/v1/jdmReceiptInvoice/Remove/${encryptionId}`)
