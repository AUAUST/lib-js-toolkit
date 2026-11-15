import { isBigInt } from "#modules/guard/guards/isBigInt";
import { isInteger } from "#modules/number/guards/isInteger";

/**
 * Returns whether the value is an even integer; `false` for `NaN`, `±Infinity`
 * and non-integers.
 */
export function isEven(value: number): boolean;
export function isEven(value: bigint): boolean;
export function isEven(value: number | bigint): boolean {
  return isBigInt(value)
    ? value % 2n === 0n
    : isInteger(value) && value % 2 === 0;
}
