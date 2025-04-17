// 記得將 export 加入到 ./index.ts

export interface SysTask {
  // id: number;
  encryptionId: string
  parentId: number
  taskActionId: string
  areaName: string
  taskName: string
  controllerName: string
  actionName: string
  iconName: string
  taskSort: number
}

export function sysTaskMapper(item: SysTask) {
  const {
    // id,
    encryptionId,
    parentId,
    taskActionId,
    areaName,
    taskName,
    controllerName,
    actionName,
    iconName,
    taskSort,
  } = item
  return {
    // id,
    encryptionId,
    parentId,
    taskActionId,
    areaName,
    taskName,
    controllerName,
    actionName,
    iconName,
    taskSort,
  }
}

export function fromRawSysTaskMapper(item: SysTask) {
  const obj = sysTaskMapper(item)
  return {
    ...obj,
  }
}
