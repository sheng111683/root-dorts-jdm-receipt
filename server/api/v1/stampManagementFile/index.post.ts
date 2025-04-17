export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
  return await $serverFetch(`/api/stampManagementFile`, {
    method: 'post',
    body,
  })
})
