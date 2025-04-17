export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/SysFile/DownloadFile', {
    method: 'post',
    params: query,
  })
})
