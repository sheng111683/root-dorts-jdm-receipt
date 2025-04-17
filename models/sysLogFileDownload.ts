// 記得將 export 加入到 ./index.ts

export interface SysLogFileDownload {
  // id: number;
  remoteIp: string
  accessUserId: string
  tableName: string
  fileName: string
  displayName: string
  enterpriseId: string
  departmentId: string
  createDate: string | Date
  createUser: string
  modifyDate: string | Date
  modifyUser: string
  removed?: boolean
  encryptionId: string
}

export function sysLogFileDownloadMapper(item: SysLogFileDownload) {
  const {
    // id,
    remoteIp,
    accessUserId,
    tableName,
    fileName,
    displayName,
    enterpriseId,
    departmentId,
    createDate,
    createUser,
    modifyDate,
    modifyUser,
    removed,
    encryptionId,

  } = item
  return {
    // id,
    remoteIp,
    accessUserId,
    tableName,
    fileName,
    displayName,
    enterpriseId,
    departmentId,
    createDate,
    createUser,
    modifyDate,
    modifyUser,
    removed,
    encryptionId,

  }
}

export function fromRawSysLogFileDownloadMapper(item: SysLogFileDownload) {
  const obj = sysLogFileDownloadMapper(item)
  return {
    ...obj,
    createDate: new Date(new Date(obj.createDate).getTime() + 28800000),
  }
}

export function getDefaultSysLogFileDownload(): SysLogFileDownload {
  return {
  // id: 0,
    remoteIp: '',
    accessUserId: '',
    tableName: '',
    fileName: '',
    displayName: '',
    enterpriseId: '',
    departmentId: '',
    createDate: '',
    createUser: '',
    modifyDate: '',
    modifyUser: '',
    removed: false,
    encryptionId: '',
  }
}
