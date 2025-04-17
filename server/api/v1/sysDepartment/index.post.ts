import { fromRawSysDepartmentMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
    .then(fromRawSysDepartmentMapper)
  return await $serverFetch(`/api/SysDepartment`, {
    method: 'post',
    body,
  })
})
