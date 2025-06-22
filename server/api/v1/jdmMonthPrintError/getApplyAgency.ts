export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
  const apiAgencyResponse: string = await $serverFetch(`/api/JdmMonthPrintError/GetApplyAgency`, {
    method: 'post',
  })
  return apiAgencyResponse
})
