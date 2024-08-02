import AccountCard from "./account_card";
import CreateAccountCard from "./create_account_card";

import { createAccount, GetAccountsResponse, updateFavoriteAccount } from "@/src/services/accountData";


interface Props {
  allAccounts: GetAccountsResponse | null;
}

export default async function Accounts({allAccounts}: Props) {


  
  return (
    <div className="flex gap-4">
      {allAccounts?.accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          favoriteAccountId={allAccounts?.favoriteAccountId}
          updateFavoriteAccount={updateFavoriteAccount}
        />
      ))}
      <CreateAccountCard
        accountNumber={allAccounts?.accounts.length || 0} 
        createAccount={createAccount}
      />
    </div>
  )
}