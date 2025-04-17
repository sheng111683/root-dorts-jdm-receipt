import type { PagedList, SysLogDataChange } from '~/models'
import { $apiGet } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<SysLogDataChange>>(`/v1/sysLogDataChange`, params)
export const GetByEncryptionId = encryptionId => $apiGet<SysLogDataChange>(`/v1/sysLogDataChange/${encryptionId}`)
