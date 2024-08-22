"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { transactionModalConfig, useTransactionModalStore } from '@/src/store/transactionModal';

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { PlusSvg, SearchSvg } from "@/src/components/icons";



export default function HeaderTable() {

  const { handleOpenModal } = useTransactionModalStore();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();

  const WAIT_TIMER_TO_SEARCH = 600;



  const handleSearchInput = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set('search', search);
    }
    else {
      params.delete('search');
    }

    replace(`${pathname}?${params.toString()}`);
    refresh();
  }, WAIT_TIMER_TO_SEARCH);


  return (
    <header className="flex justify-between mb-4">

      <div className="relative w-48">
        <label htmlFor="search" className="absolute top-2 left-1.5 pr-1.5 border-r border-primary/40">
          <SearchSvg className="w-4 h-4 text-muted-foreground "/>
        </label>

        <Input
          id="search" 
          className="bg-transparent pl-8 border-primary/40" 
          placeholder="Search"
          defaultValue={searchParams.get('search') || ''}
          onChange={(e) => handleSearchInput(e.target.value)}
        />
      </div>

      <Button
        variant={"outline"}
        size={"sm"}
        className="border hover:shadow-md dark:hover:shadow-primary/30"
        onClick={()=> handleOpenModal(transactionModalConfig.add)}
      >
        <PlusSvg className="w-4 h-4" />
      </Button>

    </header>
  )
}
