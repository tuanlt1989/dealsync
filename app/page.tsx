"use client";

import { useEffect, useState } from "react";
import { shopeeLink } from "@/lib/affiliate";
import { feedProducts, hasRealProducts } from "@/lib/products";

type DisplayDeal = {
  id: string | number;
  name: string;
  link: string;
  emoji?: string;
  imageUrl?: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  rating: number;
  sold: number;
  stockLeft: number;
  hot?: boolean;
};

type Deal = {
  id: number;
  name: string;
  keyword: string;
  category: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  rating: number;
  sold: number;
  stockLeft: number;
  image: string;
  hot?: boolean;
};

const deals: Deal[] = [
  { id: 1, name: "iPhone 15 Pro 256GB Chính hãng VN/A", keyword: "iphone 15 pro 256gb", category: "Điện thoại", originalPrice: 28990000, salePrice: 21990000, discount: 24, rating: 4.9, sold: 1240, stockLeft: 8, image: "📱", hot: true },
  { id: 2, name: "Tai nghe Sony WH-1000XM5 Chống ồn", keyword: "sony wh-1000xm5", category: "Âm thanh", originalPrice: 8500000, salePrice: 5290000, discount: 38, rating: 4.8, sold: 3420, stockLeft: 15, image: "🎧", hot: true },
  { id: 3, name: "MacBook Air M3 13 inch 8GB/256GB", keyword: "macbook air m3", category: "Laptop", originalPrice: 32990000, salePrice: 26990000, discount: 18, rating: 4.9, sold: 890, stockLeft: 5, image: "💻" },
  { id: 4, name: "Robot hút bụi Xiaomi Vacuum S10", keyword: "robot hut bui xiaomi s10", category: "Gia dụng", originalPrice: 9900000, salePrice: 4990000, discount: 50, rating: 4.7, sold: 5680, stockLeft: 22, image: "🤖", hot: true },
  { id: 5, name: "Mặt nạ ngủ môi Laneige Set 3 món", keyword: "laneige lip mask", category: "Làm đẹp", originalPrice: 850000, salePrice: 399000, discount: 53, rating: 4.8, sold: 12400, stockLeft: 40, image: "💄", hot: true },
  { id: 6, name: "Nồi chiên không dầu Philips 6.2L", keyword: "noi chien khong dau philips", category: "Gia dụng", originalPrice: 4500000, salePrice: 2790000, discount: 38, rating: 4.6, sold: 8900, stockLeft: 30, image: "🍟" },
  { id: 7, name: "Giày Nike Air Max 270 Chính hãng", keyword: "nike air max 270", category: "Thời trang", originalPrice: 3200000, salePrice: 1499000, discount: 53, rating: 4.6, sold: 6700, stockLeft: 12, image: "👟", hot: true },
  { id: 8, name: "Đồng hồ Garmin Fenix 7 GPS", keyword: "garmin fenix 7", category: "Phụ kiện", originalPrice: 18000000, salePrice: 12990000, discount: 28, rating: 4.7, sold: 430, stockLeft: 6, image: "⌚" },
  { id: 9, name: "iPad Pro 12.9 M2 WiFi 128GB", keyword: "ipad pro 12.9 m2", category: "Máy tính bảng", originalPrice: 27990000, salePrice: 21990000, discount: 21, rating: 4.9, sold: 1100, stockLeft: 9, image: "📟" },
  { id: 10, name: "Serum SK-II Facial Treatment Essence", keyword: "sk-ii facial treatment essence", category: "Làm đẹp", originalPrice: 3200000, salePrice: 2190000, discount: 32, rating: 4.8, sold: 4500, stockLeft: 18, image: "✨" },
  { id: 11, name: "Bàn phím cơ Keychron K8 Pro", keyword: "keychron k8 pro", category: "Phụ kiện", originalPrice: 2900000, salePrice: 1990000, discount: 31, rating: 4.7, sold: 2300, stockLeft: 25, image: "⌨️" },
  { id: 12, name: "Máy lọc không khí Xiaomi 4 Pro", keyword: "may loc khong khi xiaomi 4 pro", category: "Gia dụng", originalPrice: 4990000, salePrice: 2990000, discount: 40, rating: 4.6, sold: 3100, stockLeft: 14, image: "🌬️" },
];

const categories = [
  { name: "Điện thoại", emoji: "📱", keyword: "điện thoại" },
  { name: "Laptop", emoji: "💻", keyword: "laptop" },
  { name: "Thời trang", emoji: "👗", keyword: "thời trang" },
  { name: "Làm đẹp", emoji: "💄", keyword: "mỹ phẩm" },
  { name: "Gia dụng", emoji: "🏡", keyword: "đồ gia dụng" },
  { name: "Âm thanh", emoji: "🎧", keyword: "tai nghe" },
  { name: "Phụ kiện", emoji: "⌚", keyword: "phụ kiện công nghệ" },
  { name: "Mẹ & Bé", emoji: "🍼", keyword: "đồ cho bé" },
];

function formatVND(n: number) {
  return n.toLocaleString("vi-VN") + "₫";
}

function useCountdown(targetHour = 24) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const end = new Date();
    end.setHours(end.getHours() + 6); // flash sale kết thúc sau 6h
    const tick = () => {
      const diff = Math.max(0, end.getTime() - Date.now());
      setTime({
        h: Math.floor(diff / 3.6e6),
        m: Math.floor((diff % 3.6e6) / 6e4),
        s: Math.floor((diff % 6e4) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function CountBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-white text-orange-600 font-black text-lg md:text-2xl w-10 md:w-12 h-10 md:h-12 rounded-lg flex items-center justify-center tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-white/80 text-[10px] mt-1">{label}</span>
    </div>
  );
}

// Ưu tiên hiển thị sản phẩm thật từ feed Shopee; nếu chưa import thì dùng deal mẫu.
const displayDeals: DisplayDeal[] = hasRealProducts
  ? feedProducts.map((p, i) => ({
      id: p.id,
      name: p.name,
      link: p.productUrl,
      imageUrl: p.imageUrl,
      originalPrice: p.originalPrice,
      salePrice: p.price,
      discount: p.discount,
      rating: p.rating,
      sold: p.sold,
      stockLeft: ((p.sold % 30) + 5),
      hot: i < 6 || p.discount >= 40,
    }))
  : deals.map((d) => ({
      id: d.id,
      name: d.name,
      link: shopeeLink({ keyword: d.keyword }),
      emoji: d.image,
      originalPrice: d.originalPrice,
      salePrice: d.salePrice,
      discount: d.discount,
      rating: d.rating,
      sold: d.sold,
      stockLeft: d.stockLeft,
      hot: d.hot,
    }));

export default function Home() {
  const t = useCountdown();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xl md:text-2xl font-black text-orange-500">Deal</span>
            <span className="text-xl md:text-2xl font-black text-white">Sync</span>
          </div>
          <form
            className="flex-1 max-w-md flex"
            onSubmit={(e) => {
              e.preventDefault();
              const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value;
              if (q) window.open(shopeeLink({ keyword: q }), "_blank");
            }}
          >
            <input
              name="q"
              placeholder="Tìm sản phẩm giá rẻ..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-l-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
            <button className="bg-orange-500 hover:bg-orange-400 px-4 rounded-r-full text-sm font-bold transition">🔍</button>
          </form>
          <a href="/tao-link" className="hidden md:inline text-sm text-gray-400 hover:text-orange-400 transition flex-shrink-0">🔗 Tạo link</a>
        </div>
      </nav>

      {/* Flash Sale Bar */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl">⚡</span>
            <div>
              <div className="font-black text-sm md:text-lg leading-none">FLASH SALE</div>
              <div className="text-white/80 text-[10px] md:text-xs">Kết thúc sau</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <CountBox value={t.h} label="Giờ" />
            <span className="text-white font-black">:</span>
            <CountBox value={t.m} label="Phút" />
            <span className="text-white font-black">:</span>
            <CountBox value={t.s} label="Giây" />
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-orange-950/40 py-12 md:py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent" />
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1 text-orange-400 text-xs md:text-sm font-medium mb-5">
            🔥 Hơn 1.247 deal Shopee giảm sốc hôm nay
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            Săn Deal <span className="text-orange-500">Shopee</span><br className="md:hidden" /> Rẻ Nhất Mỗi Ngày
          </h1>
          <p className="text-gray-400 text-base md:text-lg mb-7 max-w-xl mx-auto">
            Tổng hợp mã giảm giá, flash sale & sản phẩm hot nhất Shopee — tiết kiệm tới 50%.
          </p>
          <a
            href={shopeeLink({ keyword: "flash sale" })}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 px-8 py-4 rounded-full font-black text-lg transition shadow-lg shadow-orange-500/30 hover:scale-105"
          >
            🛒 Xem Deal Hot Ngay
          </a>
          <div className="flex justify-center gap-6 md:gap-10 text-center mt-8">
            {[["10K+", "Deal mỗi ngày"], ["50%", "Giảm tối đa"], ["2M+", "Lượt săn"]].map(([v, l]) => (
              <div key={l}>
                <div className="text-xl md:text-2xl font-black text-orange-400">{v}</div>
                <div className="text-gray-500 text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-lg md:text-xl font-bold mb-4">Danh mục hot 🔥</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3">
          {categories.map((c) => (
            <a
              key={c.name}
              href={shopeeLink({ keyword: c.keyword })}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-orange-500/50 rounded-2xl p-3 text-center transition group"
            >
              <div className="text-2xl md:text-3xl mb-1">{c.emoji}</div>
              <div className="text-[10px] md:text-xs font-semibold text-gray-300 group-hover:text-orange-400 transition">{c.name}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Hot Deals */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">⚡ Deal Giảm Sốc Hôm Nay</h2>
          <a href={shopeeLink({ keyword: "flash sale" })} target="_blank" rel="noopener noreferrer sponsored" className="text-orange-400 hover:text-orange-300 text-xs md:text-sm font-medium">Xem tất cả →</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {displayDeals.map((d) => {
            const link = d.link;
            const stockPct = Math.min(100, Math.round((d.stockLeft / 50) * 100));
            return (
              <a
                key={d.id}
                href={link}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="bg-gray-900 border border-gray-800 hover:border-orange-500/50 rounded-2xl overflow-hidden transition group hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 flex flex-col"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-32 md:h-40 flex items-center justify-center relative overflow-hidden">
                  {d.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={d.imageUrl} alt={d.name} loading="lazy" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl">{d.emoji}</span>
                  )}
                  {d.discount > 0 && <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-md">-{d.discount}%</span>}
                  {d.hot && <span className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">🔥 HOT</span>}
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <p className="text-xs md:text-sm font-medium text-gray-200 line-clamp-2 mb-2 group-hover:text-white transition min-h-[2.5rem]">{d.name}</p>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-orange-400 font-black text-base md:text-lg">{formatVND(d.salePrice)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="text-gray-600 line-through">{formatVND(d.originalPrice)}</span>
                    <span className="text-yellow-400">★ {d.rating}</span>
                  </div>
                  {/* stock bar urgency */}
                  <div className="mt-auto">
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-1">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: `${100 - stockPct}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 mb-2">
                      <span>Đã bán {d.sold.toLocaleString("vi-VN")}</span>
                      <span className="text-red-400">Còn {d.stockLeft}</span>
                    </div>
                    <span className="block w-full bg-orange-500 group-hover:bg-orange-400 text-white text-xs md:text-sm font-bold py-2 rounded-lg text-center transition">
                      Mua ngay →
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Trust */}
      <section className="bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[["✅", "100% link Shopee chính hãng"], ["💰", "Giá rẻ nhất, cập nhật 24/7"], ["⚡", "Flash sale mới mỗi giờ"]].map(([i, txt]) => (
            <div key={txt}>
              <div className="text-2xl md:text-3xl mb-1">{i}</div>
              <div className="text-gray-400 text-[11px] md:text-sm">{txt}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Email capture */}
      <section className="py-12 px-4">
        <div className="max-w-xl mx-auto text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-3xl p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-black mb-2">Nhận Deal Hot Qua Email 📩</h2>
          <p className="text-gray-400 text-sm mb-6">Mỗi sáng gửi bạn 10 deal giảm sốc nhất Shopee.</p>
          <form
            className="flex gap-2 max-w-sm mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Đăng ký thành công! Bạn sẽ nhận deal hot mỗi sáng 🎉");
            }}
          >
            <input type="email" required placeholder="email@cua-ban.com" className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500" />
            <button className="bg-orange-500 hover:bg-orange-400 px-5 py-3 rounded-full text-sm font-bold transition">Đăng ký</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-6 px-4 text-center text-gray-500 text-xs">
        <p className="mb-1">© 2024 DealSync — Săn deal Shopee giá rẻ.</p>
        <p>DealSync là đối tác Shopee Affiliate. Chúng tôi có thể nhận hoa hồng từ các đơn mua qua link trên trang.</p>
      </footer>
    </div>
  );
}
