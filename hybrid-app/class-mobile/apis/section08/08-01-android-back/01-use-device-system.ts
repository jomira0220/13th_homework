import Constants from "expo-constants";
import * as Device from "expo-device";
import { Platform, Linking, AppState } from "react-native";

export const useDeviceSystem = (onResponse) => {
  const isAndroid = Platform.OS === "android";
  const isIos = Platform.OS === "ios";

  // 1. 앱 버전 정보 가져오는 함수
  const fetchDeviceSystemForAppSet = () => {
    return onResponse({
      fetchDeviceSystemForAppSet: {
        appVersion:
          (isAndroid && Constants.expoConfig?.android?.versionCode) ||
          (isIos && Constants.expoConfig?.ios?.buildNumber),
      },
    });
  };

  // 2. 플랫폼 정보를 가져오는 함수
  const fetchDevicePlatformSet = () => {
    return onResponse({
      fetchDevicePlatformSet: {
        os: Platform.OS, // OS 플랫폼 ex) android, ios
        onVersion: Device.osVersion, // OS 버전 ex) ios 14.0.0
        modalName: Device.modelName, // 기종명 ex) iPhone 12 Pro Max
      },
    });
  };

  // 06-01-open-settings에서 추가된 코드 => 핸드폰의 셋팅화면을 열기
  const openDeviceSystemForSettingSet = async () => {
    await Linking.openSettings(); // 셋팅화면으로 이동
    return onResponse({
      openDeviceSystemForSettingSet: {
        message: "셋팅화면으로 이동완료",
      },
    });
  };

  // 06-01-open-settings에서 추가된 코드 => 앱의 상태를 확인하는 함수
  // 현재 나의 앱의 상태가 포그라운드인지 백그라운드인지 확인하는 작업이 필요해서 추가
  const fetchDeviceSystemForAppStateSet = () => {
    const isForground = AppState.currentState === "active"; // 현재 앱이 포그라운드인지 확인
    return onResponse({
      fetchDeviceSystemForAppStateSet: { isForground },
    });
  };

  return {
    fetchDeviceSystemForAppSet,
    fetchDevicePlatformSet,
    openDeviceSystemForSettingSet,
    fetchDeviceSystemForAppStateSet,
  };
};
