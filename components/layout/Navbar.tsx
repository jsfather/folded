'use client';

import { HiUser, HiCalendar, HiViewGrid, HiCash } from 'react-icons/hi';
import { HiWallet } from 'react-icons/hi2';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/profile', icon: HiUser },
    { href: '/wallet', icon: HiWallet },
    { href: '/schedule', icon: HiCalendar },
    { href: '/transactions', icon: HiCash },
    { href: '/dashboard', icon: HiViewGrid },
  ];

  return (
    <nav
      className={
        'fixed bottom-0 flex h-[80px] w-full items-center justify-between gap-5 bg-slate-900 p-8 sm:w-full md:w-full lg:w-2/3 xl:w-1/2'
      }
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href}>
            <Icon
              className={`text-3xl ${
                pathname === item.href ? 'text-sky-400' : 'text-gray-100'
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}

export default Navbar;
