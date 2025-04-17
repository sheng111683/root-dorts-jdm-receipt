import { fromRawJdmReceiptInvoiceMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  return await $serverFetch(`/api/JdmReceiptInvoice/${encryptionId}`, {
    method: 'get',
  })
    .then(fromRawJdmReceiptInvoiceMapper)
})
