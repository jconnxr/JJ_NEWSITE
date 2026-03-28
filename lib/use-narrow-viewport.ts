"use client";

import { useLayoutEffect, useState } from "react";

/** Matches Tailwind `md` (768px): true when viewport is 767px or below. */
const QUERY = "(max-width: 767px)";

/**
 * Starts false so SSR + first client render match (avoids hydration issues with motion trees).
 * Updates in useLayoutEffect before paint so phones pick up the “lite” path immediately after hydration.
 */
export function useNarrowViewport() {
  const [narrow, setNarrow] = useState(false);

  useLayoutEffect(() => {
    const mql = window.matchMedia(QUERY);
    const update = () => setNarrow(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return narrow;
}
