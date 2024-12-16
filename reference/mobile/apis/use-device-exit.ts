import { useEffect, useState } from "react";
import { BackHandler, ToastAndroid } from "react-native";

export const useDeviceExit = (onResponse) => {
  const [exitCount, setExitCount] = useState(0);

  useEffect(() => {
    const backHandler = () => {
      if (exitCount >= 1) {
        BackHandler.exitApp(); // '뒤로' 버튼을 2번 눌렀으므로 종료
      } else {
        onResponse({ back: true }); // 웹에 뒤로가기 눌렸다고 알려주기
      }

      return true; // 안드로이드 백버튼 기본기능 무시하기
    };
    BackHandler.addEventListener("hardwareBackPress", backHandler);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backHandler);
    };
    // }, []);
  }, [exitCount]); // exitCount 증가되어 새로운 useEffect가 재실행되면? 기존의 addEventListener 제거해야됨(메모리누수)

  // // 09-04-android-back-exit => 안드로이드 백버튼과 종료기능 연결
  const exitDeviceRoutingForBackSet = () => {
    setExitCount((prev) => prev + 1);
    ToastAndroid.show("'뒤로' 버튼을 한번 더 누르면, 앱이 종료됩니다.", ToastAndroid.SHORT); // prettier-ignore
    setTimeout(() => setExitCount(0), 2000); // 2초 후 원상복귀
    onResponse({
      exitDeviceRoutingForBackSet: {
        message: "종료시도",
      },
    });
  };

  return {
    exitDeviceRoutingForBackSet,
  };
};
