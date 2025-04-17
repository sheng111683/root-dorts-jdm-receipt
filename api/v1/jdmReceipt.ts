import type { JdmReceipt, PagedList } from '~/models'
import { $apiGet, $apiPost, $apiPut } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<JdmReceipt>>(`/v1/jdmReceipt`, params)

export const GetByEncryptionId = encryptionId => $apiGet<JdmReceipt>(`/v1/jdmReceipt/${encryptionId}`)

export const Post = body => $apiPost<void>(`/v1/jdmReceipt`, body)

export const Put = (encryptionId, body) => $apiPut<void>(`/v1/jdmReceipt/${encryptionId}`, body)

export const Remove = encryptionId => $apiPut<void>(`/v1/jdmReceipt/Remove/${encryptionId}`)

export const GetApplyAgency = body => $apiPost<void>(`/v1/jdmReceipt/getApplyAgency`, body)
