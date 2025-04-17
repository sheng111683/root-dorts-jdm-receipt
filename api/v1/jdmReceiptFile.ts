import type { JdmReceiptFile, PagedList } from '~/models'
import { $apiGet, $apiPost, $apiPut } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<JdmReceiptFile>>(`/v1/jdmReceiptFile`, params)

export const GetByEncryptionId = encryptionId => $apiGet<JdmReceiptFile>(`/v1/jdmReceiptFile/${encryptionId}`)

export const Post = body => $apiPost<void>(`/v1/jdmReceiptFile`, body)

export const Put = (encryptionId, body) => $apiPut<void>(`/v1/jdmReceiptFile/${encryptionId}`, body)

export const Remove = encryptionId => $apiPut<void>(`/v1/jdmReceiptFile/Remove/${encryptionId}`)
