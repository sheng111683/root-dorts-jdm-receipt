import type { SearchParameters } from 'ofetch'
import { jwtDecode } from 'jwt-decode'
import type { Response } from '~/models'

export interface ApiOptions {
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete'
  body?: RequestInit['body'] | Record<string, any>
  params?: SearchParameters
  query?: SearchParameters
  headers?: any
}

export const $apiGet = <responseType>(url: string, params?: SearchParameters) => $api<responseType>(url, { params, method: 'get' })

export const $apiPost = <responseType>(url: string, body?: RequestInit['body'] | Record<string, any>) => $api<responseType>(url, { body, method: 'post' })

export const $apiPut = <responseType>(url: string, body?: RequestInit['body'] | Record<string, any>) => $api<responseType>(url, { body, method: 'put' })

export const $apiPatch = <responseType>(url: string, body?: RequestInit['body'] | Record<string, any>) => $api<responseType>(url, { body, method: 'patch' })

export const $apiDelete = <responseType>(url: string) => $api<responseType>(url, { method: 'delete' })

/** 所有 ajax 請求顯示 loading */
const { loading, unloading } = useLoading()

/**
 * 請求回應 200 時，直接回傳 data
 * 請求回應非 200 時，回傳 {
 *   success,
 *   msg,
 *   status,
 *   data
 * }
 * @param url
 * @param opts
 * @returns Response<responseType>
 */
export function $api<responseType>(url: string, opts?: ApiOptions) {
  const target = `/api${url}`
  loading()
  return $fetch<Response<responseType>>(target, {
    ...opts,
    async onRequest({ options }) {
      const authToken = useCookie('auth-token')
      const refreshToken = useCookie('refresh-token')
      if (process.client && refreshToken.value) {
        refreshToken.value = null
      }
      const requestHeader = useRequestHeaders()
      const rawCookie = requestHeader.cookie
      let newCookie
      if (rawCookie) {
        newCookie = rawCookie
          .replace(/auth-token=[^;]+/, `auth-token=${authToken.value}`) // refresh token 後馬上使用新的 auth-token
          .replace(/refresh-token=[^;]+;?/, ``) // 避免手動複製 token 的使用
      }
      if (authToken.value) {
        options.headers = {
          ...requestHeader,
          ...(newCookie
            ? {
                cookie: newCookie,
              }
            : {}),
          ...options.headers,
        }
      }
    },
    // async onRequestError({ error }) {
    //   console.log('request 出錯啦,error信息是=========', error)
    // },
    async onResponse({ response }) {
      const { success, msg, status, data } = response._data
      if (success) {
        /* 將 返回數據中的 data 作為返回值 */
        response._data = data
      }
      else {
        if (process.client) {
          const userStore = useUserStore()
          const authToken = useCookie('auth-token')
          const notification = useNotification()
          if (status === 400) {
            notification.warning(`[${status}]: ${data.message}`)
          }
          else if (authToken.value && status === 401) {
            const jwtContent = jwtDecode(authToken.value || '')
            if ((jwtContent.exp || 0) * 1000 <= new Date().getTime()) {
              userStore.logOut()
            }
            else {
              notification.error(msg)
            }
          }
          else if (status === 401) {
            userStore.logOut()
          }
          else {
            if (data) {
              console.error(msg)
              notification.error(`[${status}]: ${JSON.stringify(data)}`)
            }
            else {
              notification.error(msg)
            }
          }
        }
      }
      unloading()
    },
    // async onResponseError({ error }) {
    //   console.log('response 出錯啦,error信息是=========', error)
    // },
  })
}
