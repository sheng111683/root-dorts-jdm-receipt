import { $apiPost } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Post = body => $apiPost<void>(`/v1/refreshToken`, body)
