import { WalletIcon } from '@heroicons/react/24/outline';

export default function FoldedLogo() {
  return (
    <div className={`flex flex-row items-center leading-none text-white`}>
      <WalletIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="mx-2 text-[44px] font-bold">Folded</p>
    </div>
  );
}
