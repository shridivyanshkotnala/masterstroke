import type { Metadata } from "next";

export type SEOInput = {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  noIndex?: boolean;
  authors?: NonNullable<Metadata["authors"]>;
  publisher?: string;
  alternates?: Metadata["alternates"];
  openGraph?: Metadata["openGraph"];
  twitter?: Metadata["twitter"];
  icons?: Metadata["icons"];
  themeColor?: Metadata["themeColor"];
  verification?: Metadata["verification"];
  category?: string;
};
