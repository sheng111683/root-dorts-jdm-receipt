import { $apiPost } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const PrintReceiptRecord = body => $apiPost<void>(`/v1/jdmReceiptRecord/PrintReceiptRecord`, body)

