export default defineDogsEventHandler(async (event, $apiFetch) => {
  const query = getQuery(event)
  return await $apiFetch(`/breeds/image/random`, {
    method: 'get',
    params: { abc: '123', ...query },
  })
})
