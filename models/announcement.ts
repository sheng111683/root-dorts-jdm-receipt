// 記得將 export 加入到 ./index.ts

export interface Announcement {
  // id: number;
  encryptionId: string
  announcementDateStart: string | Date
  announcementDateEnd: string | Date
  content: string
  linkUrl: string
  announcementQueryConditions: string
  isStop: boolean
  createDate: string | Date
  createUser: string
  removed?: boolean
}

export function announcementMapper(item: Announcement) {
  const {
    // id,
    encryptionId,
    announcementDateStart,
    announcementDateEnd,
    content,
    linkUrl,
    announcementQueryConditions,
    isStop,
    createDate,
    createUser,
    removed,
  } = item
  return {
    // id,
    encryptionId,
    announcementDateStart,
    announcementDateEnd,
    content,
    linkUrl,
    announcementQueryConditions,
    isStop,
    createDate,
    createUser,
    removed,
  }
}

export function fromRawAnnouncementMapper(item: Announcement) {
  const obj = announcementMapper(item)
  return {
    ...obj,
    announcementDateStart: (new Date(new Date(obj.announcementDateStart).getTime() + 28800000)),
    announcementDateEnd: (new Date(new Date(obj.announcementDateEnd).getTime() + 28800000)),
  }
}

export function getDefaultAnnouncement(): Announcement {
  return {
  // id: 0,
    encryptionId: '',
    announcementDateStart: '',
    announcementDateEnd: '',
    content: '',
    linkUrl: '',
    announcementQueryConditions: '',
    isStop: false,
    createDate: '',
    createUser: '',
    removed: false,
  }
}
