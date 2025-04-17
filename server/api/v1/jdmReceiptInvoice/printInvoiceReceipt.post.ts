export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event) // 確保讀取的是正確數據
  const response = await $serverFetch(`/api/JdmReceiptInvoice/PrintInvoiceReceipt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })

  return response
})
