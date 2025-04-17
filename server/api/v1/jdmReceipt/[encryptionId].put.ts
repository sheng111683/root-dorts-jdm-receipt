import { jdmReceiptMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  const body = await readBody(event)
    .then(jdmReceiptMapper)
  return await $serverFetch(`/api/JdmReceipt/${encryptionId}`, {
    method: 'put',
    body,
  })
})
