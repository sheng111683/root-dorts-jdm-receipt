export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)

  // 構建請求體
  const requestBody = {
    receiptPrintType: query.receiptPrintType.trim(),
    receiptPrintReason: query.receiptPrintReason.trim(),
    receiptPrintModel: query.receiptPrintModel.trim(),
    jdmReceiptIds: JSON.parse(query.jdmReceiptIds),
  }
  // 發送請求
  return await $serverFetch(`/api/jdmReceiptPrint/PrintReceipt`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody, // 使用請求體
  })
})
