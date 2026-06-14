import feed from "@/data/products.json";
import { shopeeLink } from "@/lib/affiliate";

export type Product = {
  id: string;
  name: string;
  imageUrl?: string;
  productUrl: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  sold: number;
  commissionRate?: number;
  category?: string;
};

// Sản phẩm thật từ feed Shopee (chạy `npm run import-feed <file.csv>` để cập nhật)
export const feedProducts: Product[] = (feed as Product[]).map((p) => ({
  ...p,
  // luôn đảm bảo link có gắn affiliate tracking
  productUrl: shopeeLink({ url: p.productUrl }),
}));

export const hasRealProducts = feedProducts.length > 0;
