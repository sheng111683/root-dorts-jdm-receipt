import type { PagedList, SysDepartment } from '~/models'
import { fromRawSysDepartmentMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/SysDepartment', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<SysDepartment>) => {
      rs.items = rs.items.map(fromRawSysDepartmentMapper)
      return rs
    })
})
