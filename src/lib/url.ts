export const withLeadingSlash = (value: string): string =>
  value.startsWith("/") ? value : `/${value}`;

export const stripTrailingSlash = (value: string): string =>
  value.endsWith("/") ? value.slice(0, -1) : value;

export const joinUrl = (baseUrl: string, path: string): string => {
  const normalizedBase = stripTrailingSlash(baseUrl);
  const normalizedPath = withLeadingSlash(path);
  return `${normalizedBase}${normalizedPath}`;
};
