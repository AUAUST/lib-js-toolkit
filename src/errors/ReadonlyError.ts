import { StateError } from "#errors/StateError";

export class ReadonlyError extends StateError {
  public readonly name: string = "ReadonlyError";
}
