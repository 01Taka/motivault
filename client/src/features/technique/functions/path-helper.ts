export function camelToKebab(camelCaseString: string): string {
  return camelCaseString
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .toLowerCase()
}
