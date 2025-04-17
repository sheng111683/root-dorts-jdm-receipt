import type { PrivilegeMap, RouteTreeNode, SysRolesTasks, SysTask } from '~/models'
import { fromRawSysRolesTasksMapper, fromRawSysTaskMapper, getDefaultPrivilege } from '~/models'
import { decryptId } from '~/utils/encryptUtil'

/** 路由 API */
export default defineAuthEventHandler(async (event, $serverFetch) => {
  const tasks: SysTask[] = await $serverFetch(`/api/WebTask/GeUserTask`, {
    method: 'get',
  })
    .then((rs: SysTask[]) => {
      return rs.map(fromRawSysTaskMapper)
    })
  const rolesTasks: SysRolesTasks[] = await $serverFetch(`/api/WebTask/GetUserRolesTask`, {
    method: 'get',
  })
    .then((rs: SysRolesTasks[]) => {
      return rs.map(fromRawSysRolesTasksMapper)
    })
  const availableTaskIdSet = rolesTasks
    .reduce((collector: Set<number>, next: SysRolesTasks) => {
      collector.add(next.sysTasksId)
      return collector
    }, new Set())
  const availableTasks = tasks
    .filter((task: SysTask) => availableTaskIdSet.has(decryptId(task.encryptionId)))
  const defaultPrivilege = getDefaultPrivilege()
  const excludeTaskIds = rolesTasks
    .filter((roleTask: any) => {
      // 如果全部 isXXX 都是 false 則選取
      return Object.keys(defaultPrivilege)
        .reduce((collector, next) => {
          collector = collector && !roleTask[next]
          return collector
        }, true)
    })
    .map(roleTask => roleTask.sysTasksId)
  const excludeTaskIdSet = new Set(excludeTaskIds)
  const privilegeMap = generatePrivilegeMap(tasks, rolesTasks)
  const routeTree = generateRouteTree(availableTasks, excludeTaskIdSet)
  return { routeTree, privilegeMap }

  /** mock routers api response */
  // const storage = useStorage()
  // return {
  //   success: true,
  //   data: await storage.getItem('db:routers'),
  // }
})

function generatePrivilegeMap(tasks: SysTask[], rolesTasks: SysRolesTasks[]) {
  const taskMap = tasks
    .reduce((collector: { [key: string]: SysTask }, next: SysTask) => {
      collector[decryptId(next.encryptionId)] = next
      return collector
    }, {})
  const privilegeMap = rolesTasks
    .reduce((collector: PrivilegeMap, next: SysRolesTasks) => {
      const task = taskMap[next.sysTasksId]
      if (task) {
        const path = taskActionIdToPath(task.taskActionId, task.encryptionId)
        if (path.startsWith('/')) {
          collector[path] = collector[path] ? collector[path] : {}
          collector[path] = {
            ...(next.isAdd ? { isAdd: true } : {}),
            ...(next.isEdit ? { isEdit: true } : {}),
            ...(next.isAudit ? { isAudit: true } : {}),
            ...(next.isView ? { isView: true } : {}),
            ...(next.isRemoved ? { isRemoved: true } : {}),
            ...(next.isReport ? { isReport: true } : {}),
            ...(next.isAdmin ? { isAdmin: true } : {}),
          }
        }
      }
      return collector
    }, {})
  return privilegeMap
}

function generateRouteTree(tasks: SysTask[], excludeTaskIdSet: Set<number>, parentId = 0): RouteTreeNode[] {
  const tasksOfParent = tasks
    .filter(task => task.parentId === parentId && !excludeTaskIdSet.has(decryptId(task.encryptionId)))
  return tasksOfParent.map((task) => {
    const {
      encryptionId,
      taskActionId,
      taskName,
      iconName,
    } = task
    const children = generateRouteTree(tasks, excludeTaskIdSet, decryptId(encryptionId))
    return {
      name: taskActionId === '#' ? `#${encryptionId}` : taskActionId,
      path: taskActionIdToPath(taskActionId, encryptionId),
      meta: {
        title: taskName,
        icon: iconName,
      },
      children,
    }
  })
}

function taskActionIdToPath(taskActionId: string, encryptionId: string) {
  if (taskActionId === '#') {
    return `/folder_${encryptionId}`
  }
  else {
    return taskActionId.replace(/~/, '').replace(/\/(\w)/g, (match, p1) => `/${p1.toLowerCase()}`)
  }
}
