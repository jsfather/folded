import type { Metadata } from 'next';
import './globals.css';
import { Header, Navbar } from '@/components';

export const metadata: Metadata = {
  title: 'Folded',
  description: 'Pay on time, every time!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen justify-center bg-neutral-950">
        <main className="w-full bg-slate-800 sm:w-full md:w-full lg:w-2/3 xl:w-1/2">
          <Header />
          <div>{children}</div>
          <Navbar />
        </main>
      </body>
    </html>
  );
}
