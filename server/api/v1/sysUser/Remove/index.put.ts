export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = await readBody(event)
  return await $serverFetch(`/api/SysUser/Removed`, {
    method: 'put',
    body: encryptionId,
  })
})
