import { fromRawJdmReceiptPrintMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  return await $serverFetch(`/api/JdmReceiptPrint/${encryptionId}`, {
    method: 'get',
  })
    .then(fromRawJdmReceiptPrintMapper)
})
