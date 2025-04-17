import type { PagedList, SysEnterprise } from '~/models'
import { $apiDelete, $apiGet, $apiPost, $apiPut } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<SysEnterprise>>(`/v1/sysEnterprise`, params)

export const GetByEncryptionId = encryptionId => $apiGet<SysEnterprise>(`/v1/sysEnterprise/${encryptionId}`)

export const Post = body => $apiPost<void>(`/v1/sysEnterprise`, body)

export const Put = body => $apiPut<void>(`/v1/sysEnterprise`, body)

export const Remove = body => $apiPut<void>(`/v1/sysEnterprise/Remove`, body)

export const Delete = encryptionId => $apiDelete<void>(`/v1/sysEnterprise/${encryptionId}`)

export const GetList = params => $apiGet<SysEnterprise[]>(`/v1/sysEnterprise/list`, params)

export const GetName = encryptionId => $apiGet<{ name: string }>(`/v1/sysEnterprise/${encryptionId}/name`)
