import { $apiPost } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const PrintReceiptPrintError = body => $apiPost<void>(`/v1/jdmDailyPrintError/PrintReceiptPrintError`, body)

export const GetApplyAgency = body => $apiPost<void>(`/v1/jdmDailyPrintError/getApplyAgency`, body)
