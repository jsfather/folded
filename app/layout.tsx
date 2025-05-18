import '@/app/ui/global.css';
import { Metadata } from 'next';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: {
    template: '%s | فولدِد',
    default: 'فولدِد',
  },
  description:
    'فولدِد به شما کمک می‌کند بدهی‌ها و پرداخت‌هایتان را مدیریت کنید — منظم بمانید و هیچ پرداختی را فراموش نکنید.',
};

const iranSansXFaNum = localFont({
  src: [
    {
      path: './fonts/IRANSansXFaNum-Regular.ttf',
      weight: '400',
    },
    {
      path: './fonts/IRANSansXFaNum-Bold.ttf',
      weight: '700',
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={iranSansXFaNum.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
