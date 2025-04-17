const isLoading = ref(false)
/** 顯示 loading  */
function loading() {
  isLoading.value = true
}
/** 隱藏 loading */
function unloading() {
  isLoading.value = false
}
/** 使用 loading  */
export function useLoading() {
  return {
    isLoading,
    loading,
    unloading,
  }
}
