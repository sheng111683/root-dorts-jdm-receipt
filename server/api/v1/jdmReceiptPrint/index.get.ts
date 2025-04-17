import type { JdmReceiptPrint, PagedList } from '~/models'
import { fromRawJdmReceiptPrintMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/jdmReceiptPrint', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<JdmReceiptPrint>) => {
      rs.items = rs.items.map(fromRawJdmReceiptPrintMapper)
      return rs
    })
})
