export const SITE_URL = "https://story-blueprint-co.lovable.app";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export function canonical(path: string) {
  return [{ rel: "canonical", href: `${SITE_URL}${path}` }];
}

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}
