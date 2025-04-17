import { fromRawAnnouncementMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  return await $serverFetch(`/api/Announcement/${encryptionId}`, {
    method: 'get',
  })
    .then(fromRawAnnouncementMapper)
})
