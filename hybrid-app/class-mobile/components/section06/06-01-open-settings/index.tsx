import { useApis } from "@/apis/section06/06-01-open-settings";
import { useRef } from "react";
import { StatusBar, SafeAreaView, Platform } from "react-native";
import { WebView } from "react-native-webview";

// const computerAddress = "http://172.16.0.66:3000"; // 내 핸드폰에서 접속하기
const androidEmulatorAddress = "http://10.0.2.2:3000"; // 안드로이드 에뮬레이터에서 접속하기
const iosEmulatorAddress = "http://127.0.0.1:3000"; // IOS 에뮬레이터에서 접속하기

export default function OpenSettingsPage() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest } = useApis(webviewRef);

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
            }/section06/06-01-open-settings`,
          }}
          // source의 uri를 변경하면 웹뷰 전체가 리렌더링됨
          onMessage={(event) => {
            if (!event.nativeEvent.data) return;

            const request = JSON.parse(event.nativeEvent.data);
            onRequest(request.query, request.variables);
          }}
        />
      </SafeAreaView>
    </>
  );
}
