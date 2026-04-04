import type { PaletteDef, ServicePresentation } from "@/lib/preview-templates/registry";

export function resolveServiceVariant(
  palette: PaletteDef,
  templateDefault: ServicePresentation,
): ServicePresentation {
  return palette.feel.servicePresentation ?? templateDefault;
}
