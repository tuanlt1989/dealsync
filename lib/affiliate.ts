// Paste your affiliate IDs here after registering
export const AFFILIATE_IDS = {
  shopee: "an_17342890096",
  lazada: "",    // e.g. "tuanlt1989" from affiliate.lazada.vn
  amazon: "",    // e.g. "tuanlt-20" from Amazon Associates
};

export function buildAffiliateLink(store: string, productUrl: string): string {
  switch (store) {
    case "Shopee":
      return AFFILIATE_IDS.shopee
        ? `${productUrl}&mmp_pid=${AFFILIATE_IDS.shopee}&utm_source=${AFFILIATE_IDS.shopee}&utm_medium=affiliates`
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
