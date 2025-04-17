import type { PagedList, SysLogLogin } from '~/models'
import { fromRawSysLogLoginMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/SysLogLogin', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<SysLogLogin>) => {
      rs.items = rs.items.map(fromRawSysLogLoginMapper)
      return rs
    })
})
