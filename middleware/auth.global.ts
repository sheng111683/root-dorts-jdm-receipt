import { storeToRefs } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { getDefaultPrivilege } from '~/models'
import type { Privilege, SysLogAccess } from '~/models'
import { useRouteMetaBreadcrumb } from '~/composables/routeMeta'
import { $apiPost } from '~/utils/request'

const whiteList = ['/', '/doc/*']

function pathToRegExp(path: string) {
  const pattern = path.replaceAll('/', '\/').replaceAll('*', '.*')
  return new RegExp(`^${pattern}$`)
}

export default defineNuxtRouteMiddleware(async (to) => {
  /* Hack: 關閉對非 /doc 的頁面中 content 模組因為 documentDriven 而送出的 query 請求 */
  // if (to.path.startsWith('/doc'))
  //   to.meta.documentDriven = true
  // else to.meta.documentDriven = false
  const userStore = useUserStore()
  const routeMeta = useRouteMeta()
  const runtimeConfig = useRuntimeConfig()
  const { setIdleCountDownSeconds, idleCountDown } = useGlobal()
  const { sessionTimeout } = runtimeConfig.public

  const authToken = useCookie('auth-token')
  if (authToken.value) {
    const jwtContent = jwtDecode(authToken.value)
    if ((jwtContent.exp || 0) - (new Date().getTime() / 1000) <= (sessionTimeout / 2)) {
      await userStore.handRefreshToken()
      if (authToken.value) {
        const jwtContentAgain = jwtDecode(authToken.value)
        if ((jwtContentAgain.exp || 0) * 1000 <= new Date().getTime()) {
          userStore.logOut()
        }
      }
    }
    const permissionStore = usePermissionStore()

    let promise
    if (permissionStore.menus.length === 0) {
      promise = permissionStore.generateMenus()
    }
    else {
      promise = new Promise<void>(resolve => resolve())
    }
    // 各頁面判斷 isView 權限，無權限則轉導 403
    const isView = await promise.then(() => {
      const { /* menus, taggedMenus, currentMenu, */privileges } = storeToRefs(permissionStore)
      // 未使用標籤
      // const tagged = taggedMenus.value.find(menu => menu.path === to.path)
      // if (tagged)
      //   currentMenu.value = tagged
      // const menuItem = useTreeFind(menus.value, (menu: any) => menu.path === to.matched[0].path)
      // if (!tagged && menuItem) {
      //   const menuTag = JSON.parse(JSON.stringify(menuItem))
      //   menuTag.path = to.path
      //   permissionStore.addMenuTag(menuTag)
      // }
      if (process.client) {
        const meta = routeMeta[to.path]
        // 有定義 routeMeta 才需要驗證權限
        if (meta) {
          const originalPrivilege = Object.assign(
            getDefaultPrivilege(),
            // 無法使用 permissionStore.getPrivilege 因 permission 中還無法拿到 route.path
            useFindPrivilege(to.path, privileges.value),
          )

          // useAdminControlEverything: isAdmin 權限可強制允許其他權限，如果需自行控制 isAdmin 的影響範圍，請移除 useAdminControlEverything
          const privilege: Privilege = useAdminControlEverything(originalPrivilege)
          return privilege.isView
        }
      }
      return true
    })

    if (!isView) {
      return navigateTo('/403')
    }
    else {
      if (process.client) {
        const meta = routeMeta[to.path]
        if (meta && meta.idleTimeout !== undefined) {
          setIdleCountDownSeconds(meta.idleTimeout)
        }
        else {
          setIdleCountDownSeconds(sessionTimeout)
        }
        idleCountDown(() => userStore.logOut())
        const matches = to.path.match(/\/(\w*)(\/(\w*))?(\/([^?#]*))?(\?([^#]*))?(#[\s\S]*)?$/) || []
        const sysLogAccess: SysLogAccess = {
          areaName: matches[1] || '',
          controllerName: matches[3] || '',
          actionName: matches[5] || 'index',
          breadCrumbs: useRouteMetaBreadcrumb(to.path).map(item => item.meta.title),
          queryString: JSON.stringify(to.query),
        }
        $apiPost<number>(`/v1/sysLogAccess`, sysLogAccess)
      }
    }
  }

  /** 路徑不在白名單內，重新導向至登入頁面 */
  else if (!whiteList.some(path => pathToRegExp(path).test(to.path))) {
    return navigateTo('/')
  }
})
