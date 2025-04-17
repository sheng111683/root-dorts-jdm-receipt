import { skipHydrate } from 'pinia'
import ShadeGenerator from 'shade-generator'

// UI 個人化設定參數
export const useConfigStore = defineStore('config', () => {
  const appConfig = useAppConfig()
  const config = ref(useLocalStorage('app-config', appConfig))
  // const config = ref(appConfig)

  // 從 app.config.ts 讀取設定值
  function initConfig() {
    setFontSize(config.value.fontSize ?? appConfig.fontSize)
    // setThemeDark(config.value.themeDark ?? appConfig.themeDark)
    // setSidebarDark(config.value.sidebarDark ?? appConfig.sidebarDark)
    setThemeColor(config.value.themeColor ?? appConfig.themeColor)
    setSidebarWidth(config.value.sidebarWidth ?? appConfig.sidebarWidth)
    setSidebarCollapse(config.value.sidebarCollapse ?? appConfig.sidebarCollapse)
    setNavBreadcrumb(config.value.navBreadcrumb ?? appConfig.navBreadcrumb)
    setTagbar(config.value.tagbar ?? appConfig.tagbar)
    setTransitionType(config.value.transitionType ?? appConfig.transitionType)
  }
  function resetConfig() {
    config.value = { ...appConfig }
    initConfig()
  }

  function setFontSize(fontSize: string) {
    if (fontSize === 'large') {
      useCssVar(`--el-font-size-extra-small`).value = '20px'
      useCssVar(`--el-font-size-small`).value = '22px'
      useCssVar(`--el-font-size-base`).value = '24px'
      useCssVar(`--el-font-size-medium`).value = '26px'
      useCssVar(`--el-font-size-large`).value = '28px'
      useCssVar(`--el-font-size-extra-large`).value = '30px'
    }
    else if (fontSize === 'small') {
      useCssVar(`--el-font-size-extra-small`).value = '12px'
      useCssVar(`--el-font-size-small`).value = '14px'
      useCssVar(`--el-font-size-base`).value = '16px'
      useCssVar(`--el-font-size-medium`).value = '18px'
      useCssVar(`--el-font-size-large`).value = '20px'
      useCssVar(`--el-font-size-extra-large`).value = '22px'
    }
    else {
      useCssVar(`--el-font-size-extra-small`).value = '16px'
      useCssVar(`--el-font-size-small`).value = '18px'
      useCssVar(`--el-font-size-base`).value = '20px'
      useCssVar(`--el-font-size-medium`).value = '22px'
      useCssVar(`--el-font-size-large`).value = '24px'
      useCssVar(`--el-font-size-extra-large`).value = '26px'
    }
    config.value.fontSize = fontSize
  }

  function setThemeColor(themeColor: string) {
    if (process.client) {
      const colorMap = ShadeGenerator.hue(themeColor).shadesMap('hex')
      // // console.log(colorMap)
      useCssVar('--el-color-primary').value = colorMap['100']
      useCssVar('--el-color-primary-light-3').value = colorMap['70']
      useCssVar('--el-color-primary-light-5').value = colorMap['50']
      useCssVar('--el-color-primary-light-7').value = colorMap['30']
      useCssVar('--el-color-primary-light-8').value = colorMap['20']
      useCssVar('--el-color-primary-light-9').value = colorMap['10']
      useCssVar('--el-color-primary-dark-2').value = colorMap['300']
      // switch (themeColor) {
      //   case '#009bc8':
      //   default:
      // useCssVar('--el-color-primary').value = '#009bc8'
      // useCssVar('--el-color-primary-light-3').value = '#4db9d9'
      // useCssVar('--el-color-primary-light-5').value = '#80cde4'
      // useCssVar('--el-color-primary-light-7').value = '#b3e1ef'
      // useCssVar('--el-color-primary-light-8').value = '#ccebf4'
      // useCssVar('--el-color-primary-light-9').value = '#e6f5fa'
      // useCssVar('--el-color-primary-dark-2').value = '#007ca0'
      //     break
      // }
      config.value.themeColor = themeColor
    }
  }
  // function setThemeDark(dark: boolean) {
  //   useDark().value = dark
  //   config.value.themeDark = dark
  // }

  // function setSidebarDark(dark: boolean) {
  //   if (dark) {
  //     useCssVar('--admin-sidebar-bg-color').value = '#22272e'
  //     useCssVar('--admin-sidebar-hover-bg-color').value = '#343435'
  //     useCssVar('--admin-sidebar-text-color').value = '#e5eaf3'
  //   }
  //   else {
  //     useCssVar('--admin-sidebar-bg-color').value = '#ffffff'
  //     useCssVar('--admin-sidebar-hover-bg-color').value = '#ecf5ff'
  //     useCssVar('--admin-sidebar-text-color').value = '#2c3e50'
  //   }
  //   config.value.sidebarDark = dark
  // }

  function setSidebarWidth(width: number) {
    useCssVar('--admin-sidebar-width').value = `${width}px`
    config.value.sidebarWidth = width
  }

  function setSidebarCollapse(collapse: boolean) {
    if (collapse)
      useCssVar('--admin-sidebar-width').value = useCssVar('--admin-sidebar-collapse-width').value
    else
      useCssVar('--admin-sidebar-width').value = `${config.value.sidebarWidth}px`
    config.value.sidebarCollapse = collapse
  }

  function setNavBreadcrumb(navBreadcrumb: boolean) {
    config.value.navBreadcrumb = navBreadcrumb
  }

  function setTagbar(tagbar: boolean) {
    if (tagbar)
      useCssVar('--admin-tagbar-height').value = '2.5rem'
    else
      useCssVar('--admin-tagbar-height').value = '0rem'
    config.value.tagbar = tagbar
  }

  function setTransitionType(transitionType: string) {
    config.value.transitionType = transitionType
  }

  return {
    config: skipHydrate(config),
    initConfig,
    resetConfig,
    setFontSize,
    // setThemeDark,
    // setSidebarDark,
    setThemeColor,
    setSidebarWidth,
    setSidebarCollapse,
    setNavBreadcrumb,
    setTagbar,
    setTransitionType,
  }
})
