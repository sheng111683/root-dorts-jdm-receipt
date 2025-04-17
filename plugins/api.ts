import * as api from '~/api/'

type Api = typeof api

declare module '#app' {
  interface NuxtApp {
    $api: Api
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api,
    },
  }
})
