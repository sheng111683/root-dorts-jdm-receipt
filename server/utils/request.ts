import type { EventHandlerRequest, H3Event } from 'h3'
import type { ApiOptions } from '~/utils/request'

const runtimeConfig = useRuntimeConfig()
const { apiBase } = runtimeConfig.public

function $getServerFetch(baseURL: string, headers: { [key: string]: string }, logCallback: (sysLogApi: any) => void) {
  return <responseType>(url: string, opts?: ApiOptions) => {
    const target = `${url}`
    return $fetch<responseType>(target, {
      ...opts,
      async onRequest({ options }) {
        options.baseURL = baseURL
        if (headers) {
          options.headers = {
            ...headers,
            ...options.headers,
          }
        }
      },
      async onResponse({ request, response, options }) {
        // console.log({ request, response, options })
        const rs = request.match(/https?:\/\/[^/]+:(\d*)/)
        const port = rs ? rs[1] : request.startsWith('https://') ? '443' : request.startsWith('http://') ? '80' : ''
        const queryParams = new URLSearchParams(options.params).toString()
        const sysLogApi = {
          httpMethodType: options.method,
          port,
          response: JSON.stringify(response._data),
          url: (['GET', 'DELETE'].includes(options.method))
            ? request.replace(/\?[\s\S]*$/, '')
            : `${request.replace(/\?[\s\S]*$/, '')}${queryParams ? `?${queryParams}` : ''}`,
          queryData: (['GET', 'DELETE'].includes(options.method))
            ? queryParams
            : options.body,
        }
        if (logCallback)
          logCallback(sysLogApi)
      },
    })
  }
}
/**
 * 處理 request 統一回傳格式
 * 正確則回傳 { success: true, data: data }
 * 錯誤則回傳 {
 *    success: false,
 *    msg: e.toString(),
 *    status: e.status,
 *    data: e.data
 *  }
 */
export async function $requestHelper(event: H3Event<EventHandlerRequest>, fn: ($serviceFetch: (url: string, opts?: ApiOptions) => Promise<any>) => any) {
  try {
    const ip = getRequestIP(event, { xForwardedFor: true }) || ''
    const headers = getHeaders(event)
    const { 'user-agent': userAgent } = headers
    const authToken = getCookie(event, 'auth-token')
    const $serverFetch = $getServerFetch(`${apiBase}`, {
      ...(authToken ? { authorization: `Bearer ${authToken}` } : {}),
      ...(userAgent ? { 'user-agent': userAgent } : {}),
      'x-forwarded-for': ip,
    })
    const data = await fn($serverFetch)
    if (data instanceof Blob) {
      return data
    }
    else {
      return {
        success: true,
        data,
      }
    }
  }
  catch (e: any) {
    console.error(e)
    return {
      success: false,
      msg: e.toString(),
      status: e.status,
      data: e.data,
    }
  }
}

/**
 處理第三方 request 紀錄呼叫 log 至 server
 */
export async function $thirdPartyRequestHelper(baseURL: string, headers: { [key: string]: string }, event: H3Event<EventHandlerRequest>, fn: ($apiFetch: (url: string, opts?: ApiOptions) => Promise<any>) => any) {
  const $apiFetch = $getServerFetch(baseURL, headers, (sysLogApi) => {
    $requestHelper(event, async ($serverFetch) => {
      $serverFetch(`/api/SysLogApi`, {
        method: 'post',
        body: [sysLogApi],
      })
        .catch(e => console.error(e))
    })
  })
  return await fn($apiFetch)
}
