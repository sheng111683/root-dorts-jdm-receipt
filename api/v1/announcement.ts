import type { Announcement, PagedList } from '~/models'
import { $apiGet, $apiPost, $apiPut } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<Announcement>>(`/v1/announcement`, params)

export const GetByEncryptionId = encryptionId => $apiGet<Announcement>(`/v1/announcement/${encryptionId}`)

export const Post = body => $apiPost<void>(`/v1/announcement`, body)

export const Put = (encryptionId, body) => $apiPut<void>(`/v1/announcement/${encryptionId}`, body)

export const Remove = encryptionId => $apiPut<void>(`/v1/announcement/Remove/${encryptionId}`)
