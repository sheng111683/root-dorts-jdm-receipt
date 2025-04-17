import { announcementMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  const body = await readBody(event)
    .then(announcementMapper)
  return await $serverFetch(`/api/Announcement/${encryptionId}`, {
    method: 'put',
    body,
  })
})
