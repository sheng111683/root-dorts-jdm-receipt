// 姓或名查詢委員範例
import type { CommitteeMember } from '~/models'
import { fromRawCommitteeMemberMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch(`/api/CommitteeMember/List`, {
    method: 'get',
    params: query,
  })
    .then((items: CommitteeMember[]) =>
      items.map(fromRawCommitteeMemberMapper))
})
