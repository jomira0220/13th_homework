import { useApis } from "@/apis/section07/07-01-picture-full-screen";
import { useRef } from "react";
import { StatusBar, SafeAreaView, Platform, View } from "react-native";
import { WebView } from "react-native-webview";

// const computerAddress = "http://172.16.0.66:3000"; // 내 핸드폰에서 접속하기
const androidEmulatorAddress = "http://10.0.2.2:3000"; // 안드로이드 에뮬레이터에서 접속하기
const iosEmulatorAddress = "http://127.0.0.1:3000"; // IOS 에뮬레이터에서 접속하기

export default function PictureFullScreenPage() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest, layout } = useApis(webviewRef);

  return (
    <>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      {/* layout.isNotchTranslucent => 노치에 태그들 겹치는 상태값 처리 */}
      {Platform.OS === "android" && (
        <StatusBar translucent={layout.isNotchTranslucent} />
      )}
      {Platform.OS === "ios" &&
        (layout.isNotchTranslucent ? (
          <StatusBar translucent={layout.isNotchTranslucent} />
        ) : (
          <SafeAreaView />
        ))}

      <WebView
        ref={webviewRef}
        source={{
          uri: `${
            Platform.OS === "android"
              ? androidEmulatorAddress
              : iosEmulatorAddress
          }/section07/07-01-picture-full-screen`,
        }}
        // source의 uri를 변경하면 웹뷰 전체가 리렌더링됨
        onMessage={(event) => {
          if (!event.nativeEvent.data) return;

          const request = JSON.parse(event.nativeEvent.data);
          onRequest(request.query, request.variables);
        }}
      />
      {/* </SafeAreaView> */}
    </>
  );
}
