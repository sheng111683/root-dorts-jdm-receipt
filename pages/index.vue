<script setup lang="ts">
import { storeToRefs } from 'pinia'

const notification = useNotification()
definePageMeta({ layout: 'login' })

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const usernameInput = ref('')
const userpassInput = ref('')

const isLoggedIn = computed(() => {
  return userStore.authToken && userInfo.value && userInfo.value.username
})

async function login() {
  if (usernameInput.value && userpassInput.value) {
    await userStore.login({ username: usernameInput.value, password: userpassInput.value })
    await navigateTo('/admin')
  }
  else {
    notification.error('請輸入帳號與密碼！')
  }
}

const { enter } = useMagicKeys()
watch(enter, (v) => {
  if (v)
    login()
})
if (isLoggedIn.value) {
  nextTick(() => {
    navigateTo('/admin')
  })
}
</script>

<template>
  <main v-show="!isLoggedIn" class="w-1/2 ma py-20 px-10 text-center">
    <ClientOnly>
      <div class="text-[2.5rem] py-4">
        <span class="pr-2">JDM 收據管理系統</span>
      </div>
      <el-form class="mt-4">
        <el-row class="flex justify-center">
          <el-input v-model="usernameInput" autofocus class="m-4 w[350px] h-12" placeholder="輸入使用者名稱">
            <template #prepend>
              帳號
            </template>
          </el-input>
        </el-row>
        <el-row class="flex justify-center">
          <el-input v-model="userpassInput" type="password" class="m-4 w[350px] h-12" placeholder="輸入密碼" show-password>
            <template #prepend>
              密碼
            </template>
          </el-input>
        </el-row>
        <el-row class="flex justify-center">
          <el-button @click="login()">
            登入
          </el-button>
        </el-row>
      </el-form>
    </ClientOnly>
  </main>
</template>

<style>
main {
  color: var(--el-color-primary);
}
</style>
