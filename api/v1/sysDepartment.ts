import type { PagedList, SysDepartment } from '~/models'
import { $apiDelete, $apiGet, $apiPost, $apiPut } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<SysDepartment>>(`/v1/sysDepartment`, params)

export const GetByEncryptionId = encryptionId => $apiGet<SysDepartment>(`/v1/sysDepartment/${encryptionId}`)

export const Post = body => $apiPost<void>(`/v1/sysDepartment`, body)

export const Put = body => $apiPut<void>(`/v1/sysDepartment`, body)

export const Remove = body => $apiPut<void>(`/v1/sysDepartment/Remove`, body)

export const Delete = encryptionId => $apiDelete<void>(`/v1/sysDepartment/${encryptionId}`)

export const GetList = (params = {}) => $apiGet<SysDepartment[]>(`/v1/sysDepartment/getList`, params)

export const GetParentSelectList = encryptionId => $apiGet<SysDepartment[]>(`/v1/sysDepartment/getList/${encryptionId}`)

export const GetAllSelectList = (encryptionId = {}) => $apiGet<SysDepartment[]>(`/v1/sysDepartment/getList/getAllSelectList`, encryptionId)

export const GetName = encryptionId => $apiGet<{ name: string }>(`/v1/sysDepartment/${encryptionId}/name`)
