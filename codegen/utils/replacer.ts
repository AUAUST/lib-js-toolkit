export function replacer(placeholders: Record<string, string>) {
  const expressions = Object.entries(placeholders).map(
    ([key, value]) =>
      [new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g"), value] as const,
  );

  return (content: string) => {
    let result = content;

    for (const [regex, value] of expressions) {
      result = result.replace(regex, value);
    }

    return result;
  };
}
