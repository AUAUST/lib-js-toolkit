# CI

## 1. CI runs on Node 22

- The CI and publish workflows use `setup-node` with `node-version-file: package.json`, but `package.json` declares no Node version, so the runner falls back to Node 22. `pnpm install` then fails in `prepare`, because `engrenage sync` calls `RegExp.escape` (Node 24+).
- Outcome: add to `package.json`:

  ```json
  {
    "devEngines": {
      "runtime": {
        "name": "node",
        "version": ">=24.0.0",
        "onFail": "error"
      }
    }
  }
  ```

  Then check that `setup-node` resolves Node 24 from it. Whether `@auaust/engrenage` should declare its own Node requirement is a separate upstream point.

- Done when CI and publish runs use Node 24.
