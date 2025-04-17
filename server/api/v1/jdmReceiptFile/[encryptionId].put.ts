import { jdmReceiptFileMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  const body = await readBody(event)
    .then(jdmReceiptFileMapper)
  return await $serverFetch(`/api/JdmReceiptFile/${encryptionId}`, {
    method: 'put',
    body,
  })
})
