import type { JdmReceiptInvoice } from '~/models'
import { jdmReceiptInvoiceMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
    .then((rs: JdmReceiptInvoice[]) => {
      const item = rs.map(jdmReceiptInvoiceMapper)
      return item
    })
  return await $serverFetch(`/api/JdmReceiptInvoice`, {
    method: 'post',
    body,
  })
})
