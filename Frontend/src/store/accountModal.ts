import { create } from 'zustand';



type ModalData = {
  position: "center" | "right" | "left" | "top" | "bottom";
  action: string;
  title: string;
  description: string;
};

export const  accountModalConfig = {
  edit: {
    action: "edit",
    position: "right",
    title: "Edit Account",
    description: "Update your account information",
  } as ModalData,
  addTransaction: {
    action: "addTransaction",
    position: "right",
    title: "Add Transaction",
    description: "Add a new transaction to one account",
  } as ModalData,
  addUser: {
    action: "inviteUser",
    position: "right",
    title: "Invite Friend",
    description: "Invite others users to one account for split expenses",
  } as ModalData,
  delete: {
    action: "delete",
    position: "center",
    title: "Delete Account",
    description: "Delete all information related to this account",
  } as ModalData,
};



type Store = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  modalData: ModalData;
  setModalData: (modalData: ModalData) => void;

  handleOpenModal: (modalData: ModalData) => void;
}



export const useAccountModalStore = create<Store>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),

  modalData: {position: "right", action: "", title: "", description: ""},
  setModalData: (modalData) => set({ modalData }),

  handleOpenModal: (modalData) => {
    set({ isOpen: true });
    set({ modalData });
  },
}))