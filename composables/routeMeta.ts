import { useRoute } from 'vue-router'
/**
 * 各頁面標題及選單圖示定義
 * 自行新增的 icon 在 unocss.config.ts 定義後才可在其他頁面使用 https://icon-sets.iconify.design/
 */
const routeMeta = {
  '/admin/dashboard': {
    title: '儀表板',
    icon: 'i-ep-menu',
    idleTimeout: 0, // 秒
  },
  '/admin/file': {
    title: '檔案功能',
    icon: 'i-carbon:file-storage',
    idleTimeout: 0, // 秒
  },
  '/admin/date': {
    title: '時間功能',
    icon: 'i-carbon:time',
    idleTimeout: 0, // 秒
  },
  '/admin/committeeMember': {
    title: '委員管理',
    icon: 'i-carbon:user',
    // idleTimeout: 30 * 60 // 秒 default
  },
  '/admin/committeeMember/edit': {
    title: '委員編輯',
    // idleTimeout: 30 * 60 // 秒 default
  },
  '/admin/order': {
    title: '訂單管理',
    icon: 'i-carbon:shopping-cart',
    idleTimeout: 15 * 60, // 秒
  },
  '/admin/order/edit': {
    title: '訂單編輯',
    idleTimeout: 15 * 60, // 秒
  },
  '/admin/systemNotification': {
    title: '系統公告維護',
    icon: 'i-carbon:cloud-service-management',
  },
  '/admin/sysLogFileDownload': {
    title: '檔案下載紀錄',
  },
  '/admin/sysLogAccess': {
    title: '訪問紀錄',
  },
  '/admin/sysLogAccess/ViewPage': {
    title: '訪問紀錄瀏覽資訊',
    idleTimeout: 15 * 60, // 秒
  },
  '/admin/sysLogLogin': {
    title: '登入紀錄',
  },
  '/admin/sysLogDataChange': {
    title: '資料異動紀錄',
  },
  '/admin/sysLogDataChange/ViewPage': {
    title: '資料異動紀錄瀏覽資訊',
    idleTimeout: 15 * 60, // 秒
  },
  '/admin/notice': {
    title: '發信通知紀錄',
  },
  '/admin/notice/ViewPage': {
    title: '發信通知紀錄瀏覽資訊',
    idleTimeout: 15 * 60, // 秒
  },
  '/admin/announcement': {
    title: '系統公告維護',
    icon: 'i-carbon:account',
  },
  '/admin/announcement/edit': {
    title: '系統公告單編輯',
    idleTimeout: 15 * 60, // 秒
  },
  '/login/changePassWord': {
    title: '忘記密碼',
    icon: 'i-carbon:face-dizzy',
  },
  '/folder_o_zgnAB0M5zK7Es6HNlxJA': {
    title: '系統管理',
    icon: 'i-carbon:cloud-service-management',
  },
  '/folder_lGSbDXOKsD8ZxtVOwf36Ag': {
    title: '系統日誌管理',
    icon: 'i-carbon:license-maintenance',
  },
  '/folder_vwCKpGtr-ErKt2jtKzcrkg': {
    title: '工程施工查核填報系統',
    icon: 'i-carbon:construction',
  },
  '/folder_fiIjP5HjKl-6KXWHXWz6Gg': {
    title: '捷運局權限管理平台雛形',
    icon: 'i-carbon:train',
  },
  '/folder_gknvQEbN9HuGW4Fz6GBgzg': {
    title: '捷運局實驗室雛形',
    icon: 'i-carbon:chemistry',
  },
  '/folder_22iSZFBlYnBqRlocc-JGRw': {
    title: '範例使用者',
    icon: 'i-carbon:user-multiple',
  },

  '/folder_f4C3NN-OuKz8vEeEYi-xrg': {
    title: '收據管理',
    icon: 'i-carbon:currency',
  },
}
/** 取得各頁面資訊對應表 */
export function useRouteMeta() {
  return routeMeta
}
/** 取得標題 */
export function useRouteMetaTitle() {
  const route = useRoute()
  if (routeMeta[route.path] && routeMeta[route.path].title) {
    return routeMeta[route.path].title
  }
  else {
    throw new Error('標題未定義')
  }
}

export function useRouteMetaBreadcrumb(path) {
  if (routeMeta[path]) {
    const routeItem = {
      path,
      meta: routeMeta[path],
    }
    const parentPath = path.replace(/\/[^/]+$/, '')
    if (parentPath.length > 0 && parentPath.length !== path.length) {
      return [
        ...useRouteMetaBreadcrumb(parentPath),
        routeItem,
      ]
    }
    else {
      return [routeItem]
    }
  }
  else {
    return []
  }
}
