import type { Notice, PagedList } from '~/models'
import { fromRawNoticeMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/notice', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<Notice>) => {
      rs.items = rs.items.map(fromRawNoticeMapper)
      return rs
    })
})
