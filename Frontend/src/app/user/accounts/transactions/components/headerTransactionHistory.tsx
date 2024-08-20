"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { transactionModalConfig, useTransactionModalStore } from '@/src/store/transactionModal';
import { Account } from '@/src/interfaces';

import { Button } from '@/src/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { CreditCardPlusSvg } from '@/src/components/icons';



interface Props {
  allAccounts: Account[] | [];
}



export default function HeaderTransactionHistory({ allAccounts }: Props) {
  const { handleOpenModal } = useTransactionModalStore();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();


  const handleCurrentAccount = (accountId: string) => {
    const params = new URLSearchParams(searchParams);

    if (accountId) {
      params.set('accountId', accountId);
      replace(`${pathname}?${params.toString()}`);
    }
    if (accountId === 'allAccounts') {
      params.delete('accountId');
      replace(`${pathname}`);
      refresh();
    }
  }


  return (
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center my-2">
      <h2 className="text-2xl font-semibold text-primary mb-1 sm:mb-0">Transaction History</h2>

      <div className='flex gap-2'>
        <Select onValueChange={handleCurrentAccount} defaultValue={ searchParams.get('accountId') || 'allAccounts'}>
          <SelectTrigger className="bg-transparent border-primary h-8 w-32 font-medium transition-all duration-300 hover:bg-secondary hover:shadow-lg">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="allAccounts">All Accounts</SelectItem>
            {allAccounts.map((account) => (
              <SelectItem 
                key={account.id} 
                value={account.id}
              >
                {account.name}
                <span className="ml-2 opacity-60 text-xs">
                  ({account.currency} {account.balance.toFixed(2)})
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="tertiary" size="sm" className="border border-primary" onClick={()=> handleOpenModal(transactionModalConfig.add)}>
          <CreditCardPlusSvg className='w-4 h-4 mr-0.5'/>
          Add new
        </Button>
      </div>
      
    </header>
  )
}
