# Issue workflow

## 1. Agent role on decision issues

- Concerns AUAUST/lib-js-toolkit#103 and its sub-issues, and AUAUST/lib-js-codegen#4.
- Settled in #103: answers go to the owning issue's "Settled" section, and rules are updated in one pass at the end of the migration. Branch and pull request mapping is tracked in `merge.3`. Still open: whether agents only propose on decision issues or may record decisions, and whether an issue is closed once its last question is settled.
- Outcome: the remaining workflow written in #103.
- Done when it is documented there.

## 2. Issue readiness not visible

- Blocking relations among the sub-issues of AUAUST/lib-js-toolkit#103 and AUAUST/lib-js-codegen#4 exist only in prose (for example #116 blocks #114 and #110; #110 also waits on a published codegen; #113 precedes the converters), so an agent cannot tell which issues are ready.
- Outcome: GitHub "blocked by" relations or labels, ideally from the label sync in `engrenage.2`.
- Done when every blocking relation is recorded in GitHub metadata.
