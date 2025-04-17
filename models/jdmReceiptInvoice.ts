// 記得將 export 加入到 ./index.ts

export interface JdmReceiptInvoice {
  tS_ID: number
  saleS_NO: string
  buildinG_NAME: string
  lesS_NAME: string
  empL_NAME: string
  saleS_TYPE: string
  payableD_DATE: string | Date | null
  renT_AMT: number
  renT_START_DATE: string | Date | null
  renT_END_DATE: string | Date | null
  paymenT_DATE: string | Date | null
  accT_DATE: string | Date | null
  offseT_DATE: string | Date | null
  invoicE_NO: string
  invoicE_STATUS: string
  invoicE_WORK_TYPE: string
  invoicE_DATE: string | Date | null
  invoicE_NUMBER: string
  tsid: number
  receiptno: number
  makeDate: string | Date
  receiptNumber: string
}

export function jdmReceiptInvoiceMapper(item: JdmReceiptInvoice) {
  const {
    tS_ID,
    saleS_NO,
    buildinG_NAME,
    lesS_NAME,
    empL_NAME,
    saleS_TYPE,
    payableD_DATE,
    renT_AMT,
    renT_START_DATE,
    renT_END_DATE,
    paymenT_DATE,
    accT_DATE,
    offseT_DATE,
    invoicE_NO,
    invoicE_STATUS,
    invoicE_WORK_TYPE,
    invoicE_DATE,
    invoicE_NUMBER,
    tsid,
    receiptno,
    makeDate,
    receiptNumber,
  } = item
  return {
    tS_ID,
    saleS_NO,
    buildinG_NAME,
    lesS_NAME,
    empL_NAME,
    saleS_TYPE,
    payableD_DATE,
    renT_AMT,
    renT_START_DATE,
    renT_END_DATE,
    paymenT_DATE,
    accT_DATE,
    offseT_DATE,
    invoicE_NO,
    invoicE_STATUS,
    invoicE_WORK_TYPE,
    invoicE_DATE,
    invoicE_NUMBER,
    tsid,
    receiptno,
    makeDate,
    receiptNumber,
  }
}

export function fromRawJdmReceiptInvoiceMapper(item: JdmReceiptInvoice) {
  const obj = jdmReceiptInvoiceMapper(item)
  return {
    ...obj,
  }
}

export function getDefaultJdmReceiptInvoice(): JdmReceiptInvoice {
  return {
    tS_ID: 0,
    saleS_NO: '',
    buildinG_NAME: '',
    lesS_NAME: '',
    empL_NAME: '',
    saleS_TYPE: '',
    payableD_DATE: '',
    renT_AMT: 0,
    renT_START_DATE: '',
    renT_END_DATE: '',
    paymenT_DATE: '',
    accT_DATE: '',
    offseT_DATE: '',
    invoicE_NO: '',
    invoicE_STATUS: '',
    invoicE_WORK_TYPE: '',
    invoicE_DATE: '',
    invoicE_NUMBER: '',
    tsid: 0,
    receiptno: 0,
    makeDate: '',
    receiptNumber: '',
  }
}
