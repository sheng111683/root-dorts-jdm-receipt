import { fromRawSysUserMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const encryptionId = getRouterParam(event, 'encryptionId')
  const body = await readBody(event)
    .then(fromRawSysUserMapper)
  return await $serverFetch(`/api/SysUser/${encryptionId}`, {
    method: 'put',
    body,
  })
})
