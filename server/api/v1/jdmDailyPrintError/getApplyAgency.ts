export default defineAuthEventHandler(async (event, $serverFetch) => {
  const body = await readBody(event)
  const apiAgencyResponse: string = await $serverFetch(`/api/JdmDailyPrintError/GetApplyAgency`, {
    method: 'post',
  })
  return apiAgencyResponse
})
