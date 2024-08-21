import { getAllAccounts } from "@/src/services/accountData";
import { deleteTransactionById, getTransactions, updateTransaction } from "@/src/services/transactionData";

import { columns } from "./components/table/columns";
import { DataTable } from "./components/table/data-table";
import TransactionModal from "./components/transactionModal";
import HeaderTransactionHistory from "./components/header/headerTransactionHistory";
import HeaderTable from "./components/table/headerTable";
import PaginationTable from "./components/table/paginationTable";



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

    <section className="p-4 pb-2 bg-primary-foreground rounded">
      <HeaderTable />
      <DataTable columns={columns} data={transactions?.transactions || []} />
      {transactions?.transactions.length !== 0 && (
        <PaginationTable
          totalItems={transactions?.totalItems || 0}
          actualPage={transactions?.actualPage || 1}
          totalPages={transactions?.totalPages || 0}
          itemsPerPage={transactions?.transactions.length || 0}
        />
      )}
    </section>
    </>
  )
}
