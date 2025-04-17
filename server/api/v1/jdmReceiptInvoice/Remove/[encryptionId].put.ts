export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  return await $serverFetch(`/api/JdmReceiptInvoice/Removed/${encryptionId}`, {
    method: 'put',
  })
})
