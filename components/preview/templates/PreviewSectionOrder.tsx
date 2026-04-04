"use client";

import type { ReactNode } from "react";
import type { PaletteDef } from "@/lib/preview-templates/registry";

/** Swaps trust vs services order based on palette “feel” (offer-first vs trust-first). */
export function TrustAndServicesOrder({
  palette,
  trust,
  services,
}: {
  palette: PaletteDef;
  trust: ReactNode;
  services: ReactNode;
}) {
  if (palette.feel.trustBeforeServices) {
    return (
      <>
        {trust}
        {services}
      </>
    );
  }
  return (
    <>
      {services}
      {trust}
    </>
  );
}
