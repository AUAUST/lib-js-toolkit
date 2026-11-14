/**
 * Lowercases the first character of a `<Type>` name, giving its module name
 * `<type>`.
 */
export function lowerFirst(type: string): string {
  return `${type.charAt(0).toLowerCase()}${type.slice(1)}`;
}
