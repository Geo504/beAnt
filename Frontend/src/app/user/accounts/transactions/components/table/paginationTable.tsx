"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/src/components/ui/button"
import { ArrowLeftSvg, ArrowRightSvg } from "@/src/components/icons";
import next from "next";



interface Props {
  totalItems: number;
  actualPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export default function PaginationTable({ totalItems, actualPage, totalPages, itemsPerPage }: Props) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();

  const currentPage= Number(searchParams.get('page')) || actualPage;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', page.toString());

    replace(`${pathname}?${params.toString()}`);
  }



  return (
    <section className="flex items-center justify-between gap-4">
      <div className="text-muted-foreground text-sm">
        {itemsPerPage} of {totalItems} items
      </div>

      <div className="flex gap-1">
        <Button
          variant="outline"
          className="h-7 w-7 hover:shadow-md dark:hover:shadow-primary/50"
          onClick={()=> createPageUrl(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeftSvg className="w-4 h-4" />
        </Button>

        <Button variant="default" className="h-7 min-w-7">
          {currentPage}
        </Button>

        <Button
          variant="outline" 
          className="h-7 w-7 hover:shadow-md dark:hover:shadow-primary/50" 
          onClick={()=> createPageUrl(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ArrowRightSvg className="w-4 h-4" />
        </Button>
      </div>
    </section>
  )
}
