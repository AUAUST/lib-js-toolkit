---
"@auaust/toolkit": minor
---

- Add the random module: random, insecureRandom, randomInteger, randomFloat
- Remove math.random; use random.random (secure) or random.insecureRandom
- Remove math.f16round, outside the supported runtime baseline
- Remove Symbol.dispose and Symbol.asyncDispose from ProtocolRegistry
