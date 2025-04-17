import type { PagedList, SysUser } from '~/models'
import { fromRawSysUserMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/SysUser', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<SysUser>) => {
      rs.items = rs.items.map(fromRawSysUserMapper)
      return rs
    })
})
