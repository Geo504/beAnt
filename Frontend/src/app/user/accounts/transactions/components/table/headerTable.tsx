"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/src/components/ui/input";
import { SearchSvg } from "@/src/components/icons";



export default function HeaderTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();

  const WAIT_TIMER_TO_SEARCH = 800;



  const handleSearchInput = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set('search', search);
    }
    else {
      params.delete('search');
    }
    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
    refresh();
  }, WAIT_TIMER_TO_SEARCH);


  return (
    <header className="mb-4">

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

    </header>
  )
}
