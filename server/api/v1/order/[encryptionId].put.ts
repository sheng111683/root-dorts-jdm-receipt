import { orderMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  const body = await readBody(event)
    .then(orderMapper)
  return await $serverFetch(`/api/Order/${encryptionId}`, {
    method: 'put',
    body,
  })
})
