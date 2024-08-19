import { deleteTransactionById, getTransactionsById, updateTransaction } from "@/src/services/transactionData";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import TransactionModal from "./transactionModal";
import { Account } from "@/src/interfaces";



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
      accountData={accountData}
      updateTransaction={updateTransaction}
      deleteTransaction={deleteTransactionById}
    />

    <section className="px-4 pb-4 pt-2 bg-primary-foreground rounded col-span-4 xl:col-span-3 xl:col-start-2">
      <h3 className="mb-2 font-medium">Transaction History</h3>
      <DataTable columns={columns} data={transactions?.transactions || []} />
    </section>
    </>
  )
}
