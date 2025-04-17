import { fromRawJdmReceiptMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  return await $serverFetch(`/api/JdmReceipt/${encryptionId}`, {
    method: 'get',
  })
    .then(fromRawJdmReceiptMapper)
})
