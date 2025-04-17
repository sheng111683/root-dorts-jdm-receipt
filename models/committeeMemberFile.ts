import { type SysFile, sysFileMapper } from './sysFile'

// 記得將 export 加入到 ./index.ts

export interface CommitteeMemberFile {
  encryptionId: string
  committeeMemberId: number
  sysFileId: number
  sort: number
  removed?: boolean
  sysFile: SysFile
}

export function committeeMemberFileMapper(item: CommitteeMemberFile) {
  const {
    // id,
    encryptionId,
    committeeMemberId,
    sysFileId,
    sort,
    removed,
    sysFile,
  } = item
  return {
    // id,
    encryptionId,
    committeeMemberId,
    sysFileId,
    sort,
    removed,
    sysFile: sysFileMapper(sysFile),
  }
}

export function fromRawCommitteeMemberFileMapper(item: CommitteeMemberFile) {
  const obj = committeeMemberFileMapper(item)
  return {
    ...obj,
  }
}
