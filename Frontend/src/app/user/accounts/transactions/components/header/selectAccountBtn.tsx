"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Account } from "@/src/interfaces";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';



interface Props {
  allAccounts: Account[] | [];
}



export default function SelectAccountBtn({ allAccounts }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();

  

  const handleCurrentAccount = (accountId: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete('page');

    if (accountId) {
      params.set('accountId', accountId);
    }
    if (accountId === 'allAccounts') {
      params.delete('accountId');
    }
    
    replace(`${pathname}?${params.toString()}`);
    refresh();
  }



  return (
    <Select onValueChange={handleCurrentAccount} defaultValue={ searchParams.get('accountId') || 'allAccounts'}>
      <SelectTrigger className="bg-transparent border-primary h-8 w-32 font-medium transition-all duration-300 hover:bg-secondary hover:shadow-md dark:hover:shadow-primary/30">
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
  )
}
