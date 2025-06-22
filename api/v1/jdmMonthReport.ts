import type { MemoList, PagedList } from '~/models'
import { $apiGet, $apiPost, $apiPut } from '~/utils/request'

// 記得將 export 加入到 ./index.ts

export const Get = params => $apiGet<PagedList<MemoList>>(`/v1/jdmMonthReport`, params)

export const Post = body => $apiPost<void>(`/v1/jdmMonthReport`, body)

export const Put = body => $apiPut<void>(`/v1/jdmMonthReport`, body)

export const PrintMonthReport = body => $apiPost<void>(`/v1/jdmMonthReport/PrintMonthReport`, body)

export const GetApplyAgency = body => $apiPost<void>(`/v1/jdmMonthReport/getApplyAgency`, body)
