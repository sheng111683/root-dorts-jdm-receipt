import { jdmReceiptPrintMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  const body = await readBody(event)
    .then(jdmReceiptPrintMapper)
  return await $serverFetch(`/api/jdmReceiptPrint/${encryptionId}`, {
    method: 'put',
    body,
  })
})
