import type { PagedList, stampManagementFile } from '~/models'
import { fromRawstampManagementFileMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/stampManagementFile', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<stampManagementFile>) => {
      rs.items = rs.items.map(fromRawstampManagementFileMapper)
      return rs
    })
})
