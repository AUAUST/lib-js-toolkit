export function constant(): () => undefined;
export function constant<const Value>(
  value: Value,
  ...ignored: any[]
): () => Value;
export function constant(value?: any): () => any {
  return () => value;
}
