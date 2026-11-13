const buffer = new Uint32Array(1);

/** Draws one secure unsigned 32-bit integer from the host generator. */
export function randomUint32(): number {
  crypto.getRandomValues(buffer);

  const value = buffer[0];

  if (value === undefined) {
    throw new Error("The random buffer is empty.");
  }

  return value;
}
