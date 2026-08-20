import type { Metadata } from "next";

import { seoDefaults } from "@/seo/config";

export const buildRobots = (noIndex: boolean = false): NonNullable<Metadata["robots"]> => {
  if (noIndex) {
    return {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    };
  }

  return seoDefaults.robots;
};
