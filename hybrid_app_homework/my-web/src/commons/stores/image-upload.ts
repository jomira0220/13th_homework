import { create } from "zustand";

type ImageState = {
  uploadImages: string[];
  setUploadImages: (images: string[]) => void;
  clearImages: () => void;
};

export const useImageUploadStore = create<ImageState>((set) => ({
  uploadImages: [],
  setUploadImages: (uploadImages: string[]) => set({ uploadImages }),
  clearImages: () => set({ uploadImages: [] }),
}));
