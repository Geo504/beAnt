"use client";
import { profileModalConfig, useProfileModalStore } from "@/src/store/profileModal";

import { PlusCircleSvg } from "@/src/components/icons";





export default function NewInvitationBtn() {
  const { handleOpenModal } = useProfileModalStore();

  return (
    <button
      className="p-0.5 rounded text-muted-foreground hover:shadow dark:hover:shadow-primary/50 hover:bg-background transition-all duration-300"
      onClick={() => handleOpenModal(profileModalConfig.addUser)}
    >
      <PlusCircleSvg size={24}/>
    </button>
  )
}
