<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { addAPIProvider, disableCache } from '@iconify/vue'

const { isLoading } = useLoading()
const configStore = useConfigStore()
const { config } = storeToRefs(configStore)
const { setScreenWidth, setScreenHeight, isXsOnly } = useGlobal()
const html2canvas = useHtml2canvas()
const { $api } = useNuxtApp()

configStore.initConfig()
useHead({
  title: configStore.config.title,
})

const { iconifyProvider, pwa } = useRuntimeConfig().public
addAPIProvider('', {
  resources: [iconifyProvider],
})
disableCache('all')

onErrorCaptured((err) => {
  const body = document.querySelector('body')

  html2canvas(body).then((canvas) => {
    // 轉換成 blob 在 IOS 裝置上檢視時才會正常
    canvas.toBlob((blob) => {
      const formData = new FormData()
      formData.append('iFormFiles', blob, `frontend_error_${new Date().toISOString().replace(/[-T:.Z]/g, '')}.png`)
      $apiPost<void>(`/v1/sysFile/uploadFile?isMemoryCache=true`, formData)
        .then((rs) => {
          // console.log(rs[0].sysFile.guid)
          // console.log(err.message)
          $api.v1.SysErrorCaptureLog.Post([{ errorType: 'FRONTEND', message: err.message, addFile: { guids: [rs[0].sysFile.guid] } }])
        })
      // const url = URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;

      // // 設定下載的檔案名稱
      // a.download = 'fileNmae';
      // a.click();
      // a.remove();
    }, 'image/png')
  })

  // throw createError({
  //   statusCode: err.statusCode,
  //   statusMessage: err.message,
  //   fatal: true
  // })
})
onMounted(() => {
  if (process.client) {
    setScreenWidth(window.innerWidth)
    setScreenHeight(window.innerHeight)
    if (isXsOnly.value)
      configStore.setSidebarCollapse(true)
    window.addEventListener(
      'resize',
      () => {
        setScreenWidth(window.innerWidth)
        setScreenHeight(window.innerHeight)
        if (isXsOnly.value)
          configStore.setSidebarCollapse(true)
      },
      true,
    )
  }
})
</script>

<template>
  <div v-loading="isLoading" :element-loading-lock="true" element-loading-background="rgba(0 ,0 ,0 , 0.2)">
    <NuxtPwaManifest v-if="pwa" />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage :transition="{ name: config.transitionType, mode: 'out-in', appear: true }" />
    </NuxtLayout>
  </div>
</template>

<style>
.slide-enter-active,
.fade-enter-active,
.blur-enter-active,
.scale-enter-active {
  transition: all var(--t-transform);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.fade-enter-from {
  opacity: 0;
}

.blur-enter-from {
  opacity: 0;
  filter: blur(0.5rem);
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
</style>
