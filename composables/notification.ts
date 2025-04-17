import { ElNotification } from 'element-plus'

function success(message: string) {
  ElNotification.success({
    customClass: 'notification-success',
    title: '成功',
    message,
    type: 'success',
  })
}

function info(message: string) {
  ElNotification.info({
    customClass: 'notification-info',
    title: '消息',
    message,
    type: 'info',
  })
}

function warning(message: string) {
  ElNotification.warning({
    customClass: 'notification-warning',
    title: '警告',
    message,
    type: 'warning',
  })
}

function error(message: string) {
  ElNotification.error({
    customClass: 'notification-error',
    title: '錯誤',
    message,
    type: 'error',
  })
}

export function useNotification() {
  return {
    success,
    info,
    warning,
    error,
  }
}
