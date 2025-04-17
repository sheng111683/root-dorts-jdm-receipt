import type { JdmReceiptInvoice, PagedList } from '~/models'
import { fromRawJdmReceiptInvoiceMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/JdmReceiptInvoice', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<JdmReceiptInvoice>) => {
      rs.items = rs.items.map(fromRawJdmReceiptInvoiceMapper)
      return rs
    })
})
