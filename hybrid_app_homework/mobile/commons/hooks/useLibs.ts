import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Location from "expo-location";

export const useLibs = () => {
  const isAndroid = Platform.OS === "android";
  const isIOS = Platform.OS === "ios";

  // 사용자의 앱 버전 정보를 가져오는 함수
  const fetchDeviceSystemForAppSet = () => {
    return {
      appVersion:
        (isAndroid && Constants.expoConfig?.android?.versionCode) ||
        (isIOS && Constants.expoConfig?.ios?.buildNumber),
    };
  };

  // 사용자의 디바이스 정보를 가져오는 함수
  const fetchDevicePlatformSet = () => {
    return {
      fetchDevicePlatformSet: {
        os: Platform.OS,
        onVersion: Device.osVersion,
        modalName: Device.modelName,
      },
    };
  };

  // 사용자의 현재 위치 정보를 가져오는 함수
  const fetchDeviceLocationLatLngSet = async () => {
    const result = await Location.requestForegroundPermissionsAsync(); // 사용자에게 위치 권한 요청하는 팝업을 띄움
    if (result.status === "granted") {
      // 사용자가 권한을 준 경우
      const location = await Location.getCurrentPositionAsync(); // 사용자가 권한을 준 경우 현재 위치 정보 가져오기
      return {
        fetchDeviceLocationLatLngSet: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      };
    } else {
      // 권한을 주지 않은 경우 - 임의의 위치 정보를 반환
      return {
        fetchDeviceLocationLatLngSet: {
          lat: 37.5665,
          lng: 126.978,
        },
      };
    }
  };

  return {
    fetchDeviceSystemForAppSet,
    fetchDevicePlatformSet,
    fetchDeviceLocationLatLngSet,
  };
};
