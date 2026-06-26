import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "یوگا با سعیده",
  description:
    "استودیوی آرامش، بیان و محتوا؛ میز کار روزانه سعیده برای تولید محتوا، یوگا، مدیتیشن، بیان، فروش نرم و رشد برند شخصی.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
