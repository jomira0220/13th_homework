import { create } from "zustand";

export const useAccessTokenStore = create((set) => ({
  accessToken: "",
  setAccessToken: (accessToken) => set(() => ({ accessToken })),
}));

export const useRefreshTokenStore = create((set) => ({
  refreshToken: "",
  setRefreshToken: (refreshToken) => set(() => ({ refreshToken })),
}));
