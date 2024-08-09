import { deleteAccount, getAccount, updateAccount } from "@/src/services/accountData";

import OptionAccount from "./optionAccount";
import { Account } from "@/src/interfaces";



interface Props {
  accountName: string;
}

export default async function HeaderCurrentAccount({accountName}: Props) {


  return (
    <div className="mt-2 flex items-center justify-between">
      <h2 className="text-2xl font-semibold mt-1 text-primary">{accountName}</h2>

      <OptionAccount accountName={accountName} />
    </div>
  )
}
