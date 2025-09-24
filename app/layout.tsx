import type { Metadata } from "next";
import { iranyekanx, iranyekanxFaNum } from "./fonts";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "فولدد - مدیریت مخارج شخصی",
  description:
    "با برنامه فولدد به راحتی درآمد و مخارج خود را مدیریت کنید. ابزاری قدرتمند برای پیگیری تراکنش‌های مالی، مشاهده آمار ماهانه و کنترل بهتر بودجه شخصی.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "فولدد",
  },
  icons: {
    apple: "/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${iranyekanxFaNum.variable} ${iranyekanx.variable} font-iranyekanx-fanum antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ServiceWorkerRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}
