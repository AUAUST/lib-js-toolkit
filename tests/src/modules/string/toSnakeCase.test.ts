import { describe, expect, expectTypeOf, test } from "vitest";

import { snake, toSnakeCase } from "@auaust/toolkit/string";

describe("toSnakeCase", () => {
  test("joins lowercased words with underscores", () => {
    expect(toSnakeCase("helloWorld2")).toBe("hello_world_2");
    expect(snake).toBe(toSnakeCase);
  });

  test("keeps literal types", () => {
    expect(toSnakeCase("XMLHttpRequest")).toBe("xml_http_request");

    expectTypeOf(
      toSnakeCase("XMLHttpRequest"),
    ).toEqualTypeOf<"xml_http_request">();

    expectTypeOf(toSnakeCase("v2Api")).toEqualTypeOf<"v_2_api">();

    expectTypeOf(toSnakeCase("a b" as "a b" | "C")).toEqualTypeOf<
      "a_b" | "c"
    >();

    expectTypeOf(toSnakeCase("a" as string)).toEqualTypeOf<string>();
    expectTypeOf(toSnakeCase("café")).toEqualTypeOf<string>();

    expectTypeOf(
      toSnakeCase("a b", { unaccent: true }),
    ).toEqualTypeOf<string>();
  });

  test("accepts the locale alone", () => {
    expect(toSnakeCase("I a", "tr")).toBe("ı_a");
    expect(toSnakeCase("I a", "tr")).toBe(toSnakeCase("I a", { locale: "tr" }));
    expectTypeOf(toSnakeCase("I a", "tr")).toEqualTypeOf<string>();
  });
});
