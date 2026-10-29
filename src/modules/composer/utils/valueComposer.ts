import { propertyComposer } from "#modules/composer/utils/propertyComposer";

export function valueComposer<Key extends PropertyKey, const Value>(
  key: Key,
  value: Value,
) {
  return propertyComposer(key, {
    value,
    writable: true,
  });
}
