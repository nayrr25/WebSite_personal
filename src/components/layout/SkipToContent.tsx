"use client";

import { useT } from "@/lib/i18n";

export default function SkipToContent() {
  const t = useT();
  return (
    <a
      href="#main"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-white focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-navy"
    >
      {t.skipToContent}
    </a>
  );
}
