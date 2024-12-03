import Constants from "expo-constants";
import * as Device from "expo-device";
import { Platform } from "react-native";

export const useDeviceSystem = (onResponse) => {
  const isAndroid = Platform.OS === "android";
  const isIos = Platform.OS === "ios";

  const fetchDeviceSystemForAppSet = () => {
    return onResponse({
      fetchDeviceSystemForAppSet: {
        appVersion:
          (isAndroid && Constants.expoConfig?.android?.versionCode) ||
          (isIos && Constants.expoConfig?.ios?.buildNumber),
      },
    });
  };

  const fetchDevicePlatformSet = () => {
    return onResponse({
      fetchDevicePlatformSet: {
        os: Platform.OS, // OS 플랫폼 ex) android, ios
        onVersion: Device.osVersion, // OS 버전 ex) ios 14.0.0
        modalName: Device.modelName, // 기종명 ex) iPhone 12 Pro Max
      },
    });
  };

  return { fetchDeviceSystemForAppSet, fetchDevicePlatformSet };
};
