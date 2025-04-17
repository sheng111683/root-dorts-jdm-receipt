import { fromRawSysUserMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  return await $serverFetch(`/api/SysUser/${encryptionId}`, {
    method: 'get',
  })
    .then(fromRawSysUserMapper)
})
