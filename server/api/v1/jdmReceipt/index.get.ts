import type { JdmReceipt, PagedList } from '~/models'
import { fromRawJdmReceiptMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/JdmReceipt', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<JdmReceipt>) => {
      rs.items = rs.items.map(fromRawJdmReceiptMapper)
      return rs
    })
})
