# Issue workflow

## 1. Decision recording undefined

- Concerns AUAUST/lib-js-toolkit#103 and its sub-issues, and AUAUST/lib-js-codegen#4.
- Agents do not know how a decision is recorded (edit the issue's "Settled" section and close it, or comment), whether settling a decision also updates AGENTS.md or `.claude/rules/`, whether they propose or decide on decision issues, or whether one issue maps to one branch, pull request and changeset.
- Outcome: a decided workflow written where agents read it (AGENTS.md or the tracking issues).
- Done when the workflow is documented there.

## 2. Issue readiness not visible

- Blocking relations among the sub-issues of AUAUST/lib-js-toolkit#103 and AUAUST/lib-js-codegen#4 exist only in prose (for example #116 blocks #114 and #110; #110 also waits on a published codegen; #113 precedes the converters), so an agent cannot tell which issues are ready.
- Outcome: GitHub "blocked by" relations or labels, ideally from the label sync in `engrenage.2`.
- Done when every blocking relation is recorded in GitHub metadata.
