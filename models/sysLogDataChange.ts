// 記得將 export 加入到 ./index.ts

export interface SysLogDataChange {
  // id: number
  encryptionId: string
  requestId: string
  sysUser: string
  tableName: string
  keyValues: string
  oldData: string
  newData: string
  departmentId: string
  enterpriseId: string
  createDate: string | Date
  createUser: string
  modifyDate: string | Date
  modifyUser: string
  removed?: boolean
  startCreateDate: string | Date
  endCreateDate: string | Date
}

export function sysLogDataChangeMapper(item: SysLogDataChange) {
  const {
    // id,
    encryptionId,
    requestId,
    sysUser,
    tableName,
    keyValues,
    oldData,
    newData,
    departmentId,
    enterpriseId,
    createDate,
    createUser,
    modifyDate,
    modifyUser,
    removed,
    startCreateDate,
    endCreateDate,

  } = item
  return {
    // id,
    encryptionId,
    requestId,
    sysUser,
    tableName,
    keyValues,
    oldData,
    newData,
    departmentId,
    enterpriseId,
    createDate,
    createUser,
    modifyDate,
    modifyUser,
    removed,
    startCreateDate,
    endCreateDate,
  }
}

export function fromRawSysLogDataChangeMapper(item: SysLogDataChange) {
  const obj = sysLogDataChangeMapper(item)
  return {
    ...obj,
    createDate: new Date(new Date(obj.createDate).getTime() + 28800000),
    startCreateDate: new Date(new Date(obj.startCreateDate).getTime() + 28800000),
    endCreateDate: new Date(new Date(obj.endCreateDate).getTime() + 28800000),
  }
}

export function getDefaultSysLogDataChange(): SysLogDataChange {
  return {
    // id: 0,
    encryptionId: '',
    requestId: '',
    sysUser: '',
    tableName: '',
    keyValues: '',
    oldData: '',
    newData: '',
    departmentId: '',
    enterpriseId: '',
    createDate: '',
    createUser: '',
    modifyDate: '',
    modifyUser: '',
    removed: false,
    startCreateDate: '',
    endCreateDate: '',
  }
}
