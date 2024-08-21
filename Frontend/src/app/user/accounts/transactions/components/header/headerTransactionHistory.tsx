import { Account } from '@/src/interfaces';

import SelectAccountBtn from './selectAccountBtn';
import NewTransactionBtn from './newTransactionBtn';



interface Props {
  allAccounts: Account[] | [];
}



export default function HeaderTransactionHistory({ allAccounts }: Props) {


  return (
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center my-2">
      <h2 className="text-2xl font-semibold text-primary mb-1 sm:mb-0">Transaction History</h2>

      <div className='flex gap-2'>
        <SelectAccountBtn allAccounts={allAccounts} />
        <NewTransactionBtn />
      </div>
      
    </header>
  )
}
