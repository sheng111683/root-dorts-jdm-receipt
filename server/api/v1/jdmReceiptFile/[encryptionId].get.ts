import { fromRawJdmReceiptFileMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  return await $serverFetch(`/api/JdmReceiptFile/${encryptionId}`, {
    method: 'get',
  })
    .then(fromRawJdmReceiptFileMapper)
})
