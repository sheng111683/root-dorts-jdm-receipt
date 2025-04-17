import type { stampManagementFile } from '~/models'
import { fromRawstampManagementFileMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)
  return await $serverFetch(`/api/stampManagementFile/List`, {
    method: 'get',
    params: query,
  })
    .then((items: stampManagementFile[]) =>
      items.map(fromRawstampManagementFileMapper))
})
