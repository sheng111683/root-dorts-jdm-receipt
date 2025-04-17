import { fromRawSysEnterpriseMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
    .then(fromRawSysEnterpriseMapper)
  return await $serverFetch(`/api/SysEnterprise`, {
    method: 'post',
    body,
  })
})
