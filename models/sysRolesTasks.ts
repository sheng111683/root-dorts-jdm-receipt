// 記得將 export 加入到 ./index.ts

export interface SysRolesTasks {
  // id: number;
  encryptionId: string
  sysRolesId: number
  sysTasksId: number
  dataRange: string
  isAdd: boolean
  isEdit: boolean
  isAudit: boolean
  isView: boolean
  isRemoved: boolean
  isReport: boolean
  isAdmin: boolean
}

export function sysRolesTasksMapper(item: SysRolesTasks) {
  const {
    // id,
    encryptionId,
    sysRolesId,
    sysTasksId,
    dataRange,
    isAdd,
    isEdit,
    isAudit,
    isView,
    isRemoved,
    isReport,
    isAdmin,
  } = item
  return {
    // id,
    encryptionId,
    sysRolesId,
    sysTasksId,
    dataRange,
    isAdd,
    isEdit,
    isAudit,
    isView,
    isRemoved,
    isReport,
    isAdmin,
  }
}

export function fromRawSysRolesTasksMapper(item: SysRolesTasks) {
  const obj = sysRolesTasksMapper(item)
  return {
    ...obj,
  }
}
