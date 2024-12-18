import { useState } from "react";

export interface ILayout {
  isNotchTranslucent: boolean;
  notchContent: string;
  notchBackgroundColor: string;
  isPinchZoom: boolean;
}

export const useDeviceLayout = (onResponse: any) => {
  // 레이아웃 상태
  const [layout, setLayout] = useState<ILayout>({
    isNotchTranslucent: false,
    notchContent: "dark-content", // light-content, dark-content, ...
    notchBackgroundColor: "transparent", // transparent, black, ...
    isPinchZoom: false,
  });

  // 노치 노출 설정 변경
  const toggleDeviceLayoutForNotchTranslucentSet = (variables) => {
    setLayout((prev) => ({
      ...prev,
      isNotchTranslucent: variables.show,
    }));
    onResponse({
      toggleDeviceLayoutForNotchTranslucentSet: {
        message: "노치 노출 설정 변경완료",
      },
    });
  };

  // 핀치 줌 설정 변경
  const toggleDeviceLayoutForPinchZoomSet = () => {
    setLayout((prev) => ({
      ...prev,
      isPinchZoom: !prev.isPinchZoom,
    }));
    onResponse({
      toggleDeviceLayoutForPinchZoomSet: {
        message: "핀치 줌 설정 변경완료",
      },
    });
  };

  return {
    layout,
    setLayout,
    toggleDeviceLayoutForNotchTranslucentSet,
    toggleDeviceLayoutForPinchZoomSet,
  };
};
