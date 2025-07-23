// components/ThemeProviderWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

export function ThemeProviderWrapper({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevents mismatches during SSR
    return null;
  }

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
