import type { PagedList, SysLogLogin } from '~/models'
import { $apiGet } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<SysLogLogin>>(`/v1/sysLogLogin`, params)
