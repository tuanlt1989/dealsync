#!/usr/bin/env node
/**
 * Chuyển Product Feed Shopee (CSV) → data/products.json
 *
 * Cách dùng:
 *   npm run import-feed ./shopee-feed.csv
 *   npm run import-feed ./shopee-feed.csv 60      (lấy tối đa 60 sản phẩm)
 *
 * Tải file feed tại: Shopee Affiliate Dashboard → Creative → Product Feed
 * Script tự nhận diện tên cột phổ biến của Shopee.
 */
import fs from "node:fs";
import path from "node:path";

const [, , filePath, limitArg] = process.argv;
const LIMIT = Number(limitArg) || 50;

if (!filePath) {
  console.error("❌ Thiếu đường dẫn file. VD: npm run import-feed ./shopee-feed.csv");
  process.exit(1);
}

const raw = fs.readFileSync(filePath, "utf8");

// --- parse CSV đơn giản, hỗ trợ field có dấu phẩy trong ngoặc kép ---
function parseCSV(text) {
  const rows = [];
  let row = [], field = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], next = text[i + 1];
    if (inQuotes) {
      if (c === '"' && next === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n" || c === "\r") {
        if (field !== "" || row.length) { row.push(field); rows.push(row); row = []; field = ""; }
        if (c === "\r" && next === "\n") i++;
      } else field += c;
    }
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const rows = parseCSV(raw).filter((r) => r.length > 1);
const header = rows[0].map((h) => h.trim().toLowerCase());

// map linh hoạt tên cột Shopee (tên cột có thể đổi tùy phiên bản feed)
const find = (...cands) => {
  for (const c of cands) {
    const idx = header.findIndex((h) => h === c || h.includes(c));
    if (idx !== -1) return idx;
  }
  return -1;
};

const COL = {
  id: find("itemid", "item_id", "id", "product_id"),
  name: find("productname", "product_name", "item_name", "title", "name"),
  image: find("imagelink", "image_link", "image", "imageurl", "image_url"),
  price: find("price", "saleprice", "sale_price", "price_min", "pricemin"),
  original: find("priceoriginal", "price_before", "original_price", "list_price"),
  discount: find("discount", "pricediscountrate", "price_discount_rate", "discount_rate"),
  rating: find("ratingstar", "rating_star", "rating", "ratingstars"),
  sold: find("sales", "sold", "historical_sold", "global_sold"),
  link: find("offerlink", "offer_link", "productlink", "product_link", "url", "link"),
  commission: find("commissionrate", "commission_rate", "commission"),
  category: find("category", "categoryname", "category_name"),
};

const num = (v) => {
  if (v == null) return 0;
  const n = parseFloat(String(v).replace(/[^\d.]/g, ""));
  return isNaN(n) ? 0 : n;
};

const products = rows.slice(1).map((r, i) => {
  const price = num(r[COL.price]);
  let original = num(r[COL.original]);
  let discount = num(r[COL.discount]);
  if (!original && discount && price) original = Math.round(price / (1 - discount / 100));
  if (!discount && original && price && original > price) discount = Math.round((1 - price / original) * 100);

  return {
    id: String(r[COL.id] ?? i),
    name: (r[COL.name] ?? "Sản phẩm Shopee").trim(),
    imageUrl: COL.image !== -1 ? (r[COL.image] ?? "").trim() : undefined,
    productUrl: (r[COL.link] ?? "https://shopee.vn").trim(),
    price,
    originalPrice: original || price,
    discount: discount || 0,
    rating: Math.min(5, num(r[COL.rating])) || 4.8,
    sold: num(r[COL.sold]),
    commissionRate: COL.commission !== -1 ? num(r[COL.commission]) : undefined,
    category: COL.category !== -1 ? (r[COL.category] ?? "").trim() : undefined,
  };
})
  .filter((p) => p.name && p.productUrl)
  // ưu tiên giảm giá sâu + bán chạy
  .sort((a, b) => (b.discount * 100 + Math.log10(b.sold + 1)) - (a.discount * 100 + Math.log10(a.sold + 1)))
  .slice(0, LIMIT);

const out = path.join(process.cwd(), "data", "products.json");
fs.writeFileSync(out, JSON.stringify(products, null, 2));
console.log(`✅ Đã import ${products.length} sản phẩm → data/products.json`);
console.log(`   Cột nhận diện được:`, Object.fromEntries(Object.entries(COL).filter(([, v]) => v !== -1).map(([k, v]) => [k, header[v]])));
console.log(`\n👉 Bước tiếp: git add -A && git commit -m "update products" && git push`);
