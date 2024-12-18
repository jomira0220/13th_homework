import { create } from "zustand";

export const useAccessTokenStore = create((set) => ({
  accessToken: "",
  setAccessToken: (accessToken: string) => set(() => ({ accessToken })),
}));

export const useRefreshTokenStore = create((set) => ({
  refreshToken: "",
  setRefreshToken: (refreshToken: string) => set(() => ({ refreshToken })),
}));
