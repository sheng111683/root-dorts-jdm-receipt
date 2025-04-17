import type { SysErrorCaptureLog } from '~/models'
import { sysErrorCaptureLogMapper } from '~/models'

export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
    .then((rs: SysErrorCaptureLog[]) => {
      return rs.map(sysErrorCaptureLogMapper)
    })
  return await $serverFetch(`/api/SysErrorCaptureLog`, {
    method: 'post',
    body,
  })
})
