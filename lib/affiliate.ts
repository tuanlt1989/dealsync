// Shopee Affiliate ID — phần SỐ (không có tiền tố "an_").
// Link gốc của bạn: utm_source=an_17342890096  →  affiliate_id = 17342890096
export const SHOPEE_AFFILIATE_ID = "17342890096";

// sub_id để biết traffic đến từ đâu (web). Tối đa 5 phần, cách nhau bằng "-".
// {sub-publisher}-{click id}-{referral source}-{custom}-{custom}
export const DEFAULT_SUB_ID = "dealsync-web";

/**
 * Tạo link affiliate Shopee ĐÚNG CHUẨN (an_redir).
 * Format: https://s.shopee.vn/an_redir?origin_link=<encoded>&affiliate_id=...&sub_id=...
 *
 * Hỗ trợ:
 *  - url: link sản phẩm/shop Shopee thật
 *  - keyword: tạo link tìm kiếm
 *  - link đã ở dạng an_redir (từ Product Feed) → chỉ chuẩn hóa + gắn affiliate_id/sub_id
 */
export function shopeeLink(
  input: { url?: string; keyword?: string; subId?: string } = {}
): string {
  const subId = input.subId ?? DEFAULT_SUB_ID;

  let redir: string;
  if (input.url && input.url.includes("an_redir")) {
    // Link feed đã có an_redir → chuẩn hóa host về s.shopee.vn
    redir = input.url.replace(/https?:\/\/[^/]+\/an_redir/, "https://s.shopee.vn/an_redir");
  } else {
    const target =
      input.url ??
      `https://shopee.vn/search?keyword=${encodeURIComponent(input.keyword ?? "")}`;
    redir = `https://s.shopee.vn/an_redir?origin_link=${encodeURIComponent(target)}`;
  }

  if (!/[?&]affiliate_id=/.test(redir)) redir += `&affiliate_id=${SHOPEE_AFFILIATE_ID}`;
  if (!/[?&]sub_id=/.test(redir)) redir += `&sub_id=${subId}`;
  return redir;
}
