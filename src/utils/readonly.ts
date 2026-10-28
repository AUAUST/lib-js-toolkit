import { ReadonlyError } from "@auaust/toolkit/errors";
import { isContainer } from "@auaust/toolkit/isContainer";
import { finalize, hasOwn } from "@auaust/toolkit/object";

const readonlySymbol = Symbol("readonly");

const readonlyPropertyDescriptor: PropertyDescriptor = {
  configurable: true,
  enumerable: false,
  writable: false,
};

const readonlyHandler: ProxyHandler<object> = {
  has(target, property) {
    return Reflect.has(target, property) || property === readonlySymbol;
  },
  set(target, property) {
    throw new ReadonlyError(
      `Cannot assign property '${String(property)}' to readonly '${target}'`,
    );
  },
  deleteProperty(target, property) {
    throw new ReadonlyError(
      `Cannot delete property '${String(property)}' from readonly '${target}'`,
    );
  },
  defineProperty(target, property) {
    throw new ReadonlyError(
      `Cannot define property '${String(property)}' on readonly '${target}'`,
    );
  },
  preventExtensions(target) {
    throw new ReadonlyError(
      `Cannot prevent extensions on readonly '${target}'`,
    );
  },
  setPrototypeOf(target) {
    throw new ReadonlyError(`Cannot set prototype of readonly '${target}'`);
  },
  getOwnPropertyDescriptor(target, property) {
    if (property === readonlySymbol) {
      return readonlyPropertyDescriptor;
    }

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
};

const readonlyProxies = new WeakMap<object, object>();

function doReadonly<Target extends readonly any[]>(
  array: Target,
): Readonly<Target>;
function doReadonly<Target>(array: Target[]): readonly Target[];
function doReadonly<Target extends object>(object: Target): Readonly<Target>;
function doReadonly(object: any): any {
  if (!isContainer(object)) {
    throw new TypeError("Expected an object or function");
  }

  if (hasOwn(object, readonlySymbol)) {
    return object;
  }

  if (readonlyProxies.has(object)) {
    return readonlyProxies.get(object);
  }

  const proxy = new Proxy(object, readonlyHandler);

  readonlyProxies.set(object, proxy);

  return proxy;
}

function isReadonly(object: unknown): boolean {
  return object != null && hasOwn(object, readonlySymbol);
}

export const readonly = finalize(doReadonly, {
  isReadonly,
});
