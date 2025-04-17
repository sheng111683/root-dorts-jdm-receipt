import type { CommitteeMember, PagedList } from '~/models'
import { fromRawCommitteeMemberMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/CommitteeMember', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<CommitteeMember>) => {
      rs.items = rs.items.map(fromRawCommitteeMemberMapper)
      return rs
    })
})
