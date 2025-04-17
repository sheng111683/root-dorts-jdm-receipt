import type { SysDepartment } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  return await $serverFetch('/api/SysDepartment/GetList', {
    method: 'get',
  })
    .then((rs: SysDepartment[]) => {
      return rs
    })
})
