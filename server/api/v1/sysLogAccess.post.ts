import { sysLogAccessMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
    .then(sysLogAccessMapper)
  return await $serverFetch(`/api/SysLogAccess`, {
    method: 'post',
    body,
  })
})
