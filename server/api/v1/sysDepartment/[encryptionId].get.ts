import { fromRawSysDepartmentMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  return await $serverFetch(`/api/SysDepartment/${encryptionId}`, {
    method: 'get',
  })
    .then(fromRawSysDepartmentMapper)
})
