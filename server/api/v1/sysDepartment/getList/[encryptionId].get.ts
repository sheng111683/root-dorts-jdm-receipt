import type { SysDepartment } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  return await $serverFetch(`/api/SysDepartment/GetList/GetParentSelectList/${encryptionId}`, {
    method: 'get',
  })
    .then((rs: SysDepartment[]) => {
      return rs
    })
})
