export function isNullish(candidate: unknown): candidate is null | undefined {
  return candidate == null;
}
