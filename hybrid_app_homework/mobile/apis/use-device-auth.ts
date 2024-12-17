import * as SecureStore from "expo-secure-store";
import { useState } from "react";

export const useDeviceAuth = (
  onResponse: (response: { [key: string]: { [key: string]: string } }) => void
) => {
  const [accessToken, setAccessToken] = useState<string>("");

  // 액세스 토큰을 저장하는 함수
  const updateDeviceAuthForAccessTokenSet = async (variables: {
    accessToken: string;
  }) => {
    setAccessToken(variables.accessToken);
    onResponse({
      updateDeviceAuthForAccessTokenSet: {
        message: "accessToken 저장 완료",
      },
    });
  };

  // 리프레시 토큰을 저장하는 함수
  const updateDeviceAuthForRefreshTokenSet = async (variables: {
    refreshToken: string;
  }) => {
    await SecureStore.setItemAsync("refreshToken", variables.refreshToken);
    onResponse({
      updateDeviceAuthForRefreshTokenSet: {
        message: "refreshToken 저장 완료",
      },
    });
  };

  // 액세스 토큰을 가져오는 함수
  const fetchDeviceAuthForAccessTokenSet = async () => {
    onResponse({
      fetchDeviceAuthForAccessTokenSet: {
        accessToken,
      },
    });
  };

  // 리프레시 토큰을 가져오는 함수
  const fetchDeviceAuthForRefreshTokenSet = async () => {
    const refreshToken = (await SecureStore.getItemAsync("refreshToken")) ?? "";
    onResponse({
      fetchDeviceAuthForRefreshTokenSet: {
        refreshToken,
      },
    });
  };

  return {
    updateDeviceAuthForAccessTokenSet,
    updateDeviceAuthForRefreshTokenSet,
    fetchDeviceAuthForAccessTokenSet,
    fetchDeviceAuthForRefreshTokenSet,
  };
};
