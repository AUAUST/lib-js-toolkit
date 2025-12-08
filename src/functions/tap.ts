export function tap<V>(value: V, callback: (value: V) => void): V {
  return callback(value), value;
}
