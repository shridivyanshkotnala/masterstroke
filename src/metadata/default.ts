import type { Metadata } from "next";

import { generateSEOMetadata } from "@/seo/metadata";

export const defaultMetadata: Metadata = generateSEOMetadata();
