import { toast } from "sonner";

import { useAccountsStore } from "@/src/store/accounts";

import { Account } from "@/src/interfaces";
import { StarFillSvg, StarSvg } from "@/src/components/icons";



interface Props {
  account: Account;
  updateFavoriteAccount: (accountId: string) => Promise<boolean>;
}

export default function AccountCard({ account, updateFavoriteAccount }: Props) {
  const { favoriteAccountId, selectedAccountId, setFavoriteAccountId, setSelectedAccountId } = useAccountsStore();


  const handleFavoriteAccount = async (accountId: string) => {
    try {
      const favoriteUpdated = await updateFavoriteAccount(accountId);
      if (favoriteUpdated) setFavoriteAccountId(accountId);
      else toast.error('Error updating favorite account');

    } catch (error) {
      console.error(error);
      toast.error('Error updating favorite account')
    }

  };



  return (
    <div className="relative hover:scale-105 transition-all duration-300">
      <button 
        className={`absolute top-2 right-2 p-1 rounded hover:shadow transition-all duration-300 ${account.id === selectedAccountId ? 'text-primary-foreground/60 hover:bg-primary': 'text-muted-foreground hover:bg-background'} `}
        onClick={() => handleFavoriteAccount(account.id)}>
        {account.id === favoriteAccountId ? <StarFillSvg /> : <StarSvg />}
      </button>

      <button 
        className={`px-4 py-2 rounded w-32 md:w-48 lg:w-64 text-left hover:shadow-lg transition-all duration-300 ${account.id === selectedAccountId ? 'bg-primarySoft text-primary-foreground' : 'bg-secondary text-primary'}`}
        onClick={ () => setSelectedAccountId(account.id) }
      >
        <h3 className="mb-5 mt-1 mr-4 font-medium">{account.name}</h3>

        <div className="text-xl space-x-2">
          <span>{account.currency}</span>
          <span>{account.balance.toFixed(2)}</span>
        </div>

        <p className={`text-xs mt-1 pt-1 border-t ${account.id === selectedAccountId ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
          Members: {account.users.length}
        </p>
      </button>

    </div>
  )
}
