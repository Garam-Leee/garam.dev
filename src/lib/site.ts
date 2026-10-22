export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://garam-dev.vercel.app");
export const siteName = "Garam Lee Portfolio";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
