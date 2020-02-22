export const getHashkey = (schema: any): string => {
  for (const prop in schema) {
    if (schema[prop].keyType === 'HASH') return prop
  }
  return ''
}
