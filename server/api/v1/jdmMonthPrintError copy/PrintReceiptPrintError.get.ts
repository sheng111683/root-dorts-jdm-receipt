export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)

  // 構建請求體
  const requestBody = {
    agency: query.agency != undefined ? query.agency.toString().trim() : "",
    receiptType: query.receiptType != undefined ? query.receiptType.toString().trim() : "".trim(),
    printDate: query.printDate != undefined ? query.printDate.toString().trim() : "".trim(),
    type: query.type != undefined ? query.type.toString().trim() : "".trim(),
  }
  
  // 發送請求
  return await $serverFetch(`/api/JdmMonthPrintError/PrintReceiptPrintError`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody, // 使用請求體
  })
})
