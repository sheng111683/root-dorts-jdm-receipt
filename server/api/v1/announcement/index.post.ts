import type { Announcement } from '~/models'
import { announcementMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
    .then((rs: Announcement[]) => {
      const item = rs.map(announcementMapper)
      return item
    })
  return await $serverFetch(`/api/Announcement`, {
    method: 'post',
    body,
  })
})
