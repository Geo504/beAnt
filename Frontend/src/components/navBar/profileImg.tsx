"use client"

import { usePathname, useRouter } from "next/navigation";

import LogoutButton from "./logout-btn";
import { User } from "@/src/interfaces";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { GearSvg, ProfileSvg } from "../icons";



interface Props {
  user: User | null; 
  logoutUser: () => Promise<boolean>;
}

export default function ProfileImg({user, logoutUser }: Props) {

  const currentPath = usePathname();
  const router = useRouter();
  
  const firstLetter = user ? user.name.charAt(0).toUpperCase() : 'BA';
  


  return (
    <>
    <DropdownMenu>

      <DropdownMenuTrigger className={`${!currentPath.startsWith('/user') && 'hidden'}`} asChild>
        <button className="rounded-full" type="button">
          <Avatar>
            <AvatarImage src={ user && user.img ? user.img : '' } alt="profile pic"/>
            <AvatarFallback>{firstLetter}</AvatarFallback>
          </Avatar>
        </button>
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

          <DropdownMenuItem onClick={()=> router.push('/user/settings')}>
            <GearSvg className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <LogoutButton logoutUser={logoutUser} />
      </DropdownMenuContent>

    </DropdownMenu>
    </>
  )
}