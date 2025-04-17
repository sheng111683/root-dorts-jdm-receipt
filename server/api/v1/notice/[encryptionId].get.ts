import { fromRawNoticeMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  return await $serverFetch(`/api/notice/${encryptionId}`, {
    method: 'get',
  })
    .then(fromRawNoticeMapper)
})
