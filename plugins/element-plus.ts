import ElementPlus, { ID_INJECTION_KEY } from 'element-plus'
import zhTw from 'element-plus/es/locale/lang/zh-tw'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus, {
    locale: zhTw,
  })
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
  })
})
