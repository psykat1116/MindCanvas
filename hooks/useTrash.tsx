import { create } from "zustand";

type TrashState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useTrash = create<TrashState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
