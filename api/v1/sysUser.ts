import type { PagedList, SysUser } from '~/models'
import { $apiDelete, $apiGet, $apiPost, $apiPut } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<SysUser>>(`/v1/sysUser`, params)

export const GetByEncryptionId = encryptionId => $apiGet<SysUser>(`/v1/sysUser/${encryptionId}`)

export const Post = body => $apiPost<void>(`/v1/sysUser`, body)

export const Put = body => $apiPut<void>(`/v1/sysUser`, body)

export const Remove = body => $apiPut<void>(`/v1/sysUser/Remove`, body)

export const Delete = encryptionId => $apiDelete<void>(`/v1/sysUser/${encryptionId}`)

export const GetList = params => $apiGet<SysUser[]>(`/v1/sysUser/list`, params)

export const GetName = encryptionId => $apiGet<{ name: string }>(`/v1/sysUser/${encryptionId}/name`)
