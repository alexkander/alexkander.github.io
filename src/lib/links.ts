/** Paths of this domain served by other repositories (docs/content.md → Reserved paths). */
export const demoPaths = ['/eclipse-weather/'];

const isDemo = (pathname: string) => demoPaths.some((path) => `${pathname}/`.startsWith(path));

/**
 * The attributes of a link that leaves this site: another site, or a demo of this domain (docs/content.md → Links).
 * Returns undefined for the pages of this site and for other protocols, such as `mailto:`.
 */
export function leavingLink(href: string, site: URL): { target: '_blank'; rel: string } | undefined {
  const url = new URL(href, site);
  if (!url.protocol.startsWith('http')) return undefined;
  if (url.hostname !== site.hostname) return { target: '_blank', rel: 'noopener noreferrer' };
  return isDemo(url.pathname) ? { target: '_blank', rel: 'noopener' } : undefined;
}
