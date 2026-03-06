# webext-url-parser

URL pattern matching and manipulation for Chrome extensions. Covers match patterns, domain extraction, query string parsing, and URL validation for Manifest V3.

Built for use inside service workers, content scripts, and popups where you need lightweight URL helpers without pulling in a full routing library.


INSTALL

```
npm install webext-url-parser
```


USAGE

```js
import { URLParser, MatchPattern } from 'webext-url-parser';
```


URL PARSING

```js
URLParser.getDomain('https://sub.example.com/path');
// 'sub.example.com'

URLParser.getBaseDomain('https://sub.example.com/path');
// 'example.com'

URLParser.getExtension('https://example.com/file.pdf');
// 'pdf'

URLParser.isValid('https://example.com');
// true

URLParser.isChromeInternal('chrome://settings');
// true
```


QUERY STRINGS

```js
URLParser.parseQuery('https://example.com?q=hello&page=2');
// { q: 'hello', page: '2' }

URLParser.buildURL('https://example.com', { q: 'search', lang: 'en' });
// 'https://example.com/?q=search&lang=en'
```


ORIGIN COMPARISON

```js
URLParser.sameOrigin('https://example.com/a', 'https://example.com/b');
// true
```


STRIP TRACKING PARAMETERS

Removes utm_source, utm_medium, utm_campaign, utm_term, utm_content, fbclid, gclid, ref, mc_cid, and mc_eid from any URL.

```js
URLParser.stripTracking('https://example.com?utm_source=twitter&page=1');
// 'https://example.com/?page=1'
```


MATCH PATTERNS

Chrome extension match pattern helpers that follow the format documented at
https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns

```js
MatchPattern.test('*://*.example.com/*', 'https://sub.example.com/path');
// true

MatchPattern.test('<all_urls>', 'https://example.com');
// true

MatchPattern.testAny(['https://*.google.com/*', 'https://*.github.com/*'], url);
// true if url matches either pattern

MatchPattern.fromDomain('example.com');
// '*://*.example.com/*'

MatchPattern.fromDomain('example.com', 'https');
// 'https://*.example.com/*'

MatchPattern.isValid('https://*.example.com/*');
// true

MatchPattern.allUrls;
// '<all_urls>'

MatchPattern.allHttp;
// ['http://*/*', 'https://*/*']

MatchPattern.allHttps;
// 'https://*/*'
```


API REFERENCE

URLParser (all static methods)

- getDomain(url) returns the full hostname from a URL string. Returns empty string on invalid input.
- getBaseDomain(url) returns the registrable domain without subdomains. "sub.example.com" becomes "example.com".
- parseQuery(url) returns a plain object of key/value pairs from the query string. Returns empty object on invalid input.
- buildURL(base, params) takes a base URL string and a Record<string, string> of query params, returns the assembled URL.
- isValid(url) returns true if the string can be parsed by the URL constructor.
- isChromeInternal(url) returns true for chrome://, chrome-extension://, and about: URLs.
- getExtension(url) returns the file extension from the URL pathname, lowercased. Returns empty string if none.
- sameOrigin(a, b) returns true if both URLs share the same origin (scheme + host + port).
- stripTracking(url) returns a cleaned URL with common tracking parameters removed.

MatchPattern (all static methods and getters)

- test(pattern, url) returns true if the URL matches the given Chrome match pattern.
- testAny(patterns, url) returns true if the URL matches any pattern in the array.
- fromDomain(domain, scheme?) returns a match pattern string. Scheme defaults to "*".
- isValid(pattern) returns true if the string is a syntactically valid Chrome match pattern.
- allUrls (getter) returns the string "<all_urls>".
- allHttp (getter) returns ["http://*/*", "https://*/*"].
- allHttps (getter) returns "https://*/*".


LICENSE

MIT. See LICENSE file.


---

Part of the Zovo open source family at https://zovo.one
