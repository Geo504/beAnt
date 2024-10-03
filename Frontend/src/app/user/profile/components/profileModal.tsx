"use client";
import { useProfileModalStore } from "@/src/store/profileModal";

import { Account } from "@/src/interfaces";

import InviteUserForm from "../../accounts/components/main/form/inviteUserForm";
import Modal from "@/src/components/ui/modal";




interface Props {
  allAccounts: Account[] | [];
}



export default function ProfileModal({ allAccounts }: Props) {

  const { isOpen, setIsOpen, modalData } = useProfileModalStore();



  const renderComponent = () => {
    switch (modalData.action) {

      case "inviteUser":
        return (
          <InviteUserForm
            allAccounts={allAccounts}
            setIsOpen={setIsOpen}
          />
        );
      default:
        return null;
    }
  };



  return (
    <Modal
      side={modalData.position }
      title={modalData?.title}
      description={modalData.description}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      { renderComponent() }
    </Modal>
  );
}
