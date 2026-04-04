import type { CategoryId } from "@/lib/preview-types";

export type PreviewCategoryDef = {
  id: CategoryId;
  label: string;
  description: string;
};

/** Order: Products → Services → Restaurants (per product brief). */
export const previewCategories: PreviewCategoryDef[] = [
  {
    id: "products",
    label: "Products & retail",
    description: "Stores, showrooms, and businesses that sell physical goods.",
  },
  {
    id: "services",
    label: "Services & trades",
    description: "Skilled trades, professional firms, health, fitness, and more.",
  },
  {
    id: "restaurants",
    label: "Restaurants & food",
    description: "Dining, drinks, catering, and hospitality.",
  },
];
