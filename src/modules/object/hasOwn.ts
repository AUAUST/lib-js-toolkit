type HasOwn = <Target, Key extends PropertyKey>(
  target: Target,
  key: Key,
) => target is Target & Record<Key, unknown>;

export const hasOwn = Object.hasOwn as HasOwn;
