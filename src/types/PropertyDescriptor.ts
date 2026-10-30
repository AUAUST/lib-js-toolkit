export interface PropertyDescriptor {
  configurable?: boolean | undefined;
  enumerable?: boolean | undefined;
  value?: any;
  writable?: boolean | undefined;
  get?: (() => any) | undefined;
  set?: ((value: any) => void) | undefined;
}
