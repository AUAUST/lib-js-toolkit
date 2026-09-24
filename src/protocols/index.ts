import type { Primitive } from "@auaust/toolkit/types";

export interface ProtocolRegistry {
  [Symbol.asyncDispose]: AsyncDisposable;
  [Symbol.asyncIterator]: AsyncIterable<any>;
  [Symbol.dispose]: Disposable;
  [Symbol.hasInstance]: {
    [Symbol.hasInstance]<T>(
      this: new (...args: any[]) => T,
      value: any,
    ): value is T;
    [Symbol.hasInstance](value: any): boolean;
  };
  [Symbol.isConcatSpreadable]: {
    [Symbol.isConcatSpreadable]: boolean;
  };
  [Symbol.iterator]: Iterable<any>;
  [Symbol.match]: {
    [Symbol.match](string: string): RegExpMatchArray | null;
  };
  [Symbol.matchAll]: {
    [Symbol.matchAll](string: string): IterableIterator<RegExpMatchArray>;
  };
  [Symbol.replace]: {
    [Symbol.replace](
      string: string,
      replacement: string | ((substring: string, ...args: any[]) => string),
    ): string;
  };
  [Symbol.search]: {
    [Symbol.search](string: string): number;
  };
  [Symbol.species]: {
    readonly [Symbol.species]: Function | null;
  };
  [Symbol.split]: {
    [Symbol.split](string: string, limit?: number): string[];
  };
  [Symbol.toPrimitive]: {
    [Symbol.toPrimitive](hint: "default" | "number" | "string"): Primitive;
  };
  [Symbol.toStringTag]: {
    readonly [Symbol.toStringTag]: string;
  };
  [Symbol.unscopables]: {
    readonly [Symbol.unscopables]: object;
  };
}

export {
  implementsProtocol,
  protocolSymbol,
  type DefineProtocol,
} from "./protocols";
