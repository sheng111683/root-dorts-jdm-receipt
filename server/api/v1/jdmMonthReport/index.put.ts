import type { MemoList } from '~/models'
import { memoListMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
    .then((rs: MemoList[]) => {
      const item = rs.map(memoListMapper)
      return item
    })
  return await $serverFetch(`/api/JdmMonthReport`, {
    method: 'put',
    body,
  })
})