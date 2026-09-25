import { ReadonlyError } from "@auaust/toolkit/errors";
import { isContainer } from "@auaust/toolkit/isContainer";

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
  setPrototypeOf(target, prototype) {
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

function doReadonly<T extends readonly any[]>(array: T): Readonly<T>;
function doReadonly<T>(array: T[]): ReadonlyArray<T>;
function doReadonly<T extends object>(object: T): Readonly<T>;
function doReadonly(object: any): any {
  if (!isContainer(object)) {
    throw new TypeError("Expected an object or function");
  }

  if (Object.hasOwn(object, readonlySymbol)) {
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
  return object != null && Object.hasOwn(object, readonlySymbol);
}

export const readonly = Object.assign(doReadonly, {
  isReadonly,
});
