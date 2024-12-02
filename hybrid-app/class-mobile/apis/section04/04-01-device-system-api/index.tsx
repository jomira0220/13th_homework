import Constants from "expo-constants"; // 사용법은 docs 참조 https://docs.expo.dev/versions/latest/sdk/constants/
import * as Device from "expo-device"; // 사용법은 docs 참조 https://docs.expo.dev/versions/latest/sdk/device/
import { Platform } from "react-native";

export const useApis = (webviewRef: any) => {
  const onResponse = (result: any) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  const isAndroid = Platform.OS === "android";
  const isIos = Platform.OS === "ios";

  const onRequest = (query: any) => {
    switch (query) {
      case "fetchDeviceSystemForAppSet": {
        onResponse({
          fetchDeviceSystemForAppSet: {
            appVersion:
              (isAndroid && Constants.expoConfig?.android?.versionCode) ||
              (isIos && Constants.expoConfig?.ios?.buildNumber),
          },
        });
        break;
      }
      case "fetchDevicePlatformSet": {
        onResponse({
          fetchDevicePlatformSet: {
            os: Platform.OS,
            onVersion: Device.osVersion, // OS 버전 ex) ios 14.0.0
            modalName: Device.modelName, // 기종명 ex) iPhone 12 Pro Max
          },
        });
        break;
      }
      case "fetchDeviceLocationLatLngSet": {
        onResponse({
          fetchDeviceLocationLatLngSet: {
            lat: 37.5665,
            lng: 126.978,
          },
        });
        break;
      }
    }
  };

  return { onResponse, onRequest };
};
