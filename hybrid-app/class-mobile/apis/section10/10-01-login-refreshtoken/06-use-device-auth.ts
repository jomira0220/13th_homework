import * as SecureStore from "expo-secure-store";
// import AsyncStorage from "react-native" => 옛날 방식
// import AsyncStorage from "@react-native-async-storage/async-storage";
// https://docs.expo.dev/versions/v51.0.0/sdk/async-storage/ - expo sdk 51.0.0 버전에서 AsyncStorage 사용법
// 최신 버전의 AsyncStorage 경로 공식 문서 참조 - https://reactnative.dev/docs/asyncstorage, https://reactnative.directory/?search=storage
import { useState } from "react";

export const useDeviceAuth = (onResponse) => {
  const [accessToken, setAccessToken] = useState("");

  // 1. 액세스 토큰을 받아서 저장하는 함수 - 웹이 앱한테 저장 요청할때 사용
  const updateDeviceAuthForAccessTokenSet = (variables) => {
    setAccessToken(variables.accessToken);
    onResponse({
      updateDeviceAuthForAccessTokenSet: {
        accessToken: "accessToken 저장 완료",
      },
    });
  };

  // 2. 리프레시 토큰을 받아서 저장하는 함수 - 웹이 앱한테 저장 요청할때 사용
  const updateDeviceAuthForRefreshTokenSet = async (variables) => {
    // 1. AsyncStorage => 앱의 로컬스토리지 개념
    // AsyncStorage.setItem("refreshToken", variables.refreshToken); => 리프레시 토큰을 저장하는 것은 보안상 위험, 아래 SecureStore 사용

    // 2. SecureStore => 앱의 암호화된 스토리지 개념, 보안이 필요한 데이터 저장
    // 2-1) 안드로이드: SharedPreferences 에 저장 (keystore로 암호화하여 저장됨)
    // 2-2) iOS: Keychain 에 저장 (keychain으로 암호화하여 저장됨)
    //
    await SecureStore.setItemAsync("refreshToken", variables.refreshToken);

    onResponse({
      updateDeviceAuthForRefreshTokenSet: {
        message: "저장완료",
      },
    });
  };

  // 3. 액세스 토큰을 앱이 웹한테 요청할때 사용
  const fetchDeviceAuthForAccessTokenSet = () => {
    onResponse({
      fetchDeviceAuthForAccessTokenSet: {
        // accessToken: accessToken,
        accessToken, // => shorthand property (accessToken: accessToken와 같은 의미)
      },
    });
  };

  // 4. 리프레시 토큰을 앱이 웹한테 요청할때 사용
  const fetchDeviceAuthForRefreshTokenSet = async () => {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");

    onResponse({
      fetchDeviceAuthForRefreshTokenSet: {
        // refreshToken: refreshToken,
        refreshToken, // => shorthand property (refreshToken: refreshToken와 같은 의미)
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
