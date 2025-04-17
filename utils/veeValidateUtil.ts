/** 抓取表單物件的 key 轉換為 veeValidation 的 fields 物件 */
export function useGenerateVeeFields(formKeys: string[], defineField: any): any {
  return formKeys
    .reduce((collector, next: string) => {
      const [value, field] = defineField(next)
      collector[next] = { value, field }
      return collector
    }, {})
}
