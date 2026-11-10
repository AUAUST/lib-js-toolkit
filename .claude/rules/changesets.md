---
paths:
  - .changeset/**
---

<!-- @reference @auaust/engrenage/agents/rules/changesets.md -->

# Changesets

## Not checked by tools

- Never create a major changeset without the user's explicit decision.
- While a package is below `1.0.0`, breaking changes take a minor bump and everything else a patch.
- Write the summary as a concise list of imperative lines (`- Fix x`, `- Add y`), one per user-facing change, without prose or implementation detail.

<!-- @end -->
