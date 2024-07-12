"use client";

import { usePathname } from "next/navigation";

import { useSidebarStore } from "@/src/store/sidebar";

import { Button } from "../ui/button";
import { MenuSvg } from "../icons";



export default function MenuButton() {
  const currentPath = usePathname();
  const { setSidebarOpen } = useSidebarStore()

  return (
    <Button variant="tertiary" size="icon_sm" className={`mr-1 ${!currentPath.startsWith('/user') && 'hidden'} md:hidden`} onClick={setSidebarOpen}>
      <MenuSvg />
    </Button>
  )
}
