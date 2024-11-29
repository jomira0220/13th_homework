import { useRef } from "react";
import { StatusBar, SafeAreaView, Platform, Button } from "react-native";
import { WebView } from "react-native-webview";

// const computerAddress = "http://172.16.0.66:3000"; // 내 핸드폰에서 접속하기
const androidEmulatorAddress = "http://10.0.2.2:3000"; // 안드로이드 에뮬레이터에서 접속하기
const iosEmulatorAddress = "http://127.0.0.1:3000"; // IOS 에뮬레이터에서 접속하기

export default function PostMessageDeviceApiPromisePage() {
  const webviewRef = useRef<WebView>(null);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent={false} />
        <WebView
          ref={webviewRef}
          source={{
            uri: `${
              Platform.OS === "android"
                ? androidEmulatorAddress
                : iosEmulatorAddress
            }/section03/03-05-post-message-device-api-promise`,
          }}
          onMessage={(event) => {
            if (!event.nativeEvent.data) return;

            const data = JSON.parse(event.nativeEvent.data);
            switch (data.query) {
              case "fetchDeviceSystemForAppSet": {
                webviewRef.current?.postMessage(
                  JSON.stringify({
                    fetchDeviceSystemForAppSet: {
                      appVersion: "V1.0.0", // expo-constants 라이브러리를 사용하면 조회가 가능하다
                    },
                  })
                );
                break;
              }
              case "fetchDevicePlatformSet": {
                webviewRef.current?.postMessage(
                  JSON.stringify({
                    fetchDevicePlatformSet: {
                      modalName: "삼성 갤럭시 S21", // expo-device 라이브러리를 사용하면 조회가 가능하다
                    },
                  })
                );
                break;
              }
              case "fetchDeviceLocationLatLngSet": {
                webviewRef.current?.postMessage(
                  JSON.stringify({
                    fetchDeviceLocationLatLngSet: {
                      lat: 37.5665, // expo-location 라이브러리를 사용하면 조회가 가능하다
                      lng: 126.978,
                    },
                  })
                );
                break;
              }
            }
          }}
        />
      </SafeAreaView>
    </>
  );
}
