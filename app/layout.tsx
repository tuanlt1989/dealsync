import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://dealsync-three.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DealSync — Săn Deal Shopee Giá Rẻ Nhất Mỗi Ngày | Flash Sale, Mã Giảm Giá",
    template: "%s | DealSync",
  },
  description:
    "Tổng hợp deal Shopee giảm giá sốc, flash sale & mã giảm giá hot nhất hôm nay. Săn sản phẩm giá rẻ nhất, tiết kiệm tới 50%. Cập nhật 24/7.",
  keywords: [
    "deal shopee", "săn sale shopee", "flash sale shopee", "mã giảm giá shopee",
    "shopee giá rẻ", "deal hot hôm nay", "khuyến mãi shopee", "voucher shopee",
    "sản phẩm giảm giá", "săn deal online",
  ],
  authors: [{ name: "DealSync" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "DealSync",
    title: "DealSync — Săn Deal Shopee Giá Rẻ Nhất Mỗi Ngày",
    description: "Flash sale & mã giảm giá Shopee hot nhất hôm nay. Tiết kiệm tới 50%.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DealSync — Săn Deal Shopee Giá Rẻ Nhất",
    description: "Flash sale & mã giảm giá Shopee hot nhất hôm nay. Tiết kiệm tới 50%.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "DealSync",
              url: SITE_URL,
              description:
                "Tổng hợp deal Shopee giảm giá sốc, flash sale & mã giảm giá hot nhất.",
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
