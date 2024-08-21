"use client"
import { transactionModalConfig, useTransactionModalStore } from '@/src/store/transactionModal';

import { Button } from "@/src/components/ui/button";
import { CreditCardPlusSvg } from "@/src/components/icons";




export default function NewTransactionBtn() {
  const { handleOpenModal } = useTransactionModalStore();



  return (
    <Button variant="tertiary" size="sm" className="border border-primary" onClick={()=> handleOpenModal(transactionModalConfig.add)}>
      <CreditCardPlusSvg className='w-4 h-4 mr-0.5'/>
      Add new
    </Button>
  )
}
