/**
 * Resolved limits and render state of one `inspect` call.
 */
export interface InspectContext {
  readonly depth: number;
  readonly maxItems: number;
  readonly maxStringLength: number;
  readonly seen: Set<object>;
  render(value: unknown, level: number): string;
}
