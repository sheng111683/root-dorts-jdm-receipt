// 記得將 export 加入到 ./index.ts

export interface RouteTreeNode {
  name: string
  path: string
  meta: {
    title: string
    icon: string
  }
  children: RouteTreeNode[]
}
