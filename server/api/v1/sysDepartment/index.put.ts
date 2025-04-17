import { fromRawSysDepartmentMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  const body = await readBody(event)
    .then(fromRawSysDepartmentMapper)
  return await $serverFetch(`/api/SysDepartment/${encryptionId}`, {
    method: 'put',
    body,
  })
})
