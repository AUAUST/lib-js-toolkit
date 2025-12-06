export function tap<V>(value: V, fn: (value: V) => void): V {
  return fn(value), value;
}
