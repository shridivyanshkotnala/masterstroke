export const toJsonLd = <T extends Record<string, unknown>>(schema: T): string =>
  JSON.stringify(schema, null, 0);
