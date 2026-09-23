import { implementsProtocol } from "~/protocols";
import { isEmpty, type Emptiable } from "~/protocols/emptiable";

export type EmptyValue =
  | ""
  | []
  | Record<string, never>
  | Map<any, never>
  | Set<never>
  | null
  | undefined;

export function empty(value: Emptiable): value is Emptiable<true>;
export function empty<T>(value: T): value is T & EmptyValue;
export function empty(value: any): boolean {
  if (value == null) {
    return true;
  }

  if (typeof value === "string") {
    return value.trim() === "";
  }

  if (implementsProtocol(isEmpty, value)) {
    const check = value[isEmpty];

    return !!(typeof check === "function" ? check.call(value) : check);
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  return false;
}
