/**
 * Fixing the issue when using in package.json
 *
 *   "dependencies": {
 *     "@ic3/reporting-api": "file:../../ic3-reporting-api",
 *   },
 *
 */
declare namespace React {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        class?: string;
    }
}