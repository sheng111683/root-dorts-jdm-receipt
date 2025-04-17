import type { JdmReceiptPrint } from '~/models'
import { jdmReceiptPrintMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
    .then((rs: JdmReceiptPrint[]) => {
      const item = rs.map(jdmReceiptPrintMapper)
      return item
    })
  return await $serverFetch(`/api/jdmReceiptPrint`, {
    method: 'post',
    body,
  })
})
