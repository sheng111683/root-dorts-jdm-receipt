import { type SysFile, sysFileMapper } from './sysFile'

// 記得將 export 加入到 ./index.ts

export interface stampManagementFile {
  encryptionId: string
  jobTitle: string
  sysFileId: number
  removed?: boolean
  sysFile: SysFile
}

export function stampManagementFileMapper(item: stampManagementFile) {
  const {
    encryptionId,
    jobTitle,
    sysFileId,
    removed,
    sysFile,
  } = item
  return {
    encryptionId,
    jobTitle,
    sysFileId,
    removed,
    sysFile: sysFileMapper(sysFile),
  }
}

export function fromRawstampManagementFileMapper(item: stampManagementFile) {
  const obj = stampManagementFileMapper(item)
  return {
    ...obj,
  }
}
export function getDefaultstampManagementFile(): stampManagementFile {
  return {
    encryptionId: '',
    jobTitle: '',
    sysFileId: 0,
    removed: false,
    sysFile: {
      encryptionId: '',
      displayName: '',
      removed: false,
    },
  }
}
