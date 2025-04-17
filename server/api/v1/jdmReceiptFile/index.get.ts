import type { JdmReceiptFile, PagedList } from '~/models'
import { fromRawJdmReceiptFileMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/JdmReceiptFile', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<JdmReceiptFile>) => {
      rs.items = rs.items.map(fromRawJdmReceiptFileMapper)
      return rs
    })
})
