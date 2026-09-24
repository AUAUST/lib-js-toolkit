export function logChanges(
  message: string,
  changes: {
    created?: string[];
    updated?: string[];
  },
) {
  console.info(
    message,
    "\n",
    ...(changes.created || []).map((file) => `+   ${file}\n`),
    ...(changes.updated || []).map((file) => `~   ${file}\n`),
  );
}
