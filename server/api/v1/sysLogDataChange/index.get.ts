import type { PagedList, SysLogDataChange } from '~/models'
import { fromRawSysLogDataChangeMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/SysLogDataChange', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<SysLogDataChange>) => {
      rs.items = rs.items.map(fromRawSysLogDataChangeMapper)
      return rs
    })
})
