import { fromRawSysEnterpriseMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  const body = await readBody(event)
    .then(fromRawSysEnterpriseMapper)
  return await $serverFetch(`/api/SysEnterprise/${encryptionId}`, {
    method: 'put',
    body,
  })
})
