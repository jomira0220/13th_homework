import { useEffect } from "react";
import { BackHandler } from "react-native";

export const useDeviceRouting = (onResponse) => {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      onResponse({ back: true }); // 웹뷰한테 뒤로가기 눌렸다고 알려주기 위함
      return true; // 안드로이드 백버튼 내장기능(기본기능) 무시하기 처리
    });
  }, []);

  return {
    // 리턴하지 않고, 백버튼 감지 대기만 하면 됨!
  };
};
