import { expect } from "vitest";

export function expectIntegersInRange(
  values: readonly number[],
  min: number,
  max: number,
): void {
  for (const value of values) {
    expect(Number.isInteger(value)).toBe(true);
    expect(value).toBeGreaterThanOrEqual(min);
    expect(value).toBeLessThanOrEqual(max);
  }
}
