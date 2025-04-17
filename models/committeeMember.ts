import type { AddFile } from './addFile'
import { type CommitteeMemberFile, committeeMemberFileMapper } from './committeeMemberFile'

// 記得將 export 加入到 ./index.ts

export interface CommitteeMember {
  // id: number;
  encryptionId: string
  firstName: string
  lastName: string
  gender: string
  topSchool: string
  workplace: string
  mobile: string
  email: string
  removed?: boolean
  committeeMemberFiles?: CommitteeMemberFile[]
  addFile?: AddFile
}

export function committeeMemberMapper(item: CommitteeMember) {
  const {
    // id,
    encryptionId,
    firstName,
    lastName,
    gender,
    topSchool,
    workplace,
    mobile,
    email,
    committeeMemberFiles,
    addFile,
    removed,
  } = item
  return {
    // id,
    encryptionId,
    firstName,
    lastName,
    gender,
    topSchool,
    workplace,
    mobile,
    email,
    removed,
    ...(committeeMemberFiles
      ? {
          committeeMemberFiles: committeeMemberFiles?.map(item => committeeMemberFileMapper(item)),
        }
      : {}),
    ...(addFile
      ? {
          addFile,
        }
      : {}),
  }
}

export function fromRawCommitteeMemberMapper(item: CommitteeMember) {
  const obj = committeeMemberMapper(item)
  return {
    ...obj,
  }
}

export function getDefaultCommitteeMember(): CommitteeMember {
  return {
  // id: 0,
    encryptionId: '',
    firstName: '',
    lastName: '',
    gender: '',
    topSchool: '',
    workplace: '',
    mobile: '',
    email: '',
  }
}
