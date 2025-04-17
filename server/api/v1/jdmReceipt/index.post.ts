import type { JdmReceipt } from '~/models'
import { jdmReceiptMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
    .then((rs: JdmReceipt[]) => {
      const item = rs.map(jdmReceiptMapper)
      return item
    })
  return await $serverFetch(`/api/JdmReceipt`, {
    method: 'post',
    body,
  })
})
