<!-- 根據 content 目錄自動生成路由 -->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const route = useRoute()
const title = ref('')
switch (route.params.slug[0]) {
  case '401':
    title.value = '(401) 您的登入權證已過期'
    break
  case '403':
    title.value = '(403) 您無權訪問此頁面'
    break
  default:
    title.value = '(404) 找不到這個頁面'
}
</script>

<template>
  <AdminContainer>
    <main class="w-1/2 ma py-20 px-10 text-center">
      <el-result
        icon="error"
        :title="title"
        sub-title="您可以在左手邊選單選擇其他功能，或者點選下面按鈕回到首頁"
      >
        <template #extra>
          <el-button type="primary" @click="navigateTo('/')">
            回到首頁
          </el-button>
        </template>
      </el-result>
    </main>
  </AdminContainer>
</template>
