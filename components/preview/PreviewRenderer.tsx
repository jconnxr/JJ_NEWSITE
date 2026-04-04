"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import type { PreviewConfig } from "@/lib/preview-types";
import { getPalette } from "@/lib/preview-templates/registry";
import { PreviewInteractProvider } from "./PreviewInteractContext";

const RestaurantPreview = dynamic(
  () => import("./templates/RestaurantPreview").then((m) => ({ default: m.RestaurantPreview })),
  { loading: () => <PreviewSkeleton /> },
);
const DentalPreview = dynamic(
  () => import("./templates/DentalPreview").then((m) => ({ default: m.DentalPreview })),
  { loading: () => <PreviewSkeleton /> },
);
const HvacPreview = dynamic(
  () => import("./templates/HvacPreview").then((m) => ({ default: m.HvacPreview })),
  { loading: () => <PreviewSkeleton /> },
);
const RetailPreview = dynamic(
  () => import("./templates/RetailPreview").then((m) => ({ default: m.RetailPreview })),
  { loading: () => <PreviewSkeleton /> },
);
const ProfessionalPreview = dynamic(
  () => import("./templates/ProfessionalPreview").then((m) => ({ default: m.ProfessionalPreview })),
  { loading: () => <PreviewSkeleton /> },
);

function PreviewSkeleton() {
  return (
    <div className="flex min-h-[400px] animate-pulse items-center justify-center bg-slate-100 text-sm text-slate-400">
      Loading preview…
    </div>
  );
}

type Props = {
  config: PreviewConfig;
};

export function PreviewRenderer({ config }: Props) {
  const palette = getPalette(config.paletteId);
  if (!config.templateId) return <PreviewSkeleton />;

  let preview: ReactNode;
  switch (config.templateId) {
    case "restaurant":
      preview = <RestaurantPreview config={config} palette={palette} />;
      break;
    case "dental":
      preview = <DentalPreview config={config} palette={palette} />;
      break;
    case "hvac":
      preview = <HvacPreview config={config} palette={palette} />;
      break;
    case "retail":
      preview = <RetailPreview config={config} palette={palette} />;
      break;
    case "professional":
      preview = <ProfessionalPreview config={config} palette={palette} />;
      break;
    default:
      preview = <PreviewSkeleton />;
  }

  return <PreviewInteractProvider phone={config.phone ?? ""}>{preview}</PreviewInteractProvider>;
}
