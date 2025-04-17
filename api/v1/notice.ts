import type { Notice, PagedList } from '~/models'
import { $apiGet } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<Notice>>(`/v1/notice`, params)
export const GetByEncryptionId = encryptionId => $apiGet<Notice>(`/v1/notice/${encryptionId}`)
