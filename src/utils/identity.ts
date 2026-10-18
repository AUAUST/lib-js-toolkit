export function identity(): undefined;
export function identity<T>(value: T): T;
export function identity<T>(value: T, ...ignored: any[]): T;
export function identity(value?: any): any {
  return value;
}
