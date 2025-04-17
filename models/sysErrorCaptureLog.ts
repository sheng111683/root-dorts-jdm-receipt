import type { AddFile } from './addFile'

// 記得將 export 加入到 ./index.ts

export interface SysErrorCaptureLog {
  errorType: string
  message: string
  addFile?: AddFile
}

export function sysErrorCaptureLogMapper(item: SysErrorCaptureLog) {
  const {
    errorType,
    message,
    addFile,
  } = item
  return {
    errorType,
    message,
    addFile,
  }
}

export function fromRawSysErrorCaptureLogMapper(item: SysErrorCaptureLog) {
  const obj = sysErrorCaptureLogMapper(item)
  return {
    ...obj,
  }
}
