"use client"
import { usePathname, useSearchParams } from "next/navigation";

import { Button } from "@/src/components/ui/button"
import { ArrowLeftDoubleSvg, ArrowLeftSvg, ArrowRightDoubleSvg, ArrowRightSvg } from "@/src/components/icons";
import next from "next";
import Link from "next/link";
import LinkButton from "@/src/components/ui/linkButton";



interface Props {
  totalItems: number;
  actualPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export default function PaginationTable({ totalItems, actualPage, totalPages, itemsPerPage }: Props) {

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage= Number(searchParams.get('page')) || actualPage;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', page.toString());

    return `${pathname}?${params.toString()}`;
  }



  return (
    <section className="flex items-center justify-between gap-4">
      <div className="text-muted-foreground text-sm">
        {itemsPerPage} of {totalItems} items
      </div>

      <div className="flex gap-1">
        <LinkButton href={createPageUrl(1)} disabled={currentPage <= 1}>
          <ArrowLeftDoubleSvg className="w-4 h-4" />
        </LinkButton>

        <LinkButton href={createPageUrl(currentPage - 1)} disabled={currentPage <= 1}>
          <ArrowLeftSvg className="w-4 h-4" />
        </LinkButton>

        <span className="inline-flex items-center justify-center h-7 min-w-7 rounded-md text-sm text-primary-foreground bg-primary font-medium">
          {currentPage}
        </span>
        
        <LinkButton href={createPageUrl(currentPage + 1)} disabled={currentPage >= totalPages}>
          <ArrowRightSvg className="w-4 h-4" />
        </LinkButton>

        <LinkButton href={createPageUrl(totalPages)} disabled={currentPage >= totalPages}>
          <ArrowRightDoubleSvg className="w-4 h-4" />
        </LinkButton>
      </div>
    </section>
  )
}
