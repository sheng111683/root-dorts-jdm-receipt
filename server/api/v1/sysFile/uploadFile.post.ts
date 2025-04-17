/** 檔案上傳 */
export default defineAuthEventHandler(async (event, $serverFetch) => {
  const files = await readMultipartFormData(event)
  const query = getQuery(event)
  const formData = files?.reduce((formData, nextFile) => {
    const blob = new Blob([nextFile.data], { type: nextFile.type })
    formData.append('iFormFiles', blob, nextFile.filename)
    return formData
  }, new FormData())
  const apiUploadResponse: string = await $serverFetch(`/api/SysFile/UploadFile`, {
    method: 'post',
    body: formData,
    params: query,
  })
  return apiUploadResponse
})
