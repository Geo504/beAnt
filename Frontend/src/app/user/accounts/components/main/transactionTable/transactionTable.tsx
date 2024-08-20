import Link from "next/link";

import { deleteTransactionById, getTransactionsById, updateTransaction } from "@/src/services/transactionData";
import { Account } from "@/src/interfaces";

import { columns } from "./columns";
import { DataTable } from "../../../transactions/components/data-table";
import TransactionModal from "@/src/app/user/accounts/transactions/components/transactionModal";



interface Props {
  allAccounts: Account[] | [];
  accountData: Account;
}


export default async function TransactionTable({ accountData, allAccounts }: Props) {
  const transactions = await getTransactionsById(accountData.id);

  return (
    <>
    <TransactionModal
      allAccounts={allAccounts}
      updateTransaction={updateTransaction}
      deleteTransaction={deleteTransactionById}
    />

    <section className="px-4 pb-4 pt-2 bg-primary-foreground rounded col-span-4 xl:col-span-3 xl:col-start-2">
      <header className="flex justify-between items-center mb-2 ">
        <h3 className="font-medium">Transaction History</h3>
        <Link href="/user/accounts/transactions" className="text-muted-foreground text-sm hover:underline">
          View more
        </Link>
      </header>

      <DataTable columns={columns} data={transactions?.transactions || []} />
    </section>
    </>
  )
}
