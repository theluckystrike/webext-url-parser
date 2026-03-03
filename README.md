# webext-url-parser — URL Utilities for Extensions

[![npm version](https://img.shields.io/npm/v/webext-url-parser)](https://npmjs.com/package/webext-url-parser)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/webext-url-parser/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-url-parser/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/webext-url-parser?style=social)](https://github.com/theluckystrike/webext-url-parser)

> Domain extraction, match patterns, query parsing, tracking param removal, and URL validation.

**webext-url-parser** provides comprehensive URL utilities for Chrome extensions. Extract domains, match patterns, parse queries, remove tracking parameters, and validate URLs — all with a simple, type-safe API.

Part of the [Zovo](https://zovo.one) developer tools family.

## Features

- ✅ **Domain Extraction** - Get domain, subdomain, TLD
- ✅ **Match Patterns** - Test URLs against Chrome patterns
- ✅ **Query Parsing** - Parse and manipulate query parameters
- ✅ **Tracking Removal** - Strip common tracking parameters
- ✅ **URL Validation** - Validate URL format and structure
- ✅ **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install webext-url-parser
```

## Quick Start

```typescript
import { URLParser, MatchPattern } from 'webext-url-parser';

// Strip tracking parameters
const clean = URLParser.stripTracking(url);

// Test URL against pattern
const matches = MatchPattern.test('*://*.github.com/*', url);
```

## Usage Examples

### Domain Extraction

```typescript
const parser = new URLParser('https://subdomain.example.com/path?query=1');

console.log(parser.hostname);   // 'subdomain.example.com'
console.log(parser.domain);     // 'example.com'
console.log(parser.subdomain); // 'subdomain'
console.log(parser.tld);       // 'com'
console.log(parser.pathname);  // '/path'
```

### Query Parameters

```typescript
const parser = new URLParser('https://example.com?page=1&sort=asc');

// Get query params
console.log(parser.query.page);  // '1'

// Set query params
parser.query.set('page', '2');
console.log(parser.toString()); // 'https://example.com?page=2&sort=asc'

// Delete params
parser.query.delete('sort');
```

### Tracking Removal

```typescript
// Strip common tracking parameters
const url = 'https://shop.com/product?utm_source=google&fbclid=abc123&gclid=xyz';
const clean = URLParser.stripTracking(url);
// Output: 'https://shop.com/product'

// Custom tracking params
const custom = URLParser.stripTracking(url, {
  params: ['ref', 'source', 'affiliate']
});
```

### Match Patterns

```typescript
// Test against Chrome match pattern
MatchPattern.test('*://*.google.com/*', 'https://mail.google.com');
// Output: true

MatchPattern.test('https://*.github.com/*', 'https://github.com');
// Output: true

// Get matching pattern
const pattern = MatchPattern.find(['*://*.google.com/*', 'https://github.com/*'], url);
```

### URL Validation

```typescript
// Validate URL format
URLParser.isValid('https://example.com');  // true
URLParser.isValid('not-a-url');            // false

// Validate against pattern
URLParser.isValidPattern('*://*.google.com/*');  // true
URLParser.isValidPattern('invalid-pattern');      // false
```

## API

### URLParser Class

| Method | Description |
|--------|-------------|
| `new URLParser(url)` | Create parser from URL string |
| `parser.hostname` | Get hostname |
| `parser.domain` | Get base domain |
| `parser.subdomain` | Get subdomain |
| `parser.tld` | Get top-level domain |
| `parser.query` | Access query parameters |
| `parser.toString()` | Get full URL string |

### Static Methods

| Method | Description |
|--------|-------------|
| `URLParser.stripTracking(url, options?)` | Remove tracking params |
| `URLParser.isValid(url)` | Validate URL format |
| `URLParser.isValidPattern(pattern)` | Validate match pattern |

### MatchPattern Class

| Method | Description |
|--------|-------------|
| `MatchPattern.test(pattern, url)` | Test URL against pattern |
| `MatchPattern.find(patterns, url)` | Find matching pattern |

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/url-feature`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/url-feature`
7. **Submit** a Pull Request

## Built by Zovo

Part of the [Zovo](https://zovo.one) developer tools family — privacy-first Chrome extensions built by developers, for developers.

## See Also

### Related Zovo Repositories

- [webext-privacy-guard](https://github.com/theluckystrike/webext-privacy-guard) - Privacy utilities
- [chrome-network-monitor](https://github.com/theluckystrike/chrome-network-monitor) - Network monitoring
- [chrome-extension-starter-mv3](https://github.com/theluckystrike/chrome-extension-starter-mv3) - Extension template

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions
- [Zovo Permissions Scanner](https://chrome.google.com/webstore/detail/zovo-permissions-scanner) - Check extension privacy grades

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT — [Zovo](https://zovo.one)

---

*Built by developers, for developers. No compromises on privacy.*
