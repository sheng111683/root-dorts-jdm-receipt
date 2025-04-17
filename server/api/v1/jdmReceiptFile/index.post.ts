import type { JdmReceiptFile } from '~/models'
import { jdmReceiptFileMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
    .then((rs: JdmReceiptFile[]) => {
      const item = rs.map(jdmReceiptFileMapper)
      return item
    })
  return await $serverFetch(`/api/JdmReceiptFile`, {
    method: 'post',
    body,
  })
})
