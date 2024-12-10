import { Platform, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useRef } from "react";
import { useApis } from "@/apis";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { getStatusBarHeight } from "react-native-status-bar-height";

// const computerAddress = "http://172.16.0.66:3000"; // 내 핸드폰에서 접속하기
const androidEmulatorAddress = "http://10.0.2.2:3000"; // 안드로이드 에뮬레이터에서 접속하기
const iosEmulatorAddress = "http://127.0.0.1:3000"; // IOS 에뮬레이터에서 접속하기

export default function IndexPage() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest, layout } = useApis(webviewRef);

  let ScreenWidth = Dimensions.get("window").width; //screen 너비
  let screenHeight =
    Dimensions.get("window").height - getStatusBarHeight() - getBottomSpace();

  return (
    <>
      {/* 이 설정을 사용시 아이폰에서 노치 겹치기 안됨 - 아이폰에서 노치 겹치려면 view 사용 */}
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#fff" }}
        edges={layout.isNotchTranslucent ? [] : undefined}
      >
        <StatusBar style="dark" />
        <WebView
          style={{ flex: 1 }}
          source={{
            uri: `${
              Platform.OS === "ios"
                ? iosEmulatorAddress
                : androidEmulatorAddress
            }/solplace-logs/`,
          }}
          onMessage={(event) => {
            if (!event.nativeEvent.data) return;
            const data = JSON.parse(event.nativeEvent.data);
            onRequest(data.query, data.variables);
          }}
          textZoom={100}
          setDisplayZoomControls={layout.isPinchZoom}
          setBuiltInZoomControls={layout.isPinchZoom}
        />
      </SafeAreaView>
    </>
  );
}
