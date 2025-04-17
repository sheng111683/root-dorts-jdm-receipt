// 記得將 export 加入到 ./index.ts

export interface SysUser {
  encryptionId: string
  userId: string
  name: string
  currentEmployer: string
  agent: string
  holidayRecently: string
  isAccountEnabled: string
  enabled: boolean
  gender: string
  phone: string
  email: string
  departmentId: string
  experience: string
  specialty1: string
  specialty2: string
  specialty3: string
  selected: boolean
  isCommittee: boolean

}

export function sysUserMapper(item: SysUser) {
  const {
    encryptionId,
    userId,
    name,
    currentEmployer,
    agent,
    holidayRecently,
    isAccountEnabled,
    enabled,
    gender,
    phone,
    email,
    departmentId,
    experience,
    specialty1,
    specialty2,
    specialty3,
    selected,
    isCommittee,
  } = item
  return {
    encryptionId,
    userId,
    name,
    currentEmployer,
    agent,
    holidayRecently,
    isAccountEnabled,
    enabled,
    gender,
    phone,
    email,
    departmentId,
    experience,
    specialty1,
    specialty2,
    specialty3,
    selected,
    isCommittee,
  }
}

export function fromRawSysUserMapper(item: SysUser) {
  const obj = sysUserMapper(item)
  return {
    ...obj,
  }
}

export function getDefaultSysUser() {
  return {
    encryptionId: '',
    userId: '',
    name: '',
    currentEmployer: '',
    agent: '',
    holidayRecently: '',
    isAccountEnabled: '',
    enabled: false,
    gender: '',
    phone: '',
    email: '',
    departmentId: '',
    experience: '',
    specialty1: '',
    specialty2: '',
    specialty3: '',
    selected: false,
    isCommittee: false,
  }
}
