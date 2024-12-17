import { AppState, Platform } from "react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";

export const useDeviceSystem = (onResponse: any) => {
  const isAndroid = Platform.OS === "android";
  const isIos = Platform.OS === "ios";

  // 앱 버전 가져오기
  const fetchDeviceSystemForAppSet = () => {
    onResponse({
      fetchDeviceSystemForAppSet: {
        appVersion:
          (isAndroid && Constants.expoConfig?.android?.versionCode) ||
          (isIos && Constants.expoConfig?.ios?.buildNumber),
      },
    });
  };

  // 디바이스 정보 가져오기
  const fetchDeviceSystemForPlatformSet = () => {
    onResponse({
      fetchDeviceSystemForPlatformSet: {
        os: Platform.OS,
        osVersion: Device.osVersion,
        modelName: Device.modelName,
      },
    });
  };

  // 앱이 foreground로 동작중인지 여부
  const fetchDeviceSystemForAppStateSet = () => {
    const isForeground = AppState.currentState === "active";
    onResponse({
      fetchDeviceSystemForAppStateSet: {
        isForeground,
      },
    });
  };

  return {
    fetchDeviceSystemForPlatformSet,
    fetchDeviceSystemForAppSet,
    fetchDeviceSystemForAppStateSet,
  };
};
