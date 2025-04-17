import type { PagedList, stampManagementFile } from '~/models'
import { $apiDelete, $apiGet, $apiPost, $apiPut } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<stampManagementFile>>(`/v1/stampManagementFile`, params)

export const GetByEncryptionId = encryptionId => $apiGet<stampManagementFile>(`/v1/stampManagementFile/${encryptionId}`)

export const Post = body => $apiPost<void>(`/v1/stampManagementFile`, body)

export const Put = (encryptionId, body) => $apiPut<void>(`/v1/stampManagementFile/${encryptionId}`, body)

export const Remove = encryptionId => $apiPut<void>(`/v1/stampManagementFile/Remove/${encryptionId}`)

export const Delete = encryptionId => $apiDelete<void>(`/v1/stampManagementFile/${encryptionId}`)

export const GetList = params => $apiGet<stampManagementFile[]>(`/v1/stampManagementFile/list`, params)

export const GetName = encryptionId => $apiGet<{ name: string }>(`/v1/stampManagementFile/${encryptionId}/name`)
