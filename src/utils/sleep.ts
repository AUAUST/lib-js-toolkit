export function sleep(delay: number): Promise<void> {
  return new Promise((resolve) => {
    return setTimeout(resolve, delay);
  });
}
