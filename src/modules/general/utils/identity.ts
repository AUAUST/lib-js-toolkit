export function identity(): undefined;
export function identity<const T>(value: T, ...ignored: any[]): T;
export function identity(value?: any): any {
  return value;
}
