"use client"
import { useTheme } from "next-themes"

import { Button } from "@/src/components/ui/button"
import { ComputerSvg, MoonSvg, SunSvg } from "../icons"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/src/components/ui/dropdown-menu"



export function ModeToggle() {
  const { setTheme } = useTheme()

  const dropdownContent = [
    {
      text: "Light",
      icon: <SunSvg className="mr-2 w-4 h-4"/>,
      funcString: "light",
    },
    {
      text: "Dark",
      icon: <MoonSvg className="mr-2 w-4 h-4"/>,
      funcString: "dark",
    },
    {
      text: "System",
      icon: <ComputerSvg className="mr-2 w-4 h-4"/>,
      funcString: "system",
    },
  ]


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="tertiary" size="icon_sm">
          <SunSvg className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonSvg className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {dropdownContent.map(({ text, funcString, icon }) => (
          <DropdownMenuItem
            className="text-primary"
            key={text}
            onClick={() => setTheme(funcString)}
          >
            {icon}
            {text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
