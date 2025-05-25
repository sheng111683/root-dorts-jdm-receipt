import type {
  Announcement,
  CommitteeMember,
  JdmReceipt,
  Notice,
  Order,
  SysDepartment,
  SysEnterprise,
  SysLogAccess,
  SysLogDataChange,
  SysLogFileDownload,
  SysLogLogin,
  SysUser,

} from './'
import { getDefaultPageList } from './'
import { OrderStateType } from '~/enums'

// 記得將 export 加入到 ./index.ts

export function getDefaultCriteria() {
  return {
    pageNumber: 1,
    pageSize: 20,
  }
}

export function getDefulatCommitteeMemberCriteria() {
  return Object.assign({
    firstName: '',
    lastName: '',
    topSchool: '',
    workplace: '',
    mobile: '',
    email: '',
  }, getDefaultCriteria())
}

export function getSysUserCriteria() {
  return Object.assign({
    userId: '',
    name: '',
    sysName: '',
    currentEmployer: '',
    agent: '',
    isAccountEnabled: '',
    holidayRecently: '',
  }, getDefaultCriteria())
}

export function getCommitteeMemberQueryResult() {
  return getDefaultPageList<CommitteeMember>()
}

export function getSysUserQueryResult() {
  return getDefaultPageList<SysUser>()
}

export function getDefaultOrderCriteria() {
  return Object.assign({
    sysNumber: '',
    stateTypeE: OrderStateType.NONE,
  }, getDefaultCriteria())
}

export function getOrderQueryResult() {
  return getDefaultPageList<Order>()
}
export function getDefulatSysLogFileDownloadCriteria() {
  return Object.assign({
    accessUserId: '',
    remoteIp: '',
    tableName: '',
    fileName: '',
  }, getDefaultCriteria())
}
export function getSysLogFileDownloadQueryResult() {
  return getDefaultPageList<SysLogFileDownload>()
}

export function getDefulatSysLogAccessCriteria() {
  return Object.assign({
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
  }, getDefaultCriteria())
}
export function getSysLogAccessQueryResult() {
  return getDefaultPageList<SysLogAccess>()
}
export function getDefulatSysLogLoginCriteria() {
  return Object.assign({
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
    browser: '',
    browserVersion: '',
    os: '',
  }, getDefaultCriteria())
}
export function getSysLogLoginQueryResult() {
  return getDefaultPageList<SysLogLogin>()
}
export function getDefulatSysLogDataChangeCriteria() {
  return Object.assign({
    // id: 0,
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
  }, getDefaultCriteria())
}
export function getSysLogDataChangeQueryResult() {
  return getDefaultPageList<SysLogDataChange>()
}
export function getDefulatNoticeCriteria() {
  return Object.assign({
    noticeType: '',
    sendEmail: '',
    subject: '',
    content: '',
    noticeDate: '',
    noticeDateStart: '',
    noticeDateEnd: '',
    sendedDate: '',
    sendedDateStart: '',
    sendedDateEnd: '',
    noticeState: '',
    departmentId: '',
    enterpriseId: '',
    createDate: '',
    createUser: '',
    modifyDate: '',
    modifyUser: '',
    noticeStateType: [],
    removed: false,
  }, getDefaultCriteria())
}
export function getNoticeQueryResult() {
  return getDefaultPageList<Notice>()
}
export function getDefulatAnnouncementCriteria() {
  return Object.assign({
    // id: 0,
    announcementDateStart: '',
    announcementDateEnd: '',
    content: '',
    linkUrl: '',
    announcementQueryConditions: 'ALL',
    isStop: true,
    // departmentId: '',
    // enterpriseId: '',
    createDate: '',
    createUser: '',
    // modifyDate: '',
    // modifyUser: '',
    removed: false,
    announcementTimeValue: [],
  }, getDefaultCriteria())
}
export function getAnnouncementQueryResult() {
  return getDefaultPageList<Announcement>()
}

export function getDefulatSysUserCriteria() {
  return Object.assign({
    userId: '',
    sysAccount: '',
    sysName: '',
    currentEmployer: '',
    agent: '',
    isAccountEnabled: '',
    holidayRecently: '',
  }, getDefaultCriteria())
}
export function getSysEnterpriseQueryResult() {
  return getDefaultPageList<SysEnterprise>()
}
export function getDefulatSysEnterpriseCriteria() {
  return Object.assign({
    domainName: '',
    webDomainName1: '',
    webDomainName2: '',
    companyName: '',
    isDeBug: '',
    email1: '',
  }, getDefaultCriteria())
}
export function getSysDepartmentQueryResult() {
  return getDefaultPageList<SysDepartment>()
}
export function getDefulatSysDepartmentCriteria() {
  return Object.assign({
    encryptionId: '',
    departmentId: '',
    parentDepartmentId: 0,
    departmentName: '',
    parentDepartmentName: '',
    code: '',
    enterpriseId: 0,
    enabled: false,
    disableNotes: '',
    remark: '',
  }, getDefaultCriteria())
}
export function getDefulatJDMReceiptCriteria() {
  return Object.assign({
    agency: '',
    year: '',
    receiptType: 'ALL',
    receiptNumber: '',
    payNumber: '',
    payName: '',
    paymentName: '',
    payMoney: '',
    makeDate: '',
    removed: 'false',
  }, getDefaultCriteria())
}
export function getDefulatJDMReceiptAddCriteria() {
  return Object.assign({
    agency: '',
    year: '',
    receiptType: '',
    receiptNumber: '',
    payNumber: '',
    payName: '',
    paymentName: '',
    payMoney: '',
    makeDate: '',
    removed: false,
  }, getDefaultCriteria())
}
export function getJDMReceiptQueryResult() {
  return getDefaultPageList<JdmReceipt>()
}

export function getDefulatJDMReceiptInvoiceCriteria() {
  return Object.assign({
    receiptInvoiceType: '',
    Daterange: '',
  }, getDefaultCriteria())
}

export function getDefulatJDMReceiptPrintCriteria() {
  return Object.assign({
    jdmReceiptId: '',
    printReason: '',
    printNumber: 0,
    printDate: '',
    removed: false,
  }, getDefaultCriteria())
}

export function getDefaultagencyapply() {
  return Object.assign({
    機關名稱: '',
    機關代號: '',
    text: '',
    value: '',
  }, getDefaultCriteria())
}

export function getDefulatDailyReportCriteria() {
  return Object.assign({
    agency: '',
    printType: '',
    handleType: '',
    type: '0',
    certDate: '',
    encryptionId: '',
  }, getDefaultCriteria())
}

export function getDefulatMonthReportCriteria() {
  return Object.assign({
    agency: '',
    printType: '',
    handleType: '',
    type: '1',
    certDate: '',
    encryptionId: '',
  }, getDefaultCriteria())
}

export function getDefulatReceiptRegisterCriteria() {
  return Object.assign({
    agency: '',
    receiptType: '',
    handleType: '',
    type: '2',
    receiptDateStart: '',
    receiptDateEnd: '',
    startPage: '1',
    encryptionId: '',
  })
}