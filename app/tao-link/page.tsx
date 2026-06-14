"use client";

import { useState } from "react";
import { shopeeLink, SHOPEE_AFFILIATE_ID } from "@/lib/affiliate";

export default function LinkGenerator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const raw = input.trim();
    if (!raw) return;
    // Nếu là URL Shopee → gắn affiliate; nếu là text → coi như keyword
    const isUrl = /^https?:\/\//i.test(raw) || raw.includes("shopee.");
    const link = isUrl
      ? shopeeLink({ url: raw.startsWith("http") ? raw : `https://${raw}` })
      : shopeeLink({ keyword: raw });
    setResult(link);
    setCopied(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2">
          <a href="/" className="flex items-center gap-1.5">
            <span className="text-xl font-black text-orange-500">Deal</span>
            <span className="text-xl font-black text-white">Sync</span>
          </a>
          <span className="text-gray-600 mx-2">/</span>
          <span className="text-gray-400 text-sm">Tạo link affiliate</span>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-black mb-2">🔗 Tạo Link Affiliate Shopee</h1>
        <p className="text-gray-400 text-sm mb-8">
          Dán link sản phẩm Shopee (hoặc nhập từ khóa) → nhận link đã gắn tracking của bạn để đăng TikTok / group.
        </p>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 md:p-6">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Link Shopee hoặc từ khóa
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://shopee.vn/product/...  hoặc  iphone 15 pro"
            rows={3}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 resize-none"
          />
          <button
            onClick={generate}
            className="mt-4 w-full bg-orange-500 hover:bg-orange-400 py-3 rounded-xl font-bold transition"
          >
            Tạo link ngay →
          </button>

          {result && (
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                ✅ Link của bạn (đã gắn tracking)
              </label>
              <div className="bg-gray-800 border border-orange-500/40 rounded-xl p-3 text-sm text-orange-300 break-all mb-3">
                {result}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copy}
                  className="flex-1 bg-orange-500 hover:bg-orange-400 py-2.5 rounded-xl font-bold transition"
                >
                  {copied ? "✓ Đã copy!" : "📋 Copy link"}
                </button>
                <a
                  href={result}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-gray-700 hover:border-orange-500 py-2.5 rounded-xl font-bold text-center transition"
                >
                  Mở thử →
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 bg-gray-900/50 border border-gray-800 rounded-2xl p-4 text-xs text-gray-500">
          <p className="mb-1">💡 <span className="text-gray-400">Affiliate ID đang dùng:</span> <code className="text-orange-400">{SHOPEE_AFFILIATE_ID}</code></p>
          <p>Mỗi đơn mua qua link này sẽ tính hoa hồng về tài khoản Shopee Affiliate của bạn.</p>
        </div>
      </main>
    </div>
  );
}
