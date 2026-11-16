---
"@auaust/toolkit": patch
---

- Return undefined instead of "" from after*, before* and between for a missing needle
- Rename afterStart to removePrefix and beforeEnd to removeSuffix
- Throw a RangeError for invalid positions
- Add afterFirst, afterLast and afterNth
- Add beforeFirst, beforeLast and beforeNth
- Add removePrefix and removeSuffix
- Add between
- Add splitFirst, splitLast and splitNth
