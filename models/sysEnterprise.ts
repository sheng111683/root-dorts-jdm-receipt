// 記得將 export 加入到 ./index.ts

export interface SysEnterprise {
  encryptionId: string
  domainName: string
  webDomainName1: string
  webDomainName2: string
  isDeBug: boolean
  isDeBugString: string
  companyName: string
  email1: string
  passIP: string
  sysHolidayType: string
  fileStoragePath: string
  fileSftpPath: string

}

export function sysEnterpriseMapper(item: SysEnterprise) {
  const {
    encryptionId,
    domainName,
    webDomainName1,
    webDomainName2,
    isDeBug,
    isDeBugString,
    companyName,
    email1,
    passIP,
    sysHolidayType,
    fileStoragePath,
    fileSftpPath,
  } = item
  return {
    encryptionId,
    domainName,
    webDomainName1,
    webDomainName2,
    isDeBug,
    isDeBugString,
    companyName,
    email1,
    passIP,
    sysHolidayType,
    fileStoragePath,
    fileSftpPath,
  }
}

export function fromRawSysEnterpriseMapper(item: SysEnterprise) {
  const obj = sysEnterpriseMapper(item)
  return {
    ...obj,
  }
}

export function getDefaultSysEnterprise() {
  return {
    encryptionId: '',
    domainName: '',
    webDomainName1: '',
    webDomainName2: '',
    isDeBug: false,
    isDeBugString: '',
    companyName: '',
    email1: '',
    passIP: '',
    sysHolidayType: '',
    fileStoragePath: '',
    fileSftpPath: '',
  }
}
