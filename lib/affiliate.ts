// Paste your affiliate IDs here after registering
export const AFFILIATE_IDS = {
  shopee: "",    // e.g. "tuanlt1989" from affiliate.shopee.vn
  lazada: "",    // e.g. "tuanlt1989" from affiliate.lazada.vn
  amazon: "",    // e.g. "tuanlt-20" from Amazon Associates
};

export function buildAffiliateLink(store: string, productUrl: string): string {
  switch (store) {
    case "Shopee":
      return AFFILIATE_IDS.shopee
        ? `https://s.shopee.vn/AffiliateLink?affiliate_id=${AFFILIATE_IDS.shopee}&url=${encodeURIComponent(productUrl)}`
        : productUrl;
    case "Lazada":
      return AFFILIATE_IDS.lazada
        ? `https://www.lazada.vn/products/?aff_id=${AFFILIATE_IDS.lazada}&url=${encodeURIComponent(productUrl)}`
        : productUrl;
    case "Amazon":
      return AFFILIATE_IDS.amazon
        ? productUrl.includes("?") ? `${productUrl}&tag=${AFFILIATE_IDS.amazon}` : `${productUrl}?tag=${AFFILIATE_IDS.amazon}`
        : productUrl;
    default:
      return productUrl;
  }
}
