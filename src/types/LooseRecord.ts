export type LooseRecord<Target> = Record<
  | (Extract<keyof Target, string | number> extends never ? never : string)
  | (Extract<keyof Target, symbol> extends never ? never : symbol),
  Target[keyof Target]
>;
