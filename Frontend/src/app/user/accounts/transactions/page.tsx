import { getAllAccounts } from "@/src/services/accountData";
import { deleteTransactionById, getTransactions, updateTransaction } from "@/src/services/transactionData";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import TransactionModal from "./components/transactionModal";
import HeaderTransactionHistory from "./components/headerTransactionHistory";



export default async function TransactionsPage({ searchParams }: any) {
  const transactions = await getTransactions(searchParams);
  const allAccounts = await getAllAccounts();



  return (
    <>
    <TransactionModal
      allAccounts={allAccounts?.accounts || []}
      updateTransaction={updateTransaction}
      deleteTransaction={deleteTransactionById}
    />


    <HeaderTransactionHistory allAccounts={allAccounts?.accounts || []} />

    <section className="p-4 bg-primary-foreground rounded">
      
      <DataTable columns={columns} data={transactions?.transactions || []} />
    </section>
    </>
  )
}
