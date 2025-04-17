import type { Announcement, PagedList } from '~/models'
import { fromRawAnnouncementMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/Announcement', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<Announcement>) => {
      rs.items = rs.items.map(fromRawAnnouncementMapper)
      return rs
    })
})
