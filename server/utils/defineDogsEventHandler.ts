import type { EventHandlerRequest, H3Event } from 'h3'
import type { ApiOptions } from '~/utils/request'

const runtimeConfig = useRuntimeConfig()
const { baseURL } = runtimeConfig.public.thirdParty.demo.dogs
/** 封裝 defineEventHandler 自訂義原生 $fetch 後，將 $fetch 丟出為 $apiFetch */
export function defineDogsEventHandler(fn: (event: H3Event<EventHandlerRequest>, $apiFetch: (url: string, opts?: ApiOptions) => Promise<any>) => Promise<any>) {
  return defineEventHandler(async (event) => {
    const headers = {}
    return $thirdPartyRequestHelper(baseURL, headers, event, async ($apiFetch) => {
      return await fn(event, $apiFetch)
    })
  })
}
