import { deleteAccount, getAccount } from "@/src/services/accountData";

import OptionAccount from "./optionAccount";



interface Props {
  accountId: string;
}
export default async function HeaderCurrentAccount({accountId}: Props) {
  const accountData = await getAccount(accountId);

  if (!accountData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96">
        <h1 className="text-2xl font-bold">Account not found</h1>
      </div>
    )
  }



  return (
    <div className="mt-2 flex items-center justify-between">
      <h2 className="text-2xl font-semibold mt-1 text-primary">{accountData?.name}</h2>
      <OptionAccount
        id={accountData.id}
        name={accountData.name}
        deleteAccount={deleteAccount}
      />
    </div>
  )
}
