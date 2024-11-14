import { HiUser, HiCalendar, HiViewGrid, HiTerminal } from 'react-icons/hi';
import { HiWallet } from 'react-icons/hi2';

function Navbar() {
  return (
    <nav
      className={
        'fixed bottom-0 flex h-[80px] w-full items-center justify-between gap-5 bg-slate-900 p-8 sm:w-full md:w-full lg:w-2/3 xl:w-1/2'
      }
    >
      <HiUser className={'text-3xl text-gray-100'} />
      <HiWallet className={'text-3xl text-gray-100'} />
      <HiCalendar className={'text-3xl text-gray-100'} />
      <HiTerminal className={'text-3xl text-gray-100'} />
      <HiViewGrid className={'text-3xl text-gray-100'} />
    </nav>
  );
}

export default Navbar;
