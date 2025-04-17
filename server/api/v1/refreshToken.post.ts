import { jwtDecode } from 'jwt-decode'
import { decryptAES, encryptAES } from '~/utils/encryptUtil'
/** 更新token */
export default defineAuthEventHandler(async (event, $serverFetch) => {
  const oldRefreshToken = getCookie(event, 'refresh-token')
  const apiRefreshTokenResponse: { accessToken: string, refreshToken: string } | void = await $serverFetch(`/api/RefreshToken`, {
    method: 'post',
    headers: {
      authorization: `Bearer ${decryptAES(oldRefreshToken)}`,
    },
  })
  if (apiRefreshTokenResponse) {
    const { accessToken, refreshToken } = apiRefreshTokenResponse
    const jwtContent: any = jwtDecode(accessToken)
    const refreshJwtContent: any = jwtDecode(refreshToken)
    setCookie(event, 'auth-token', accessToken, {
      expires: new Date(jwtContent.exp * 1000),
    })
    setCookie(event, 'refresh-token', encryptAES(refreshToken), {
      httpOnly: true,
      expires: new Date(refreshJwtContent.exp * 1000),
    })
  }
  else {
    throw new Error('[401]: 登入憑證已逾期請重新登入')
  }
})
