import { jdmReceiptInvoiceMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  const body = await readBody(event)
    .then(jdmReceiptInvoiceMapper)
  return await $serverFetch(`/api/JdmReceiptInvoice/${encryptionId}`, {
    method: 'put',
    body,
  })
})
