import type { Order, PagedList } from '~/models'
import { fromRawOrderMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/Order', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<Order>) => {
      const pagingElement = {
        ...rs,
        items: rs.items.map(fromRawOrderMapper),
      }
      return pagingElement
    })
})
