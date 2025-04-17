export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = await readBody(event)
  return await $serverFetch(`/api/SysDepartment/Removed`, {
    method: 'put',
    body: encryptionId,
  })
})
