import { create } from 'zustand';
import { Transaction } from '../interfaces';



type ModalData = {
  position: "center" | "right" | "left" | "top" | "bottom";
  action: string;
  title: string;
  description: string;
  transaction?: Transaction;
};

export const transactionModalConfig = {
  edit: {
    action: "edit",
    position: "right",
    title: "Edit Transaction",
    description: "Update transaction information",
  } as ModalData,
  delete: {
    action: "delete",
    position: "center",
    title: "Delete Transaction",
    description: "Delete transaction from this account",
  } as ModalData,
}




type Store = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  modalData: ModalData;
  setModalData: (modalData: ModalData) => void;

  handleOpenModal: (modalData: ModalData, transaction: any) => void;
}



export const useTransactionModalStore = create<Store>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),

  modalData: {position: "right", action: "", title: "", description: ""},
  setModalData: (modalData) => set({ modalData }),

  handleOpenModal: (modalData, transaction) => {
    set({ isOpen: true });
    set({  modalData: { ...modalData, transaction } });
  },
}))