// 記得將 export 加入到 ./index.ts

export interface SysDepartment {
  encryptionId: string
  departmentId: string
  parentDepartmentId: string
  departmentName: string
  parentDepartmentName: string
  code: string
  enterpriseId: number
  enabled: boolean
  disableNotes: string
  remark: string
}

export function sysDepartmentMapper(item: SysDepartment) {
  const {
    encryptionId,
    departmentId,
    parentDepartmentId,
    departmentName,
    parentDepartmentName,
    code,
    enterpriseId,
    enabled,
    disableNotes,
    remark,

  } = item
  return {
    encryptionId,
    departmentId,
    parentDepartmentId,
    departmentName,
    parentDepartmentName,
    code,
    enterpriseId,
    enabled,
    disableNotes,
    remark,
  }
}

export function fromRawSysDepartmentMapper(item: SysDepartment) {
  const obj = sysDepartmentMapper(item)
  return {
    ...obj,
  }
}

export function getDefaultSysDepartment() {
  return {
    encryptionId: '',
    departmentId: '',
    parentDepartmentId: '',
    departmentName: '',
    parentDepartmentName: '',
    code: '',
    enterpriseId: 0,
    enabled: false,
    disableNotes: '',
    remark: '',
  }
}
