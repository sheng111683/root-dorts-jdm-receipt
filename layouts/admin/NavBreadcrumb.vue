<script setup lang="ts">
// import { storeToRefs } from 'pinia'

const route = useRoute()
// const permissionStore = usePermissionStore()
// const routeMeta = useRouteMeta()
// const { menus } = storeToRefs(permissionStore)
const levelList = computed(() => {
  // 原邏輯沒有處理到子頁面
  // const matched = useTreeFindPath(menus.value, (item: any) => item.path === route.path)
  // const indexRoute = { path: '/admin/dashboard', meta: { title: '儀表板' } }
  // /* 判斷是否為首頁 */
  // if (route.path === indexRoute.path)
  //   return [indexRoute]
  // else
  //   return [indexRoute].concat(matched)
  return useRouteMetaBreadcrumb(route.path)
})

// function findBreadcrumb(path, routeMeta) {
//   if (routeMeta[path]) {
//     const routeItem = {
//       path,
//       meta: routeMeta[path],
//     }
//     const parentPath = path.replace(/\/[^/]+$/, '')
//     if (parentPath.length > 0 && parentPath.length != path.length) {
//       return [
//         ...findBreadcrumb(parentPath, routeMeta),
//         routeItem,
//       ]
//     }
//     else {
//       return [routeItem]
//     }
//   }
//   else {
//     return []
//   }
// }

function routeExists(path: string) {
  return useRouter().options.routes.find(item => item.path === path)
}
</script>

<template>
  <el-breadcrumb separator="/">
    <transition-group appear name="breadcrumb">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path">
        <!-- <el-link v-if="routeExists(item.path)" :underline="false" @click.prevent="navigateTo(item.path)">
          {{ item.meta.title }}
        </el-link> -->
        <span v-if="routeExists(item.path)" class="vertical-mid">
          {{ item.meta.title }}
        </span>
        <span v-else class="vertical-mid">
          {{ item.meta.title }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style>
.breadcrumb {

}
</style>
