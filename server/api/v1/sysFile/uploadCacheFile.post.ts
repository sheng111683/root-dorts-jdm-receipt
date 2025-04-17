export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
    .then((rs: string[]) => rs)
  return await $serverFetch(`/api/SysFile/UploadCacheFile`, {
    method: 'post',
    body,
  })
})
