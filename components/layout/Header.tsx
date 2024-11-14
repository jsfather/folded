import { HiMenu } from 'react-icons/hi';

function Header() {
  return (
    <header
      className={'flex h-[80px] items-center justify-between bg-slate-900 p-5'}
    >
      <div className={'text-3xl font-black text-gray-100'}>Folded</div>
      <HiMenu className={'text-3xl text-gray-100'} />
    </header>
  );
}

export default Header;
