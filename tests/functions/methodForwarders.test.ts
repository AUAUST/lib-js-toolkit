import { methodForwarders } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("methodForwarders()", () => {
  test("handles the spread call form", () => {
    const source = {
      foo(): number {
        return 1;
      },
      bar(): string {
        return "bar";
      },
    };

    const forwarders = methodForwarders(source, "foo", {
      method: "bar",
    });

    expect(forwarders).toHaveLength(2);
    expect(forwarders[0].get()()).toBe(1);
    expect(forwarders[1].get()()).toBe("bar");
  });

  test("handles the array call form", () => {
    const source = {
      foo(): number {
        return 1;
      },
      bar(): string {
        return "bar";
      },
    };

    const forwarders = methodForwarders(source, ["foo", { method: "bar" }]);

    expect(forwarders).toHaveLength(2);
    expect(forwarders[0].get()()).toBe(1);
    expect(forwarders[1].get()()).toBe("bar");
  });
});
