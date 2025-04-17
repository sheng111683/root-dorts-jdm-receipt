import type { CommitteeMember } from '~/models'
import { committeeMemberMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
    .then((rs: CommitteeMember[]) => {
      return rs.map(committeeMemberMapper)
    })
  return await $serverFetch(`/api/CommitteeMember`, {
    method: 'post',
    body,
  })
})
