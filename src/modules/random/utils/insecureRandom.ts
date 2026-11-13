/** Returns a float in [0, 1). Not cryptographically secure; for speed where predictability does not matter. */
export function insecureRandom(): number {
  return Math.random();
}
