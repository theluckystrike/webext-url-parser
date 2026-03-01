# webext-url-parser — URL Utilities for Extensions
> **Built by [Zovo](https://zovo.one)** | `npm i webext-url-parser`

Domain extraction, match patterns, query parsing, tracking param removal, and URL validation.

```typescript
import { URLParser, MatchPattern } from 'webext-url-parser';
const clean = URLParser.stripTracking(url);
const matches = MatchPattern.test('*://*.github.com/*', url);
```
MIT License
