import { lifeSavers } from "../ui/fonts";

import { logoutUser } from "@/src/services/authData";
import ProfileImg from "./profileImg";
import { ModeToggle } from "../ui/mode-toggle";
import { LogoSvg } from "../icons";



export default function Navbar() {
  return (
    <header>
      <nav className="flex justify-between bg-background text-secondary-foreground px-4 py-2">

        <div className="flex items-center gap-0.5">
          <LogoSvg />
          <h2 className={`${lifeSavers.className} text-xl`}>BeAnt</h2>
        </div>

        <div className="flex gap-2">
          <ModeToggle />
          <ProfileImg logoutUser={logoutUser}/>
        </div>

      </nav>
    </header>
  )
}
