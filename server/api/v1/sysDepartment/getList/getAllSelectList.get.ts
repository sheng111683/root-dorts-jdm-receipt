import type { SysDepartment } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  return await $serverFetch('/api/SysDepartment/GetList/GetAllSelectList', {
    method: 'get',
  })
    .then((rs: SysDepartment[]) => {
      return rs
    })
})
