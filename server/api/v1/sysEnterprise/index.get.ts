import type { PagedList, SysEnterprise } from '~/models'
import { fromRawSysEnterpriseMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/SysEnterprise', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<SysEnterprise>) => {
      rs.items = rs.items.map(fromRawSysEnterpriseMapper)
      return rs
    })
})
