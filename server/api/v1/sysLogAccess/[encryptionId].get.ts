import { fromRawSysLogAccessMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  return await $serverFetch(`/api/SysLogAccess/${encryptionId}`, {
    method: 'get',
  })
    .then(fromRawSysLogAccessMapper)
})
