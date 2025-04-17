// 記得將 export 加入到 ./index.ts

export interface Privilege {
  isAdd?: boolean
  isEdit?: boolean
  isAudit?: boolean
  isView?: boolean
  isRemoved?: boolean
  isReport?: boolean
  isAdmin?: boolean
}

export interface PrivilegeMap {
  [key: string]: Privilege
}

export function getDefaultPrivilege() {
  return {
    isAdd: false,
    isEdit: false,
    isView: false,
    isRemoved: false,
    isReport: false,
    isAudit: false,
    isAdmin: false,
  }
}
