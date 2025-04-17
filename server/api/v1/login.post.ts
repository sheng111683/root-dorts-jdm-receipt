import { jwtDecode } from 'jwt-decode'
import { encryptAES } from '~/utils/encryptUtil'
/**
 * /api/login 的後端返回：
 */
export interface loginResponse {
  // 用戶名
  username: string
  // 權限角色
  roles: Array<string>
}

/** 登錄 */
export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
  const apiLoginResponse: { accessToken: string, refreshToken: string } | void = await $serverFetch(`/api/Login`, {
    method: 'post',
    params: { account: body?.username, password: body?.password },
  })
  if (apiLoginResponse) {
    const { accessToken, refreshToken } = apiLoginResponse
    const jwtContent: any = jwtDecode(accessToken)
    const refreshJwtContent: any = jwtDecode(refreshToken)
    const { sysUserName: username, roles } = jwtContent
    setCookie(event, 'auth-token', accessToken, {
      expires: new Date(jwtContent.exp * 1000),
    })
    setCookie(event, 'refresh-token', encryptAES(refreshToken), {
      httpOnly: true,
      expires: new Date(refreshJwtContent.exp * 1000),
    })
    const user: loginResponse = {
      username,
      roles,
    }
    return user
  }
  else {
    throw new Error('[401]: 帳號密碼驗證有誤')
  }
})
