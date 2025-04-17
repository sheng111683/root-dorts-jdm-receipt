import { fromRawCommitteeMemberMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  return await $serverFetch(`/api/CommitteeMember/${encryptionId}`, {
    method: 'get',
  })
    .then(fromRawCommitteeMemberMapper)
})
