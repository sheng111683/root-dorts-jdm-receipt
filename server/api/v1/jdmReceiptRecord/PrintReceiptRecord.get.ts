export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)

  // 構建請求體
  const requestBody = {
    agency: query.agency != undefined ? query.agency.toString().trim() : "",
    receiptType: query.receiptType != undefined ? query.receiptType.toString().trim() : "".trim(),
    printMonth: query.printMonth != undefined ? query.printMonth.toString().trim() : "".trim(),
  }
  
  // 發送請求
  return await $serverFetch(`/api/JdmReceiptRecord/PrintReceiptRecord`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody, // 使用請求體
  })
})
