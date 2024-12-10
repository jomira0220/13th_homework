import { useApis } from "@/apis/section08/08-01-android-back";
import { useRef } from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar"; // react-native 에도 StatusBar가 있지만, ios와 android 모두를 지원하는 expo-status-bar를 사용
import { SafeAreaView } from "react-native-safe-area-context"; // react-native 에도 SafeAreaView가 있지만, ios와 android 모두를 지원하는 react-native-safe-area-context를 사용
import { WebView } from "react-native-webview";

const computerAddress = "http://172.31.98.146:3000"; // 내 핸드폰에서 접속하기
const androidEmulatorAddress = "http://10.0.2.2:3000"; // 안드로이드 에뮬레이터에서 접속하기
const iosEmulatorAddress = "http://127.0.0.1:3000"; // IOS 에뮬레이터에서 접속하기

export default function AndroidBackPage() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest, layout } = useApis(webviewRef);

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white" }}
        edges={layout.isNotchTranslucent ? [] : undefined}
      >
        <StatusBar style="dark" />

        <WebView
          ref={webviewRef}
          source={{
            uri: `${
              Platform.OS === "android"
                ? androidEmulatorAddress
                : iosEmulatorAddress
              // computerAddress
            }/section08/08-01-android-back`,
          }}
          // source의 uri를 변경하면 웹뷰 전체가 리렌더링됨
          onMessage={(event) => {
            if (!event.nativeEvent.data) return;

            const request = JSON.parse(event.nativeEvent.data);
            onRequest(request.query, request.variables);
          }}
          textZoom={100}
          setBuiltInZoomControls={layout.isPinchZoom}
        />
      </SafeAreaView>
    </>
  );
}
