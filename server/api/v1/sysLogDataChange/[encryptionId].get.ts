import { fromRawSysLogDataChangeMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  return await $serverFetch(`/api/SysLogDataChange/${encryptionId}`, {
    method: 'get',
  })
    .then(fromRawSysLogDataChangeMapper)
})
