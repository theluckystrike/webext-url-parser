/**
 * Match Pattern — Chrome extension URL match pattern utilities
 */
export class MatchPattern {
    /** Test if URL matches a Chrome match pattern */
    static test(pattern: string, url: string): boolean {
        if (pattern === '<all_urls>') return /^(https?|ftp|file):\/\//.test(url);
        const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
        try { return new RegExp(`^${escaped}$`).test(url); } catch { return false; }
    }

    /** Test if URL matches any of the patterns */
    static testAny(patterns: string[], url: string): boolean {
        return patterns.some((p) => this.test(p, url));
    }

    /** Create a match pattern from a domain */
    static fromDomain(domain: string, scheme: string = '*'): string {
        return `${scheme}://*.${domain}/*`;
    }

    /** Get list of common match patterns */
    static get allUrls(): string { return '<all_urls>'; }
    static get allHttp(): string[] { return ['http://*/*', 'https://*/*']; }
    static get allHttps(): string { return 'https://*/*'; }

    /** Validate a match pattern */
    static isValid(pattern: string): boolean {
        if (pattern === '<all_urls>') return true;
        return /^(\*|http|https|ftp|file):\/\/(\*|(\*\.)?[^/*]+)\/(.*)?$/.test(pattern);
    }
}
