export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  tags: string[];
  reason: string;
};

export const catalog: Product[] = [
  { id: "01", name: "Relaxed Linen Blazer", brand: "Aster Studio", category: "Outerwear", price: 128, image: "/products/denim-jacket.jpg", tags: ["polished", "layering", "neutral"], reason: "The relaxed structure adds polish without feeling formal, and the warm neutral works with your low-contrast palette." },
  { id: "02", name: "Soft Form Tee", brand: "Common Thread", category: "Top", price: 42, image: "/products/white-tee.jpg", tags: ["minimal", "breathable", "versatile"], reason: "A clean neckline keeps the outfit intentional while the breathable cotton makes it practical for a full day out." },
  { id: "03", name: "Wide-Leg Utility Trouser", brand: "Northline", category: "Bottom", price: 96, image: "/products/cargo-pants.jpg", tags: ["relaxed", "utility", "travel"], reason: "The fluid wide leg balances the fitted base layer and gives you comfort for walking without losing shape." },
  { id: "04", name: "Everyday Chino", brand: "Field Notes", category: "Bottom", price: 78, image: "/products/chinos.jpg", tags: ["smart casual", "tailored", "neutral"], reason: "A tapered silhouette gives you an easy smart-casual option that stays inside budget and pairs with everything here." },
  { id: "05", name: "Cloudweight Knit", brand: "Morrow", category: "Layer", price: 84, image: "/products/hoodie.jpg", tags: ["soft", "layering", "weekend"], reason: "This adds a soft tonal layer for cooler evenings and matches the understated, texture-led direction in your profile." }
];
