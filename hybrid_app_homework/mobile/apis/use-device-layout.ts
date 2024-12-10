import { useState } from "react";

export const useDeviceLayout = (onResponse: any) => {
  const [layout, setLayout] = useState({
    isNotchTranslucent: false,
    notchContent: "dark-content", // light-content, dark-content, ...
    notchBackgroundColor: "transparent", // transparent, black, ...
    isPinchZoom: false,
  });

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
    toggleDeviceLayoutForNotchTranslucentSet,
    toggleDeviceLayoutForPinchZoomSet,
  };
};
