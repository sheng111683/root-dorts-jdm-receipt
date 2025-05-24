export default defineAuthEventHandler(async (event, $serverFetch) => {
  const query = getQuery(event)

  // 構建請求體
  const requestBody = {
    agency: query.agency != undefined ? query.agency.toString().trim() : "",
    type: query.type != undefined ? query.type.toString().trim() : "".trim(),
    printType: query.printType != undefined ? query.printType.toString().trim() : "".trim(),
    certDate: query.certDate != undefined ? query.certDate.toString().trim() : "".trim(),
  }
  
  // 發送請求
  return await $serverFetch(`/api/JdmDailyReport/PrintDailyReport`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: requestBody, // 使用請求體
  })
})
