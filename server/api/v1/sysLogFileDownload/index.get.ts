import type { PagedList, SysLogFileDownload } from '~/models'
import { fromRawSysLogFileDownloadMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch('/api/SysLogFileDownload', {
    method: 'get',
    params: query,
  })
    .then((rs: PagedList<SysLogFileDownload>) => {
      rs.items = rs.items.map(fromRawSysLogFileDownloadMapper)
      return rs
    })
})
