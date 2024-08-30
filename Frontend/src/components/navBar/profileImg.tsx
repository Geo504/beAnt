"use client"
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useNavbarStore } from "@/src/store/navbar";
import LogoutButton from "./logout-btn";
import { User } from "@/src/interfaces";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { GearSvg, ProfileSvg } from "../icons";



interface Props {
  user: User; 
  logoutUser: () => Promise<boolean>;
}

export default function ProfileImg({user, logoutUser }: Props) {
  const { profileUrlImage, setProfileUrlImage } = useNavbarStore();
  const currentPath = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user.img) setProfileUrlImage(user.img);
  }, []);

  const firstLetter = user.name.charAt(0).toUpperCase();



  return (
    <>
    <DropdownMenu>

      <DropdownMenuTrigger className={`${!currentPath.startsWith('/user') && 'hidden'}`} asChild>
        <button className="rounded-full transition-shadow duration-300 hover:shadow-md hover:bg-secondary dark:hover:shadow-primary/30" type="button">
          <Avatar>
            <AvatarImage src={ profileUrlImage } alt="profile pic"/>
            <AvatarFallback>{firstLetter}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>


      <DropdownMenuContent className="w-44 mr-4">
        <DropdownMenuLabel className="flex flex-col">
          My User
          <span className="text-xs text-muted-foreground font-normal">{user?.email}</span>
        </DropdownMenuLabel>
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