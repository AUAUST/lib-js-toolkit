export type KeyAsString<T> = `${Extract<keyof T, string | number>}`;
