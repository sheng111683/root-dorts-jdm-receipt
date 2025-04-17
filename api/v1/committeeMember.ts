import type { CommitteeMember, PagedList } from '~/models'
import { $apiDelete, $apiGet, $apiPost, $apiPut } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<CommitteeMember>>(`/v1/committeeMember`, params)

export const GetByEncryptionId = encryptionId => $apiGet<CommitteeMember>(`/v1/committeeMember/${encryptionId}`)

export const Post = body => $apiPost<void>(`/v1/committeeMember`, body)

export const Put = (encryptionId, body) => $apiPut<void>(`/v1/committeeMember/${encryptionId}`, body)

export const Remove = encryptionId => $apiPut<void>(`/v1/committeeMember/Remove/${encryptionId}`)

export const Delete = encryptionId => $apiDelete<void>(`/v1/committeeMember/${encryptionId}`)

export const GetList = params => $apiGet<CommitteeMember[]>(`/v1/committeeMember/list`, params)

export const GetName = encryptionId => $apiGet<{ name: string }>(`/v1/committeeMember/${encryptionId}/name`)
