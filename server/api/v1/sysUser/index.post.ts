import { fromRawSysUserMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
    .then(fromRawSysUserMapper)
  return await $serverFetch(`/api/SysUser`, {
    method: 'post',
    body,
  })
})
