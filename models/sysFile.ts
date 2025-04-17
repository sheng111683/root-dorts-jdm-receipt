// 記得將 export 加入到 ./index.ts

export interface SysFile {
  encryptionId: string
  displayName: string
  removed?: boolean
}

export function sysFileMapper(item: SysFile) {
  const {
    // id,
    encryptionId,
    displayName,
    removed,
  } = item
  return {
    // id,
    encryptionId,
    displayName,
    removed,
  }
}

export function fromRawSysFileMapperMapper(item: SysFile) {
  const obj = sysFileMapper(item)
  return {
    ...obj,
  }
}
