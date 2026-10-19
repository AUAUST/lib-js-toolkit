import type {
  Countable,
  EmptyCountable,
} from "@auaust/toolkit/protocols/countable";
import type { Emptiable } from "@auaust/toolkit/protocols/emptiable";
import type { FilledContainer, FilledString } from "@auaust/toolkit/types";

export type FilledMember<Value> = Value extends null | undefined
  ? never
  : Value extends number | bigint | boolean | symbol
    ? Value
    : Value extends string
      ? FilledString<Value>
      : Value extends Emptiable<true>
        ? never
        : Value extends Emptiable<false>
          ? Value
          : Value extends Emptiable
            ? Emptiable<false>
            : Value extends Countable
              ? Value extends EmptyCountable
                ? never
                : Value
              : Value extends object
                ? FilledContainer<Value>
                : string | number | bigint | boolean | symbol | object;
