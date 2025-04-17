import type { PagedList, SysLogAccess } from '~/models'
import { fromRawSysLogAccessMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/sysLogAccess', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<SysLogAccess>) => {
      rs.items = rs.items.map(fromRawSysLogAccessMapper)
      return rs
    })
})
