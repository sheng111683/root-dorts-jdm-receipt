/** 產生 enum 物件 */
export function generateEnum<T extends { [key: string]: string }>(itemMap: T) {
  const keys = Object.keys(itemMap)
  const enumsInsts = keys.reduce((collector, nextKey) =>
    ({ ...collector, [nextKey]: nextKey }), {})
  const displayMapping = keys.reduce((collector, nextKey) =>
    ({ ...collector, [nextKey]: itemMap[nextKey] }), {})
  return Object.freeze({
    ...enumsInsts,
    display: value => displayMapping[value],
    values: () => keys,
  } as T & { display: (value: any) => any } & { values: () => string[] })
}
