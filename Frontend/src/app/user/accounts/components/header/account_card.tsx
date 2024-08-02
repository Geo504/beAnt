"use client";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Account } from "@/src/interfaces";
import { StarFillSvg, StarSvg } from "@/src/components/icons";



interface Props {
  account: Account;
  favoriteAccountId: string | null;
  updateFavoriteAccount: (accountId: string) => Promise<boolean>;
}

export default function AccountCard({ account, favoriteAccountId, updateFavoriteAccount }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentAccountId = searchParams.get('id');



  const handleCurrentAccount = (id: string) => {
    const params = new URLSearchParams(searchParams);
    if (id) {
      params.set('id', id);
    }
    replace(`${pathname}?${params.toString()}`);
  }


  const handleFavoriteAccount = async (accountId: string) => {
    try {
      const favoriteUpdated = await updateFavoriteAccount(accountId);
      if (!favoriteUpdated) return toast.error('Error updating favorite account');

    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="relative hover:scale-105 transition-all duration-300">
      <button 
        className={`absolute top-2 right-2 p-1 rounded hover:shadow dark:hover:shadow-primary/50 transition-all duration-300 ${account.id === currentAccountId ? 'text-primary-foreground/60 hover:bg-primary': 'text-muted-foreground hover:bg-background'} `}
        onClick={() => handleFavoriteAccount(account.id)}>
        {account.id === favoriteAccountId ? <StarFillSvg /> : <StarSvg />}
      </button>

      <button
        className={`px-4 py-2 rounded flex flex-col justify-between h-full w-32 md:w-48 lg:w-60 text-left hover:shadow-md dark:hover:shadow-primary/50 transition-all duration-300 ${account.id === currentAccountId ? 'bg-primarySoft text-primary-foreground' : 'bg-secondary text-primary'}`}
        onClick={ () => handleCurrentAccount(account.id) }
      >
        <h3 className="mb-5 mt-1 mr-4 font-medium">{account.name}</h3>

        <main className="w-full">
          <div className="text-xl space-x-2">
            <span>{account.currency}</span>
            <span>{account.balance.toFixed(2)}</span>
          </div>

          <p className={`text-xs mt-1 pt-1 border-t ${account.id === currentAccountId ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
            Members: {account.users.length}
          </p>
        </main>
      </button>

    </div>
  )
}
