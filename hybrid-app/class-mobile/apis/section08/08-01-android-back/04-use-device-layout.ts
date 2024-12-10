import { useState } from "react";

export const useDeviceLayout = (onResponse) => {
  const [layout, setLayout] = useState({
    isNotchTranslucent: false, // 노치 겹침 상태
    // notchContent: "dark-content", // 노치 글자색 테마 상태
    // notchBackgroundColor: "transparent", // 노치 배경색 상태
    isPinchZoom: false, // 핀치 줌 상태
  });

  const toggleDeviceLayoutForNotchTranslucentSet = () => {
    setLayout((prev) => ({
      ...prev,
      isNotchTranslucent: !prev.isNotchTranslucent,
    }));

    onResponse({
      toggleDeviceLayoutForNotchTranslucentSet: {
        message: "변경완료",
      },
    });
  };

  // 07-02-picture-full-screen-pinch-zoom => 핀치 줌 토글 api 추가
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
