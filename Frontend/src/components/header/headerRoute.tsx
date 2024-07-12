"use client"

import { usePathname } from "next/navigation"



export default function HeaderRoute() {
  const currentPath = usePathname()

  const pathSegments = currentPath.split('/').filter(Boolean);
  const firstPathParam = pathSegments[1];

  const capitalize = (s:string) => s.charAt(0).toUpperCase() + s.slice(1);



  return (
    <header className="bg-secondary px-4 py-1 rounded text-primary text-sm">
      <h1>{capitalize(firstPathParam)}</h1>
    </header>
  )
}
