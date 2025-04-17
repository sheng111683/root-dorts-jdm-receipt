import { skipHydrate } from 'pinia'

/**
 * 無感刷新 token
 * refreshToken 的過期時間（比如30天）應大於 accessToken 的過期時間（比如2小時）
 * 在 cookie（過期自動銷毀）裡存放: { auth-token: accessToken }
 * 在 localStorage（瀏覽器關閉自動銷毀）裡存放：{ user-info: { username, roles } }
 */
const userInfoInit = { username: '', roles: [] as Array<string> }

export const useUserStore = defineStore('user', () => {
  const { $api } = useNuxtApp()
  /* state */
  const userInfo = useLocalStorage('user-info', userInfoInit)
  /* actions */
  /* 登入 */
  async function login(data: any) {
    const loginResponse: any = await $api.v1.Login.Post(data)
    if (loginResponse) {
      const { username, roles } = loginResponse
      userInfo.value = { username, roles }
    }
    return loginResponse
  }

  /* 前端登出（不呼叫API） */
  async function logOut() {
    const authToken = useCookie('auth-token')
    authToken.value = null
    userInfo.value = { ...userInfoInit }
    navigateTo('/')
  }
  /* 更新 token */
  async function handRefreshToken() {
    await $api.v1.RefreshToken.Post()
  }
  /**
   * 為了讓 userInfo 能先從客戶端的 LocalStorage 中取值。使用 skipHydrate() 的輔助函數。
   * 詳見：https://pinia.vuejs.org/zh/cookbook/composables.html#ssr
   */
  return { userInfo: skipHydrate(userInfo), login, logOut, handRefreshToken }
})
