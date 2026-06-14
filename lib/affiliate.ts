// Shopee Affiliate ID — lấy từ affiliate.shopee.vn (mmp_pid / utm_source)
export const SHOPEE_AFFILIATE_ID = "an_17342890096";

// Tạo link Shopee có gắn affiliate tracking.
// Hỗ trợ cả link sản phẩm thật lẫn link tìm kiếm theo keyword.
export function shopeeLink(input: { url?: string; keyword?: string }): string {
  const base =
    input.url ??
    `https://shopee.vn/search?keyword=${encodeURIComponent(input.keyword ?? "")}`;

  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}mmp_pid=${SHOPEE_AFFILIATE_ID}&utm_source=${SHOPEE_AFFILIATE_ID}&utm_medium=affiliates&utm_campaign=dealsync`;
}
