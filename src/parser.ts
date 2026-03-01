/**
 * URL Parser — URL manipulation utilities for extensions
 */
export class URLParser {
    /** Extract domain from URL */
    static getDomain(url: string): string {
        try { return new URL(url).hostname; } catch { return ''; }
    }

    /** Extract base domain (no subdomain) */
    static getBaseDomain(url: string): string {
        const host = this.getDomain(url);
        const parts = host.split('.');
        return parts.length > 2 ? parts.slice(-2).join('.') : host;
    }

    /** Parse query string to object */
    static parseQuery(url: string): Record<string, string> {
        try {
            const params = new URL(url).searchParams;
            const result: Record<string, string> = {};
            params.forEach((v, k) => { result[k] = v; });
            return result;
        } catch { return {}; }
    }

    /** Build URL with query params */
    static buildURL(base: string, params: Record<string, string>): string {
        const url = new URL(base);
        Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
        return url.toString();
    }

    /** Check if URL is valid */
    static isValid(url: string): boolean { try { new URL(url); return true; } catch { return false; } }

    /** Check if URL is a Chrome internal page */
    static isChromeInternal(url: string): boolean { return url.startsWith('chrome://') || url.startsWith('chrome-extension://') || url.startsWith('about:'); }

    /** Get file extension from URL */
    static getExtension(url: string): string {
        try { const path = new URL(url).pathname; const dot = path.lastIndexOf('.'); return dot >= 0 ? path.slice(dot + 1).toLowerCase() : ''; } catch { return ''; }
    }

    /** Compare if two URLs have the same origin */
    static sameOrigin(a: string, b: string): boolean {
        try { return new URL(a).origin === new URL(b).origin; } catch { return false; }
    }

    /** Strip tracking params (utm_, fbclid, etc.) */
    static stripTracking(url: string): string {
        try {
            const u = new URL(url);
            const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid', 'ref', 'mc_cid', 'mc_eid'];
            trackingParams.forEach((p) => u.searchParams.delete(p));
            return u.toString();
        } catch { return url; }
    }
}
