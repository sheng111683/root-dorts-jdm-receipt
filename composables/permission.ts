/* 可以在這裡定義默認的首頁 */
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { getDefaultPrivilege } from '~/models'
import type { Privilege } from '~/models'

// 靜態選單項目，不須到資料庫註冊即可使用的選單項目
export const constantRoutes: any[] = [
  // {
  //   path: '/folder_templates',
  //   meta: {
  //     icon: 'i-ep-menu',
  //     title: '範例',
  //   },
  //   children: [
  //     {
  //       path: '/templates/sample1',
  //       meta: {
  //         title: '範例1',
  //       },
  //     },
  //   ],
  // },
]
/** 權限與選單處理 */
export const usePermissionStore = defineStore('permission', () => {
  const route = useRoute()
  const routeMeta = useRouteMeta()
  const { $api } = useNuxtApp()
  const menus = ref<any[]>([])
  const privileges = ref<any>({})
  /* 如果想幫使用者保存 taggedMenus ，可以將其寫入 localStorage */
  const taggedMenus = ref(useLocalStorage('tagged-menus', constantRoutes))
  const currentMenu = ref(null)

  async function generateMenus() {
    // 向後端請求路由資料
    const { routeTree, privilegeMap }: any = await $api.v1.Routers.Get()
    mergeMeta(routeTree)
    menus.value = routeTree.concat(constantRoutes)
    privileges.value = privilegeMap
  }

  // 把自訂 meta 複寫到 route.meta 中
  function mergeMeta(routeTree) {
    (routeTree || []).forEach((route) => {
      route.meta = {
        ...route.meta,
        ...routeMeta[route.path],
      }
      mergeMeta(route.children)
    })
  }

  const getPrivilege = computed<Privilege>(() => {
    const originalPrivilege = Object.assign(
      getDefaultPrivilege(),
      useFindPrivilege(route.path, privileges.value),
    )
    // useAdminControlEverything: isAdmin 權限可強制允許其他權限，如果需自行控制 isAdmin 的影響範圍，請移除 useAdminControlEverything
    const privilege = useAdminControlEverything(originalPrivilege)
    return privilege
  })

  const isAdd = computed(() => {
    return getPrivilege.value.isAdd
  })

  const isEdit = computed(() => {
    return getPrivilege.value.isEdit
  })

  const isView = computed(() => {
    return getPrivilege.value.isView
  })

  const isRemoved = computed(() => {
    return getPrivilege.value.isRemoved
  })

  const isReport = computed(() => {
    return getPrivilege.value.isReport
  })

  const isAudit = computed(() => {
    return getPrivilege.value.isAudit
  })

  const isAdmin = computed(() => {
    return getPrivilege.value.isAdmin
  })

  function addMenuTag(menuTag: any) {
    taggedMenus.value.push(menuTag)
    currentMenu.value = menuTag
  }

  function removeMenuTag(menuTag: any) {
    const menuIndex = taggedMenus.value.findIndex(menu => menu.path === menuTag.path)
    /* 至少保留一個 MenuTag */
    if (taggedMenus.value.length > 1)
      taggedMenus.value.splice(menuIndex, 1)

    /* 如果不是第一個 tag, 則返回前一個 MenuTag；否則返回第一個 MenuTag */
    if (menuIndex > 0) {
      currentMenu.value = taggedMenus.value[menuIndex - 1]
      return currentMenu.value
    }
    else {
      currentMenu.value = taggedMenus.value[0]
      return currentMenu.value
    }
  }

  function removeAllTaggedMenus() {
    if (taggedMenus.value.length > 1)
      taggedMenus.value.splice(1, taggedMenus.value.length - 1)
    currentMenu.value = taggedMenus.value[0]
    return currentMenu.value
  }

  return {
    menus,
    taggedMenus,
    currentMenu,
    generateMenus,
    addMenuTag,
    removeMenuTag,
    removeAllTaggedMenus,
    getPrivilege,
    privileges,
    isAdd,
    isEdit,
    isView,
    isRemoved,
    isReport,
    isAudit,
    isAdmin,
  }
})
