# webext-url-parser

[![npm version](https://img.shields.io/npm/v/webext-url-parser)](https://npmjs.com/package/webext-url-parser)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)

> URL pattern matching and manipulation for Chrome extensions -- match patterns, domain extraction, query string parsing, and URL validation for MV3.

## Install

```bash
npm install webext-url-parser
```

## Usage

```js
import { URLParser, MatchPattern } from 'webext-url-parser';

// Parse and inspect URLs
URLParser.getDomain('https://sub.example.com/path');     // 'sub.example.com'
URLParser.getBaseDomain('https://sub.example.com/path'); // 'example.com'
URLParser.getExtension('https://example.com/file.pdf');  // 'pdf'
URLParser.isValid('https://example.com');                // true
URLParser.isChromeInternal('chrome://settings');         // true

// Query string parsing and URL building
const params = URLParser.parseQuery('https://example.com?q=hello&page=2');
// { q: 'hello', page: '2' }

const url = URLParser.buildURL('https://example.com', { q: 'search', lang: 'en' });
// 'https://example.com/?q=search&lang=en'

// Compare origins
URLParser.sameOrigin('https://example.com/a', 'https://example.com/b'); // true

// Strip tracking parameters (utm_*, fbclid, gclid, etc.)
URLParser.stripTracking('https://example.com?utm_source=twitter&page=1');
// 'https://example.com/?page=1'

// Chrome extension match patterns
MatchPattern.test('*://*.example.com/*', 'https://sub.example.com/path'); // true
MatchPattern.test('<all_urls>', 'https://example.com');                   // true
MatchPattern.testAny(['https://*.google.com/*', 'https://*.github.com/*'], url);

// Create match patterns from domains
MatchPattern.fromDomain('example.com');          // '*://*.example.com/*'
MatchPattern.fromDomain('example.com', 'https'); // 'https://*.example.com/*'

// Validate match patterns
MatchPattern.isValid('https://*.example.com/*'); // true
MatchPattern.isValid('not-a-pattern');           // false

// Built-in pattern helpers
MatchPattern.allUrls;  // '<all_urls>'
MatchPattern.allHttp;  // ['http://*/*', 'https://*/*']
MatchPattern.allHttps; // 'https://*/*'
```

## API

### `URLParser`

All methods are static.

| Method | Parameters | Return Type | Description |
|--------|-----------|-------------|-------------|
| `getDomain` | `url: string` | `string` | Extract the full hostname from a URL |
| `getBaseDomain` | `url: string` | `string` | Extract the base domain (no subdomains) |
| `parseQuery` | `url: string` | `Record<string, string>` | Parse the query string into a key-value object |
| `buildURL` | `base: string, params: Record<string, string>` | `string` | Build a URL with query parameters |
| `isValid` | `url: string` | `boolean` | Check if a string is a valid URL |
| `isChromeInternal` | `url: string` | `boolean` | Check if a URL is a Chrome internal page (`chrome://`, `chrome-extension://`, `about:`) |
| `getExtension` | `url: string` | `string` | Get the file extension from a URL path |
| `sameOrigin` | `a: string, b: string` | `boolean` | Check if two URLs share the same origin |
| `stripTracking` | `url: string` | `string` | Remove tracking parameters (`utm_*`, `fbclid`, `gclid`, `ref`, `mc_cid`, `mc_eid`) |

### `MatchPattern`

All methods are static.

| Method | Parameters | Return Type | Description |
|--------|-----------|-------------|-------------|
| `test` | `pattern: string, url: string` | `boolean` | Test if a URL matches a Chrome match pattern |
| `testAny` | `patterns: string[], url: string` | `boolean` | Test if a URL matches any pattern in the array |
| `fromDomain` | `domain: string, scheme?: string` | `string` | Generate a match pattern from a domain (default scheme: `*`) |
| `isValid` | `pattern: string` | `boolean` | Validate a Chrome match pattern string |
| `allUrls` | _(getter)_ | `string` | Returns `'<all_urls>'` |
| `allHttp` | _(getter)_ | `string[]` | Returns `['http://*/*', 'https://*/*']` |
| `allHttps` | _(getter)_ | `string` | Returns `'https://*/*'` |

## License

MIT

## See Also

### Related Zovo Repositories

- [chrome-extension-starter-mv3](https://github.com/theluckystrike/chrome-extension-starter-mv3) - Production-ready Chrome extension starter
- [awesome-chrome-extensions-dev](https://github.com/theluckystrike/awesome-chrome-extensions-dev) - Curated list of Chrome extension development resources
- [webext-privacy-guard](https://github.com/theluckystrike/webext-privacy-guard) - Privacy utilities

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions

Visit [zovo.one](https://zovo.one) for more information.
