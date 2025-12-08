export function tap<V, This = any>(
  this: This,
  value: V,
  callback: (this: This, value: V) => void
): V {
  return callback.call(this, value), value;
}
