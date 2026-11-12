export const isSafeInteger = Number.isSafeInteger as {
  (candidate: number): boolean;
  (candidate: unknown): candidate is number;
};
