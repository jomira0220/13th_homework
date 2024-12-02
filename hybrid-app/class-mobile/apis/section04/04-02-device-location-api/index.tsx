import Constants from "expo-constants"; // 사용법은 docs 참조 https://docs.expo.dev/versions/latest/sdk/constants/
import * as Device from "expo-device"; // 사용법은 docs 참조 https://docs.expo.dev/versions/latest/sdk/device/
import { Platform } from "react-native";
import * as Location from "expo-location";

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
            os: Platform.OS, // OS 플랫폼 ex) android, ios
            onVersion: Device.osVersion, // OS 버전 ex) ios 14.0.0
            modalName: Device.modelName, // 기종명 ex) iPhone 12 Pro Max
          },
        });
        break;
      }
      case "fetchDeviceLocationLatLngSet": {
        const 권한허락받고요청하기 = async () => {
          const result = await Location.requestForegroundPermissionsAsync(); // 사용자에게 위치 권한 요청하는 팝업을 띄움
          if (result.status === "granted") {
            // 사용자가 권한을 준 경우
            const location = await Location.getCurrentPositionAsync(); // 사용자가 권한을 준 경우 현재 위치 정보 가져오기
            onResponse({
              fetchDeviceLocationLatLngSet: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
              },
            });
          } else {
            // 권한을 주지 않은 경우
            onResponse({
              fetchDeviceLocationLatLngSet: {
                lat: 37.5665,
                lng: 126.978,
              },
            });
          }
        };
        권한허락받고요청하기();

        break;
      }
    }
  };

  return { onResponse, onRequest };
};
