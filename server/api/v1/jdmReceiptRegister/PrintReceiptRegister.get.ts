export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)

  // 構建請求體
  const requestBody = {
    agency: query.agency != undefined ? query.agency.toString().trim() : "",
    type: query.type != undefined ? query.type.toString().trim() : "".trim(),
    receiptType: query.printType != undefined ? query.printType.toString().trim() : "".trim(),
    receiptDateStart: query.receiptDateStart != undefined ? query.receiptDateStart.toString().trim() : "".trim(),
    receiptDateEnd: query.receiptDateEnd != undefined ? query.receiptDateEnd.toString().trim() : "".trim(),
    startPage: query.startPage != undefined ? query.startPage.toString().trim() : "".trim(),
    handleType: query.handleType != undefined ? query.handleType.toString().trim() : "".trim(),
  }
  
  // 發送請求
  return await $serverFetch(`/api/JdmReceiptRegister/PrintReceiptRegister`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody, // 使用請求體
  })
})
