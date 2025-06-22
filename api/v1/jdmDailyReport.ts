import type { MemoList, PagedList } from '~/models'
import { $apiGet, $apiPost, $apiPut } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<MemoList>>(`/v1/jdmDailyReport`, params)

export const Post = body => $apiPost<void>(`/v1/jdmDailyReport`, body)

export const Put = body => $apiPut<void>(`/v1/jdmDailyReport`, body)

export const PrintDailyReport = body => $apiPost<void>(`/v1/jdmDailyReport/PrintDailyReport`, body)

export const GetApplyAgency = body => $apiPost<void>(`/v1/jdmDailyReport/getApplyAgency`, body)
