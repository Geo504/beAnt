import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut } from "../ui/dropdown-menu";
import { LogOutSvg } from "../icons";



interface Props {
  logoutUser: () => Promise<boolean>;
}

export default function LogoutButton({ logoutUser }: Props) {
  const router = useRouter();

  async function handleLogout() {
    try {
      const success = await logoutUser();
      if (success) router.push('/login');
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  }

  return (
    <>
    <DropdownMenuSeparator />

    <DropdownMenuItem onClick={ handleLogout }>
      <LogOutSvg className="mr-2 h-4 w-4" />
      <span>Log out</span>
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
    </>
  )
}
