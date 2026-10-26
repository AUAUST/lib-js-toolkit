import type {
  Countable,
  EmptyCountable,
} from "@auaust/toolkit/protocols/countable";
import type { Emptiable } from "@auaust/toolkit/protocols/emptiable";
import type {
  EmptyContainer,
  EmptyString,
  EmptyValue,
} from "@auaust/toolkit/types";

export type EmptyMember<Value> = Value extends null | undefined
  ? Value
  : Value extends number | bigint | boolean | symbol
    ? never
    : Value extends string
      ? EmptyString<Value>
      : Value extends Emptiable<false>
        ? never
        : Value extends Emptiable
          ? Emptiable<true>
          : Value extends Countable
            ? EmptyCountable
            : Value extends object
              ? EmptyContainer<Value>
              : | EmptyValue
                | EmptyString
                | EmptyCountable
                | { length: 0 }
                | { size: 0 };
