<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import NavBreadcrumb from './NavBreadcrumb.vue'

const userStore = useUserStore()
const configStore = useConfigStore()
const { userInfo } = storeToRefs(userStore)
const { config } = storeToRefs(configStore)
const { idleCountDownSeconds } = useGlobal()

function toggleSidebarCollapse() {
  const collapse = config.value.sidebarCollapse
  configStore.setSidebarCollapse(!collapse)
}

const isLarge = computed(() => config.value.fontSize === 'large')
const isSmall = computed(() => config.value.fontSize === 'small')
const isMedium = computed(() => config.value.fontSize === 'medium' || (!isLarge.value && !isSmall.value))

const idleCountDownDisplay = computed(() => {
  if (idleCountDownSeconds.value > 86400) { // 天
    const days = Math.floor(idleCountDownSeconds.value / 86400)
    const hours = Math.floor((idleCountDownSeconds.value % 86400) / 3600)
    return `${days > 0 ? `${days} 天` : ``}${days > 0 && hours > 0 ? `又 ` : ``}${hours > 0 ? `${hours} 小時` : ``}`
  }
  else if (idleCountDownSeconds.value > 3600) { // 小時
    const hours = Math.floor(idleCountDownSeconds.value / 3600)
    const minutes = Math.floor((idleCountDownSeconds.value % 3600) / 60)
    return `${hours > 0 ? `${hours} 小時` : ``}${hours > 0 && minutes > 0 ? ` ` : ``}${minutes > 0 ? `${minutes} 分鐘` : ``}`
  }
  else if (idleCountDownSeconds.value > 60) { // 分
    const minutes = Math.floor(idleCountDownSeconds.value / 60)
    const seconds = idleCountDownSeconds.value % 60
    return `${minutes > 0 ? `${minutes} 分鐘` : ``}${minutes > 0 && seconds > 0 ? ` ` : ``}${seconds > 0 ? `${seconds} 秒` : ``}`
  }
  else {
    const seconds = idleCountDownSeconds.value
    return `${seconds} 秒`
  }
})
</script>

<template>
  <el-menu class="navbar pr-4" mode="horizontal" :ellipsis="false">
    <h1 class="text-[2.5rem] ml-2">
      JDM 收據管理系統
    </h1>
    <div class="flex-grow" />
    <ClientOnly>
      <span class="text-[1rem] mx-2">
        你好！{{ userInfo.username }} <br>{{ `${idleCountDownSeconds > 0 ? `系統將於閒置 ${idleCountDownDisplay}後登出` : ``}` }}
      </span>
      <el-dropdown class="mx-2" trigger="click">
        <span class="el-dropdown-link">
          A
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :disabled="isLarge" class="text-[1.375rem]" @click="configStore.setFontSize('large')">
              大
            </el-dropdown-item>
            <el-dropdown-item :disabled="isMedium" class="text-[1.25rem]" @click="configStore.setFontSize('medium')">
              中
            </el-dropdown-item>
            <el-dropdown-item :disabled="isSmall" class="text-[1.125rem]" @click="configStore.setFontSize('small')">
              小
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </ClientOnly>
    <!-- <el-link class="mx-2 text-[1.375rem]" :underline="false" @click="configStore.setFontSize('large')">
      大
    </el-link>
    <el-link class="mx-2 text-[1.25rem]" :underline="false" @click="configStore.setFontSize('medium')">
      中
    </el-link>
    <el-link class="mx-2 text-[1.125rem]" :underline="false" @click="configStore.setFontSize('small')">
      小
    </el-link> -->
    <el-link class="mx-2" :underline="false" @click="userStore.logOut()">
      <AdminIcon name="i-carbon-logout" />
    </el-link>
  </el-menu>
  <el-menu class="sub-navbar pr-4" mode="horizontal" :ellipsis="false">
    <el-link class="mx-2 text-[1.25rem]" :underline="false" @click="toggleSidebarCollapse()">
      <AdminIcon v-if="config.sidebarCollapse" name="i-ep-expand" />
      <AdminIcon v-else name="i-ep-fold" />
    </el-link>
    <NavBreadcrumb v-if="config.navBreadcrumb" class="mx-2" />
  </el-menu>
</template>

<style scoped>
.large {
  font-size: 16px;
}

.small {
  font-size: 12px;
}

.medium {
  font-size: 14px;
}
.navbar, .sub-navbar {
  position: fixed;
  z-index: 2001;
  top: 0;
  left: var(--admin-sidebar-width);
  right: 0;
  height: var(--admin-navbar-height);
  box-sizing: border-box;
  border-bottom: 0;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  display: flex;
  align-items: center;
  transition: all var(--t-transform);
}
.navbar {
  background-color: var(--admin-top-bg-color);
  color: var(--admin-top-text-color);
}
.sub-navbar {
  background-color: var(--admin-nav-bg-color);
  top: var(--admin-navbar-height);
  height: var(--admin-sub-navbar-height);
}
.navbar a {
  color: var(--admin-top-text-color);
}
.navbar .el-dropdown-link {
  color: var(--admin-top-text-color);
}
</style>
