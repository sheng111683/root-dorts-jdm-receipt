// https://et20020223.medium.com/%E4%BD%BF%E7%94%A8-html2canvas-%E5%B0%87%E7%95%AB%E9%9D%A2%E5%84%B2%E5%AD%98-aa58cb7b0f6e
import html2canvas from 'html2canvas'

export function useHtml2canvas() {
  return (element, options = {}) => {
    // 預設選項 避免在 IOS 裝置上異常
    const defaultOptions = {
      useCORS: true,
      allowTaint: true,
      ignoreElements: (e) => {
        if ((e.tagName === 'A' && e.host !== window.location.host) || e.getAttribute('loading') === 'lazy') {
          return true
        }
        else {
          return false
        }
      },
    }

    // 合併選項 確保可以帶入其它 options
    const mergedOptions = { ...defaultOptions, ...options }

    // 使用 html2canvas
    return html2canvas(element, mergedOptions)
  }
}
