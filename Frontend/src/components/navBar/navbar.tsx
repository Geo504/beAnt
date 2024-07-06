import { cookies } from "next/headers";
import { lifeSavers } from "../ui/fonts";

import { getUser, logoutUser } from "@/src/services/authData";
import ProfileImg from "./profileImg";

import { ModeToggle } from "../ui/mode-toggle";
import { LogoSvg } from "../icons";
import MenuButton from "./menu-btn";



export default async function Navbar() {

  let userData = null;
  const accessToken = cookies().get('access_token');
  if (accessToken) {
    userData = await getUser();
  }

  
  return (
    <header>
      <nav className="flex justify-between bg-background text-secondary-foreground px-4 py-2">

        <div className="flex items-center gap-0.5">
          <MenuButton />
          <LogoSvg />
          <h2 className={`${lifeSavers.className} text-xl`}>BeAnt</h2>
        </div>

        <div className="flex gap-2">
          <ModeToggle />
          <ProfileImg user={userData} logoutUser={logoutUser}/>
        </div>

      </nav>
    </header>
  )
}
