import { generateEnum } from '~/utils/enumUtil'
// 以下為使用方法說明
// export const Gender = generateEnum({
//   MALE: '男',
//   FEMALE: '女',
// });
// 等同於產生下面的類 enum 物件
// export const Gender = {
//   MALE: 'MALE',
//   FEMALE: 'FEMALE',
//   display(value) {
//     return {
//       MALE: '男',
//       FEMALE: '女',
//     }[value]
//   }
//   values() {
//     return [
//       'MALE', 'FEMALE'
//     ]
//   }
// }
/** 性別 */
export const Gender = generateEnum({
  MALE: '男',
  FEMALE: '女',
  NONE: '其它',
})

/** 訂單狀態 */
export const OrderStateType = generateEnum({
  NONE: '無',
  DRAFT: '草稿',
  ONGOING: '進行中',
  FINISHED: '已完成',
})
export const NoticeType = generateEnum({
  QUEUED: '排隊中',
  NOTIFIED: '已通知',
  FAILED: '失敗',
})
export const AnnouncementType = generateEnum({
  ON_THR_SHELVES: '上架中',
  NOT_ON_THR_SHELVES: '未上架',
  HISTORY: '歷史公告',
  ALL: '全部',
})

export const Availability = generateEnum({
  ALL: '全部',
  ENABLED: '啟用',
  DISABLE: '未啟用',
})
export const MessageType = generateEnum({
  Success: 'success',
  Info: 'info',
  Warning: 'warning',
  Error: 'error',
})
export const ReceiptTypeSearch = generateEnum({
  ALL: '全部',
  一般: '一般',
  保證金: '保證金',
  支出收回: '支出收回',
  其他: '其他',
  停車費: '停車費',
  重置基金: '重置基金',
  聯開保證金: '聯開保證金',
  聯開雜項收入: '聯開雜項收入',
  聯開代收款: '聯開代收款',
  一般建設基金: '一般建設基金',
  建設基金保證金: '建設基金保證金',
})

export const ReceiptType = generateEnum({
  一般: '一般',
  保證金: '保證金',
  支出收回: '支出收回',
  其他: '其他',
  停車費: '停車費',
  重置基金: '重置基金',
  聯開保證金: '聯開保證金',
  聯開雜項收入: '聯開雜項收入',
  聯開代收款: '聯開代收款',
  一般建設基金: '一般建設基金',
  建設基金保證金: '建設基金保證金',
})

export const DailyReportPrintTypeSearch = generateEnum({
  重置基金: '重置基金',
  雜項: '雜項',
  建設基金: '建設基金',
  其他: '其他',
  '土地基金(雜項)': '土地基金(雜項)',
  '土開基金(代收款)': '土開基金(代收款)',
  '土開基金(保證金)': '土開基金(保證金)',
})

export const DailyReportHandleType = generateEnum({
  列印: '列印',
  備註摘要: '備註摘要',
})

export const RemovedType = generateEnum({
  false: '否',
  true: '是',

})

export const ReceiptPrintType = generateEnum({
  全部: '全部',
  第一聯: '第一聯',
  第二聯: '第二聯',
  第三聯: '第三聯',
})

export const ReceiptPrintReason = generateEnum({
  卡紙: '卡紙',
  列印不清楚: '列印不清楚',
  誤繕: '誤繕',
  其他: '其他',
})

export const ReceiptInvoiceType = generateEnum({
  交易日: '交易日',
  帳務日: '帳務日',
  銷帳日: '銷帳日',
})

export const ReceiptPrintModel = generateEnum({
  一頁一聯: '一頁一聯',
  一頁六聯: '一頁六聯',
})
