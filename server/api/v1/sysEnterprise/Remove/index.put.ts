export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = await readBody(event)
  return await $serverFetch(`/api/SysEnterprise/Removed`, {
    method: 'put',
    body: encryptionId,
  })
})
