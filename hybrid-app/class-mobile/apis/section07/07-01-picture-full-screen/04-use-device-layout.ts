import { useState } from "react";

export const useDviceLayout = (onResponse) => {
  const [layout, setLayout] = useState({
    isNotchTranslucent: false, // 노치 겹침 상태
    // notchContent: "dark-content", // 노치 글자색 테마 상태
    // notchBackgroundColor: "transparent", // 노치 배경색 상태
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

  return {
    layout,
    toggleDeviceLayoutForNotchTranslucentSet,
  };
};
