import type { Order, PagedList } from '~/models'
import { $apiDelete, $apiGet, $apiPost, $apiPut } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<Order>>(`/v1/order`, params)

export const GetByEncryptionId = encryptionId => $apiGet<Order>(`/v1/order/${encryptionId}`)

export const Post = body => $apiPost<void>(`/v1/order`, body)

export const Put = (encryptionId, body) => $apiPut<void>(`/v1/order/${encryptionId}`, body)

export const Remove = encryptionId => $apiPut<void>(`/v1/order/Remove/${encryptionId}`)

export const Delete = encryptionId => $apiDelete<void>(`/v1/order/${encryptionId}`)
