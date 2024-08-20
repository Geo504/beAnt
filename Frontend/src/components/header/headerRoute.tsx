"use client"

import { usePathname } from "next/navigation"
import { ArrowRightSvg } from "../icons";
import Link from "next/link";



export default function HeaderRoute() {
  const currentPath = usePathname();
  const pathSegments = currentPath.split('/').filter(Boolean).slice(1);

  const capitalize = (s:string) => s.charAt(0).toUpperCase() + s.slice(1);



  return (
    <header className="flex items-center gap-2 bg-secondary px-4 py-1 rounded text-primary text-xs">
      {pathSegments.map((segment, index) => {
        const isActive = index === pathSegments.length - 1;
        return (
          <div key={index} className="flex items-center gap-2 text-muted-foreground">
            {isActive ? (
              <h1 className="text-primary">
                {capitalize(segment)}
              </h1>
            ):(
              <Link href={`/user/${segment}`} className="hover:underline">
                {capitalize(segment)}
              </Link>
            )}
            {index < pathSegments.length - 1 && <ArrowRightSvg className="h-3 w-3" />}
          </div>
        );
      })}
    </header>
  )
}
