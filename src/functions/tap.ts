export function tap<V>(value: V, interceptor: (value: V) => void): V {
  return interceptor(value), value;
}
