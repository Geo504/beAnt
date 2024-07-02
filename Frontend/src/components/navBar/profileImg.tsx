"use client"

import { usePathname, useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { GearSvg, ProfileSvg } from "../icons";
import LogoutButton from "./logout-btn";



interface Props {
  logoutUser: () => Promise<boolean>;
}

export default function ProfileImg({ logoutUser }: Props) {
  const currentPath = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={`${!currentPath.startsWith('/user') && 'hidden'}`}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="profile pic" />
          <AvatarFallback>BA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-44 mr-4">

        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={()=> router.push('/user/profile')}>
            <ProfileSvg className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <GearSvg className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <LogoutButton logoutUser={logoutUser} />

      </DropdownMenuContent>
    </DropdownMenu>
  )
}