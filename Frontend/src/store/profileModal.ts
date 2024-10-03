import { create } from 'zustand';



type ModalData = {
  position: "center" | "right" | "left" | "top" | "bottom";
  action: string;
  title: string;
  description: string;
};

export const  profileModalConfig = {
  addUser: {
    action: "inviteUser",
    position: "right",
    title: "Invite Friend",
    description: "Invite others users to one account for split expenses",
  } as ModalData,
};



type Store = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  modalData: ModalData;
  setModalData: (modalData: ModalData) => void;

  handleOpenModal: (modalData: ModalData) => void;
}



export const useProfileModalStore = create<Store>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),

  modalData: {position: "right", action: "", title: "", description: ""},
  setModalData: (modalData) => set({ modalData }),

  handleOpenModal: (modalData) => {
    set({ isOpen: true });
    set({ modalData });
  },
}))