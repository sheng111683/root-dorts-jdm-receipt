// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  app: {
    keepalive: true,
    baseURL: process.env.NUXT_APP_BASE_URL,
    head: {
      meta: [
        { name: 'charset', content: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' },
        { name: 'HandheldFriendly', content: 'true' },
        ...(process.env.NUXT_PUBLIC_PWA === 'true'
          ? [
              { name: 'apple-mobile-web-app-capable', content: 'yes' },
              { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' },
              { name: 'mobile-web-app-capable', content: 'yes' },
              { name: 'apple-mobile-web-app-title', content: 'JDM 收據管理系統' },
            ]
          : []),
      ],
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_APP_BASE_URL,
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      thirdParty: {
        demo: {
          dogs: {
            baseURL: 'https://dog.ceo/api',
          },
        },
      },
      sessionTimeout: process.env.NUXT_PUBLIC_SESSION_TIMEOUT
        ? Number.parseInt(process.env.NUXT_PUBLIC_SESSION_TIMEOUT)
        : 7200,
      pwa: process.env.NUXT_PUBLIC_PWA === 'true',
      encryptionService: {
        key: process.env.NUXT_PUBLIC_ENCRYPTION_SERVICE_KEY,
      },
    },
  },

  nitro: {
    routeRules: {
      // has bug
      // ...(process.env.API_BASE) ? {
      //   '/webapi/**': {
      //     proxy: `${process.env.API_BASE}/**`
      //   }
      // } : {}
    },
    devStorage: {
      db: {
        driver: 'fs',
        base: 'server/db',
      },
    },
  },

  css: [
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/dark/css-vars.css',
    '@/assets/css/main.css',
  ],

  /**
   * full-Static mode payload extraction option:
   *  see: https://github.com/nuxt/framework/discussions/7691?sort=new
   */
  experimental: {
    payloadExtraction: false,
  },

  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
    ['@vee-validate/nuxt', {
      // disable or enable auto imports
      autoImports: true,
      // Use different names for components
      componentNames: {
        Form: 'VeeForm',
        Field: 'VeeField',
        FieldArray: 'VeeFieldArray',
        ErrorMessage: 'VeeErrorMessage',
      },
    }],
    'nuxt-security',
    '@vite-pwa/nuxt',
  ],

  /* Fix unocss sourcemap warning */
  sourcemap: {
    server: true,
    client: true,
  },

  ...(process.env.NUXT_PUBLIC_PWA === 'true'
    ? {
        pwa: {
          devOptions: {
            enabled: process.env.NUXT_PUBLIC_PWA_DEBUG === 'true',
          },
          includeAssets: ['MRT.ico'],
          manifest: {
            name: 'JDM 收據管理系統', // 需要更改名稱
            short_name: 'RootNuxtTemplate', // 需要更改名稱
            theme_color: '#ffffff',
            icons: [ // 實際使用須改為對應大小的圖片
              {
                purpose: 'any maskable',
                sizes: '64x64',
                src: 'image/logo.png',
                type: 'image/png',
              },
              {
                purpose: 'any maskable',
                sizes: '120x120',
                src: 'image/logo.png',
                type: 'image/png',
              },
              {
                purpose: 'any maskable',
                sizes: '144x144',
                src: 'image/logo.png',
                type: 'image/png',
              },
              {
                purpose: 'any maskable',
                sizes: '152x152',
                src: 'image/logo.png',
                type: 'image/png',
              },
              {
                purpose: 'any maskable',
                sizes: '192x192',
                src: 'image/logo.png',
                type: 'image/png',
              },
              {
                purpose: 'any maskable',
                sizes: '384x384',
                src: 'image/logo.png',
                type: 'image/png',
              },
              {
                purpose: 'any maskable',
                sizes: '512x512',
                src: 'image/logo.png',
                type: 'image/png',
              },
            ],
            display_override: ['window-controls-overlay', 'minimal-ui'],
            display: 'standalone',
          },
          workbox: {
            ...(process.env.NUXT_PUBLIC_PWA_DEBUG !== 'true'
              ? {
                  runtimeCaching: [
                    {
                      // 存任何的.js與css
                      urlPattern: /\.(?:js|css)$/,
                      handler: 'StaleWhileRevalidate',
                      options: {
                        cacheName: 'static-resources',
                        expiration: {
                          maxEntries: 60,
                          maxAgeSeconds: 24 * 60 * 60, // 設置緩存有效期為1天
                        },
                      },
                    },
                    {
                      // 存任何的images
                      urlPattern: /.+(?:png|jpg|jpeg|svg|gif)/,
                      handler: 'CacheFirst',
                      options: {
                        cacheName: 'image-cache',
                        expiration: {
                          maxEntries: 60,
                          maxAgeSeconds: 24 * 60 * 60, // 設置緩存有效期為1天
                        },
                      },
                    },
                  ],
                }
              : {}),
          },
        },
      }
    : {}),

})
