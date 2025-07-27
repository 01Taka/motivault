/**
 * Replaces placeholders in a given template string with provided values.
 * Placeholders are in the format ${key}.
 *
 * @param templateString The string containing placeholders (e.g., 'やり方はシンプル！${steps}ステップでスタート').
 * @param values An object containing key-value pairs for substitution (e.g., { steps: 3 }).
 * @returns The interpolated string.
 */
export function interpolateString(
  templateString: string,
  values: Record<string, string | number>
): string {
  if (!templateString) {
    console.warn('Template string is empty or null.')
    return ''
  }

  // Use a regular expression to find all ${key} patterns
  return templateString.replace(/\$\{(\w+)\}/g, (match, key) => {
    // If the key exists in values, use its value; otherwise, keep the original placeholder
    return values.hasOwnProperty(key) ? String(values[key]) : match
  })
}
