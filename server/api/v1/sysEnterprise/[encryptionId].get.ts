import { fromRawSysEnterpriseMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  return await $serverFetch(`/api/SysEnterprise/${encryptionId}`, {
    method: 'get',
  })
    .then(fromRawSysEnterpriseMapper)
})
