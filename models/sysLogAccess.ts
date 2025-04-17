// 記得將 export 加入到 ./index.ts

export interface SysLogAccess {
  encryptionId: string
  sysUser: string
  areaName: string
  controllerName: string
  controllerDisplayName: string
  remoteIp: string
  actionName: string
  actionDisplayName: string
  breadCrumbs: string[]
  queryString: string
  requestId: string
  startCreateDate: string | Date
  endCreateDate: string | Date
  createDate: string | Date
  browser: string | Date
  browserVersion: string | Date
  os: string | Date
}

export function sysLogAccessMapper(item: SysLogAccess) {
  const {
    encryptionId,
    sysUser,
    areaName,
    controllerName,
    controllerDisplayName,
    remoteIp,
    actionName,
    actionDisplayName,
    breadCrumbs,
    queryString,
    requestId,
    startCreateDate,
    endCreateDate,
    createDate,
    browser,
    browserVersion,
    os,
  } = item
  return {
    encryptionId,
    sysUser,
    areaName,
    controllerName,
    controllerDisplayName,
    remoteIp,
    actionName,
    actionDisplayName,
    breadCrumbs,
    queryString,
    requestId,
    startCreateDate,
    endCreateDate,
    createDate,
    browser,
    browserVersion,
    os,
  }
}

export function fromRawSysLogAccessMapper(item: SysLogAccess) {
  const obj = sysLogAccessMapper(item)
  return {
    ...obj,
    createDate: new Date(new Date(obj.createDate).getTime() + 28800000),
    startCreateDate: (new Date(new Date(obj.startCreateDate).getTime() + 28800000)),
    endCreateDate: (new Date(new Date(obj.endCreateDate).getTime() + 28800000)),
  }
}

export function getDefaultSysLogAccess(): SysLogAccess {
  return {
  // id: 0,
    encryptionId: '',
    sysUser: '',
    areaName: '',
    controllerName: '',
    controllerDisplayName: '',
    remoteIp: '',
    actionName: '',
    actionDisplayName: '',
    breadCrumbs: [],
    queryString: '',
    requestId: '',
    startCreateDate: '',
    endCreateDate: '',
    createDate: '',
    browser: '',
    browserVersion: '',
    os: '',
  }
}
