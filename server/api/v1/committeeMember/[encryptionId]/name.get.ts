// 取得單筆委員的全名範例
export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  return await $serverFetch(`/api/CommitteeMember/${encryptionId}/Name`, {
    method: 'get',
  })
    .then((rs) => {
      const {
        name,
      } = rs
      return {
        name,
      }
    })
})
