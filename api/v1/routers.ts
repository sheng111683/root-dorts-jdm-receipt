import type { PrivilegeMap, RouteTreeNode } from '~/models'
import { $apiGet } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = () => $apiGet<{ routeTree: RouteTreeNode[], privilegeMap: PrivilegeMap }>(`/v1/routers`)
