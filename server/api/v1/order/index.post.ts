import type { Order } from '~/models'
import { orderMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
    .then((rs: Order[]) => {
      const item = rs.map(orderMapper)
      return item
    })
  return await $serverFetch(`/api/Order`, {
    method: 'post',
    body,
  })
})
