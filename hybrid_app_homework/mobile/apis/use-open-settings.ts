import { Linking } from "react-native";

export const useDeviceOpenSettings = (onResponse: any) => {
  // 디바이스 설정으로 이동
  const openDeviceSystemForSettingSet = async () => {
    await Linking.openSettings();
    onResponse({
      openDeviceSystemForSettingSet: {
        message: "설정 이동완료",
      },
    });
  };
  return {
    openDeviceSystemForSettingSet,
  };
};
