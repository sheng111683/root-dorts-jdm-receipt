import type { PagedList, SysLogFileDownload } from '~/models'
import { $apiGet } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<SysLogFileDownload>>(`/v1/sysLogFileDownload`, params)
