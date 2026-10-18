export function constant<Value>(): () => undefined;
export function constant<Value>(value: Value): () => Value;
export function constant<Value>(value: Value, ...ignored: any[]): () => Value;
export function constant(value?: any): () => any {
  return () => value;
}
