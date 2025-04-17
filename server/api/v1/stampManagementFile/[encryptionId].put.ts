import { stampManagementFileMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  const body = await readBody(event)
    .then(stampManagementFileMapper)
  return await $serverFetch(`/api/stampManagementFile/${encryptionId}`, {
    method: 'put',
    body,
  })
})
