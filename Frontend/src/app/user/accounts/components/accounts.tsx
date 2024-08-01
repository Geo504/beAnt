"use client";
import { useEffect } from "react";

import { useAccountsStore } from "@/src/store/accounts";
import AccountCard from "./account_card";
import CreateAccountCard from "./create_account_card";

import { CreateAccountResponse, GetAccountsResponse } from "@/src/services/accountData";



interface Props {
  allAccounts: GetAccountsResponse | null;
  updateFavoriteAccount: (accountId: string) => Promise<boolean>;
  createAccount: (data: {name: string, currency?: string}) => Promise<CreateAccountResponse | null>;
}

export default function Accounts({ allAccounts, updateFavoriteAccount, createAccount }: Props) {
  const { setFavoriteAccountId, setSelectedAccountId } = useAccountsStore();

  useEffect(()=> {
    if (allAccounts?.favoriteAccountId) {
      setFavoriteAccountId(allAccounts?.favoriteAccountId)
      setSelectedAccountId(allAccounts?.favoriteAccountId)
    };
  }, [])



  return (
    <div className="flex gap-4">
      {allAccounts?.accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
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