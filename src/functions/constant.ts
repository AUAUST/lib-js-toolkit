export function constant(): () => undefined;
export function constant<T>(value: T): () => T;
export function constant<T>(value: T, ...ignored: any[]): () => T;
export function constant<T>(value?: T): () => T {
  return () => value!;
}
