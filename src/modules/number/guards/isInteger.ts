export const isInteger = Number.isInteger as {
  (candidate: number): boolean;
  (candidate: unknown): candidate is number;
};
