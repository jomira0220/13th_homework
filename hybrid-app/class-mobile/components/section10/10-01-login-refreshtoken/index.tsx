import { useApis } from "@/apis/section10_/10-01-login-refreshtoken";
import { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Platform } from "react-native";

const computerAddress = "http://172.31.98.146:3000"; // 내 핸드폰에서 접속하기
const androidEmulatorAddress = "http://10.0.2.2:3000"; // 안드로이드 에뮬레이터에서 접속하기
const iosEmulatorAddress = "http://127.0.0.1:3000"; // IOS 에뮬레이터에서 접속하기

export default function LoginRefreshtokenPage() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest, layout } = useApis(webviewRef);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }} // 안드로이드 + IOS 노치 배경색
      edges={layout.isNotchTranslucent ? [] : undefined} // 안드로이드 + IOS 노치 겹치기
    >
      <StatusBar
        style="dark" // 안드로이드 + IOS 노치 글자색
      />

      <WebView
        ref={webviewRef}
        source={{
          uri: `${
            Platform.OS === "android"
              ? androidEmulatorAddress
              : iosEmulatorAddress
          }/section10/10-01-login-refreshtoken`,
        }}
        onMessage={(event) => {
          if (!event.nativeEvent.data) return;

          const request = JSON.parse(event.nativeEvent.data);
          onRequest(request.query, request.variables);
        }}
        // textZoom={100} 텍스트 크기 강제 고정 => 사용자 앱 내 브라우저 폰트크기 등 개별설정 막기
        // setBuiltInZoomControls={layout.isPinchZoom} // 핀치줌 허용 여부(단, 안드로이드에서만 작동하므로 => 브라우저 viewport로 변경하자!)
      />
    </SafeAreaView>
  );
}
