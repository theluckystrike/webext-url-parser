import { describe, it, expect } from 'vitest';
import { MatchPattern, URLParser } from './index';

describe('MatchPattern', () => {
  it('should test <all_urls>', () => {
    expect(MatchPattern.test('<all_urls>', 'https://google.com')).toBe(true);
    expect(MatchPattern.test('<all_urls>', 'http://example.org')).toBe(true);
  });

  it('should test specific patterns', () => {
    expect(MatchPattern.test('https://*.google.com/*', 'https://mail.google.com/mail')).toBe(true);
    expect(MatchPattern.test('https://*.google.com/*', 'https://google.com/')).toBe(false);
  });

  it('should test testAny', () => {
    const patterns = ['https://*.google.com/*', 'http://example.org/*'];
    expect(MatchPattern.testAny(patterns, 'http://example.org/test')).toBe(true);
    expect(MatchPattern.testAny(patterns, 'https://bing.com')).toBe(false);
  });

  it('should create fromDomain', () => {
    expect(MatchPattern.fromDomain('google.com')).toBe('*://*.google.com/*');
    expect(MatchPattern.fromDomain('google.com', 'https')).toBe('https://*.google.com/*');
  });

  it('should validate patterns', () => {
    expect(MatchPattern.isValid('<all_urls>')).toBe(true);
    expect(MatchPattern.isValid('https://*.google.com/*')).toBe(true);
    expect(MatchPattern.isValid('invalid-pattern')).toBe(false);
  });
});

describe('URLParser', () => {
  it('should get domain and base domain', () => {
    const url = 'https://sub.google.com/path';
    expect(URLParser.getDomain(url)).toBe('sub.google.com');
    expect(URLParser.getBaseDomain(url)).toBe('google.com');
  });

  it('should parse query params', () => {
    const url = 'https://example.com/?a=1&b=2';
    expect(URLParser.parseQuery(url)).toEqual({ a: '1', b: '2' });
  });

  it('should build URL with params', () => {
    const base = 'https://example.com/';
    const params = { q: 'search', page: '1' };
    expect(URLParser.buildURL(base, params)).toBe('https://example.com/?q=search&page=1');
  });

  it('should check if valid', () => {
    expect(URLParser.isValid('https://google.com')).toBe(true);
    expect(URLParser.isValid('not-a-url')).toBe(false);
  });

  it('should check for chrome internal pages', () => {
    expect(URLParser.isChromeInternal('chrome://extensions')).toBe(true);
    expect(URLParser.isChromeInternal('https://google.com')).toBe(false);
  });

  it('should get file extension', () => {
    expect(URLParser.getExtension('https://example.com/file.PDF')).toBe('pdf');
    expect(URLParser.getExtension('https://example.com/noext')).toBe('');
  });

  it('should strip tracking params', () => {
    const url = 'https://example.com/?utm_source=news&id=123&fbclid=abc';
    const stripped = URLParser.stripTracking(url);
    expect(stripped).toContain('id=123');
    expect(stripped).not.toContain('utm_source');
    expect(stripped).not.toContain('fbclid');
  });
});
