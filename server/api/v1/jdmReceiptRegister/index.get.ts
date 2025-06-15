import type { MemoList, PagedList } from '~/models'
import { fromMemoListMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/JdmReceiptRegister', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<MemoList>) => {
      rs.items = rs.items.map(fromMemoListMapper)
      return rs
    })
})
