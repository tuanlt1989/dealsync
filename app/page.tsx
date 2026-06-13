const deals = [
  { id: 1, name: "iPhone 15 Pro 256GB", store: "Shopee", category: "Electronics", originalPrice: 28990000, salePrice: 21990000, discount: 24, rating: 4.8, image: "📱" },
  { id: 2, name: "Nike Air Max 270", store: "Lazada", category: "Fashion", originalPrice: 3200000, salePrice: 1499000, discount: 53, rating: 4.6, image: "👟" },
  { id: 3, name: "Dyson V15 Detect", store: "Amazon", category: "Home", originalPrice: 14000000, salePrice: 8990000, discount: 36, rating: 4.9, image: "🌀" },
  { id: 4, name: "MacBook Air M3", store: "Shopee", category: "Electronics", originalPrice: 32990000, salePrice: 26990000, discount: 18, rating: 4.9, image: "💻" },
  { id: 5, name: "Laneige Lip Mask Set", store: "Lazada", category: "Beauty", originalPrice: 850000, salePrice: 399000, discount: 53, rating: 4.7, image: "💄" },
  { id: 6, name: "Sony WH-1000XM5", store: "Amazon", category: "Electronics", originalPrice: 8500000, salePrice: 5290000, discount: 38, rating: 4.8, image: "🎧" },
  { id: 7, name: "Instant Pot Duo 7-in-1", store: "Shopee", category: "Home", originalPrice: 2900000, salePrice: 1590000, discount: 45, rating: 4.7, image: "🍲" },
  { id: 8, name: "Adidas Ultraboost 23", store: "Lazada", category: "Sports", originalPrice: 4200000, salePrice: 2100000, discount: 50, rating: 4.5, image: "🏃" },
  { id: 9, name: "iPad Pro 12.9\" M2", store: "Amazon", category: "Electronics", originalPrice: 27990000, salePrice: 21990000, discount: 21, rating: 4.9, image: "📟" },
  { id: 10, name: "SK-II Facial Treatment", store: "Shopee", category: "Beauty", originalPrice: 3200000, salePrice: 2190000, discount: 32, rating: 4.8, image: "✨" },
  { id: 11, name: "Philips Air Fryer XXL", store: "Lazada", category: "Home", originalPrice: 4500000, salePrice: 2790000, discount: 38, rating: 4.6, image: "🍟" },
  { id: 12, name: "Garmin Fenix 7", store: "Amazon", category: "Sports", originalPrice: 18000000, salePrice: 12990000, discount: 28, rating: 4.7, image: "⌚" },
];

const categories = [
  { name: "Electronics", emoji: "📱", count: 2840 },
  { name: "Fashion", emoji: "👗", count: 5120 },
  { name: "Home & Garden", emoji: "🏡", count: 3210 },
  { name: "Beauty", emoji: "💄", count: 1980 },
  { name: "Sports", emoji: "⚽", count: 1540 },
  { name: "Books", emoji: "📚", count: 892 },
  { name: "Toys", emoji: "🧸", count: 670 },
  { name: "Automotive", emoji: "🚗", count: 430 },
];

const storeColors: Record<string, string> = {
  Shopee: "bg-orange-500",
  Lazada: "bg-purple-600",
  Amazon: "bg-yellow-500",
};

function formatVND(n: number) {
  return n.toLocaleString("vi-VN") + "₫";
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-orange-500">Deal</span>
            <span className="text-2xl font-black text-white">Sync</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-orange-400 transition">Hot Deals</a>
            <a href="#" className="hover:text-orange-400 transition">Categories</a>
            <a href="#" className="hover:text-orange-400 transition">Stores</a>
            <a href="#" className="hover:text-orange-400 transition">Alerts</a>
          </div>
          <button className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-4 py-2 rounded-full transition">
            🔔 Get Alerts
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-orange-950 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1 text-orange-400 text-sm font-medium mb-6">
            🔥 1,247 new deals added today
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Never Miss a
            <span className="text-orange-500"> Deal</span> Again
          </h1>
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
            We track millions of products across Shopee, Lazada & Amazon — so you always get the best price.
          </p>
          <div className="flex max-w-xl mx-auto gap-2 mb-10">
            <input
              type="text"
              placeholder="Search deals, products, brands..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
            />
            <button className="bg-orange-500 hover:bg-orange-400 px-6 py-4 rounded-xl font-bold transition">
              Search
            </button>
          </div>
          <div className="flex justify-center gap-10 text-center">
            {[["10K+", "Active Deals"], ["50+", "Stores"], ["2M+", "Users"], ["Avg 45%", "Savings"]].map(([val, label]) => (
              <div key={label}>
                <div className="text-2xl font-black text-orange-400">{val}</div>
                <div className="text-gray-500 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-orange-500/50 rounded-2xl p-4 text-center transition group"
            >
              <div className="text-3xl mb-2">{cat.emoji}</div>
              <div className="text-xs font-semibold text-gray-300 group-hover:text-orange-400 transition">{cat.name}</div>
              <div className="text-xs text-gray-600 mt-1">{cat.count.toLocaleString()}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Hot Deals */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">🔥 Hot Deals</h2>
          <button className="text-orange-400 hover:text-orange-300 text-sm font-medium transition">View all →</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-gray-900 border border-gray-800 hover:border-orange-500/40 rounded-2xl overflow-hidden transition group hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/5"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-40 flex items-center justify-center relative">
                <span className="text-5xl">{deal.image}</span>
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-lg">
                  -{deal.discount}%
                </span>
                <span className={`absolute top-3 right-3 ${storeColors[deal.store]} text-white text-xs font-bold px-2 py-1 rounded-lg`}>
                  {deal.store}
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-200 line-clamp-2 mb-3 group-hover:text-white transition">{deal.name}</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-orange-400 font-black text-lg">{formatVND(deal.salePrice)}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 text-sm line-through">{formatVND(deal.originalPrice)}</span>
                  <span className="text-yellow-400 text-xs">★ {deal.rating}</span>
                </div>
                <a
                  href="#"
                  className="block w-full bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold py-2.5 rounded-xl text-center transition"
                >
                  Get Deal →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="bg-gray-900 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">⚡ Trending Now</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {deals.slice(0, 8).map((deal) => (
              <div key={deal.id} className="flex-shrink-0 bg-gray-800 rounded-xl p-4 flex items-center gap-3 w-64 hover:bg-gray-750 transition cursor-pointer border border-gray-700 hover:border-orange-500/40">
                <span className="text-3xl">{deal.image}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-200 line-clamp-1">{deal.name}</p>
                  <p className="text-orange-400 text-sm font-bold">{formatVND(deal.salePrice)}</p>
                  <p className="text-green-400 text-xs">Save {deal.discount}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-3xl p-12">
          <h2 className="text-3xl font-black mb-4">Get Instant Deal Alerts 🔔</h2>
          <p className="text-gray-400 mb-8">Be the first to know when prices drop on your favorite products.</p>
          <div className="flex gap-3 max-w-sm mx-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition" />
            <button className="bg-orange-500 hover:bg-orange-400 px-5 py-3 rounded-xl font-bold transition">Join</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 px-4 text-center text-gray-500 text-sm">
        <p className="mb-2">© 2024 DealSync. All rights reserved.</p>
        <p>DealSync may earn affiliate commissions from purchases made through links on this site.</p>
      </footer>
    </div>
  );
}
