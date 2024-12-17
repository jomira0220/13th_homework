import { Linking } from "react-native";

export const useDeviceOpenSettings = (onResponse: any) => {
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