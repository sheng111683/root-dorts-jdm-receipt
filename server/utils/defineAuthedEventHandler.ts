import type { EventHandlerRequest, H3Event } from 'h3'
import type { ApiOptions } from '~/utils/request'
/** 封裝 defineEventHandler 注入 authorization 到 header 至原生 $fetch 後，將 $fetch 丟出為 $serverFetch */
export function defineAuthEventHandler(fn: (event: H3Event<EventHandlerRequest>, $serverFetch: (url: string, opts?: ApiOptions) => Promise<any>) => Promise<any>) {
  return defineEventHandler(async (event) => {
    return $requestHelper(event, async ($serverFetch) => {
      return await fn(event, $serverFetch)
    })
  })
}
