import { create } from "zustand";

type ImageState = {
  images: string[];
  setImages: (imageGroup: string[]) => void;
};

export const useImageStore = create<ImageState>((set) => ({
  images: [],
  setImages: (imageGroup: string[]) => set({ images: imageGroup }),
}));
