import { StateError } from "./StateError";

export class ReadonlyError extends StateError {
  public readonly name: string = "ReadonlyError";
}
