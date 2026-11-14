import type { TagDeclaration } from "@auaust/engrenage/docs";

/**
 * Builds a tag body schema accepting the bodies `pattern` matches whole and
 * returning them unchanged, reporting `expected` otherwise.
 */
export function createPatternSchema(
  pattern: RegExp,
  expected: string,
): NonNullable<TagDeclaration["schema"]> {
  return {
    "~standard": {
      version: 1,
      vendor: "toolkit",
      validate(value) {
        if (typeof value === "string" && pattern.test(value)) {
          return { value };
        }

        return { issues: [{ message: `Expected ${expected}.` }] };
      },
    },
  };
}
