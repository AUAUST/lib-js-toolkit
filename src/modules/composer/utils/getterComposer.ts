import { propertyComposer } from "#modules/composer/utils/propertyComposer";

export function getterComposer<
  Key extends PropertyKey,
  Getter extends (this: any) => unknown,
>(key: Key, get: Getter) {
  return propertyComposer(key, {
    get,
  });
}
