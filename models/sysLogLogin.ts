// 記得將 export 加入到 ./index.ts

export interface SysLogLogin {
  // id: number;
  accessUserId: string
  loginIp: string
  loginStatus: string
  remark: string
  departmentId: string
  enterpriseId: string
  createDate: string | Date
  createUser: string
  modifyDate: string | Date
  modifyUser: string
  removed?: boolean
  encryptionId: string
  startCreateDate: string | Date
  endCreateDate: string | Date
}

export function sysLogLoginMapper(item: SysLogLogin) {
  const {
    // id,
    accessUserId,
    loginIp,
    loginStatus,
    remark,
    departmentId,
    enterpriseId,
    createDate,
    createUser,
    modifyDate,
    modifyUser,
    removed,
    encryptionId,
    startCreateDate,
    endCreateDate,

  } = item
  return {
    // id,
    accessUserId,
    loginIp,
    loginStatus,
    remark,
    departmentId,
    enterpriseId,
    createDate,
    createUser,
    modifyDate,
    modifyUser,
    removed,
    encryptionId,
    startCreateDate,
    endCreateDate,
  }
}

export function fromRawSysLogLoginMapper(item: SysLogLogin) {
  const obj = sysLogLoginMapper(item)
  return {
    ...obj,
    createDate: (new Date(new Date(obj.createDate).getTime() + 28800000)),
    startCreateDate: (new Date(new Date(obj.createDate).getTime() + 28800000)),
    endCreateDate: (new Date(new Date(obj.createDate).getTime() + 28800000)),
  }
}

export function getDefaultSysLogLogin(): SysLogLogin {
  return {
  // id: 0,
    accessUserId: '',
    loginIp: '',
    loginStatus: '',
    remark: '',
    departmentId: '',
    enterpriseId: '',
    createDate: '',
    createUser: '',
    modifyDate: '',
    modifyUser: '',
    removed: false,
    encryptionId: '',
    startCreateDate: '',
    endCreateDate: '',
  }
}
