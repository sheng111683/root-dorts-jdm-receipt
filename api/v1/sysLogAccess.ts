import type { PagedList, SysLogAccess } from '~/models'
import { $apiGet, $apiPost } from '~/utils/request'

// 記得將 export 加入到 ./index.ts
export const Get = params => $apiGet<PagedList<SysLogAccess>>(`/v1/sysLogAccess`, params)
// export const Post = body => $apiPost<void>(`/v1/sysLogAccess`, body)
export const GetByEncryptionId = encryptionId => $apiGet<SysLogAccess>(`/v1/sysLogAccess/${encryptionId}`)
