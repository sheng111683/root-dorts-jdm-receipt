// 記得將 export 加入到 ./index.ts

export interface Notice {
  // id: number
  encryptionId: string
  noticeType: string
  sendEmail: string
  subject: string
  content: string
  noticeDate: string | Date
  noticeDateStart: string | Date
  noticeDateEnd: string | Date
  sendedDate: string | Date
  sendedDateStart: string | Date
  sendedDateEnd: string | Date
  noticeState: string
  departmentId: string
  enterpriseId: string
  createDate: string | Date
  createUser: string
  modifyDate: string | Date
  modifyUser: string
  noticeStateType: Array<string>
  removed?: boolean
}

export function noticeMapper(item: Notice) {
  const {
    // id,
    encryptionId,
    noticeType,
    sendEmail,
    subject,
    content,
    noticeDate,
    noticeDateStart,
    noticeDateEnd,
    sendedDate,
    sendedDateStart,
    sendedDateEnd,
    noticeState,
    departmentId,
    enterpriseId,
    createDate,
    createUser,
    modifyDate,
    modifyUser,
    noticeStateType,
    removed,
  } = item
  return {
    // id,
    encryptionId,
    noticeType,
    sendEmail,
    subject,
    content,
    noticeDate,
    noticeDateStart,
    noticeDateEnd,
    sendedDate,
    sendedDateStart,
    sendedDateEnd,
    noticeState,
    departmentId,
    enterpriseId,
    createDate,
    createUser,
    modifyDate,
    modifyUser,
    noticeStateType,
    removed,
  }
}

export function fromRawNoticeMapper(item: Notice) {
  const obj = noticeMapper(item)
  return {
    ...obj,
    noticeDate: new Date(new Date(obj.noticeDate).getTime() + 28800000),
    noticeDateStart: new Date(new Date(obj.noticeDateStart).getTime() + 28800000),
    noticeDateEnd: new Date(new Date(obj.noticeDateEnd).getTime() + 28800000),
    sendedDate: new Date(new Date(obj.sendedDate).getTime() + 28800000),
    sendedDateStart: new Date(new Date(obj.sendedDateStart).getTime() + 28800000),
    sendedDateEnd: new Date(new Date(obj.sendedDateEnd).getTime() + 28800000),
  }
}

export function getDefaultNotice(): Notice {
  return {
    // id: 0,
    encryptionId: '',
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
  }
}
