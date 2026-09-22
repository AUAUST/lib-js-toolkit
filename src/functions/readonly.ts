import { ReadonlyError } from "~/errors/ReadonlyError";

const readonlySymbol = Symbol("readonly");

const readonlyHandler: ProxyHandler<object> = {
  get(target, property, receiver) {
    if (property === readonlySymbol) {
      return true;
    }

    return Reflect.get(target, property, receiver);
  },
  has(target, property) {
    return Reflect.has(target, property);
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
  isExtensible(target) {
    return false;
  },
  setPrototypeOf(target, prototype) {
    throw new ReadonlyError(`Cannot set prototype of readonly '${target}'`);
  },
};

const readonlyProxies = new WeakMap<object, object>();

function doReadonly<T extends readonly any[]>(array: T): Readonly<T>;
function doReadonly<T>(array: T[]): ReadonlyArray<T>;
function doReadonly<T extends object>(object: T): Readonly<T>;
function doReadonly(object: any): any {
  if (!object || (typeof object !== "object" && typeof object !== "function")) {
    throw new TypeError("Expected an object or function");
  }

  if (object[readonlySymbol] === true) {
    return object;
  }

  if (readonlyProxies.has(object)) {
    return readonlyProxies.get(object);
  }

  const proxy = new Proxy(object, readonlyHandler);

  readonlyProxies.set(object, proxy);

  return proxy;
}

function isReadonly(object: unknown): boolean;
function isReadonly(object: any): boolean {
  return !!(object && object[readonlySymbol] === true);
}

export const readonly = Object.assign(doReadonly, {
  isReadonly,
});
