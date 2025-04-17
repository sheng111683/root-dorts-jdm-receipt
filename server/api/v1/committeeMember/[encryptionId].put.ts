import { committeeMemberMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  const body = await readBody(event)
    .then(committeeMemberMapper)
  return await $serverFetch(`/api/CommitteeMember/${encryptionId}`, {
    method: 'put',
    body,
  })
})
