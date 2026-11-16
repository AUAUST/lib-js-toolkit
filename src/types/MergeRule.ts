import type { MergeContext } from "#types/MergeContext";

/**
 * Resolves a key's merged value from its own values, in argument order.
 */
export type MergeRule = (
  values: readonly unknown[],
  context: MergeContext,
) => unknown;
