import { Platform, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useEffect, useRef, useState } from "react";
import { useApis } from "@/apis";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { getStatusBarHeight } from "react-native-status-bar-height";
import * as SecureStore from "expo-secure-store";
import type { ILayout } from "@/apis/use-device-layout";

// const computerAddress = "http://172.16.0.66:3000"; // 내 핸드폰에서 접속하기
const androidEmulatorAddress = "http://10.0.2.2:3000"; // 안드로이드 에뮬레이터에서 접속하기
const iosEmulatorAddress = "http://127.0.0.1:3000"; // IOS 에뮬레이터에서 접속하기
const URI = `${
  Platform.OS === "ios" ? iosEmulatorAddress : androidEmulatorAddress
}`;

export default function IndexPage() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest, layout, setLayout } = useApis(webviewRef);
  const [FirstPageUrl, setFirstPageUrl] = useState(`${URI}/splash`);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loginCheck() {
      try {
        // 가상 api 호출
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // 로그인 여부 확인
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        if (refreshToken) setFirstPageUrl(`${URI}/solplace-logs/`);
        else if (!refreshToken) setFirstPageUrl(`${URI}/login`);

        setIsLoading(true);
        setTimeout(() => {
          setLayout((prev: ILayout) => ({
            ...prev,
            isNotchTranslucent: false,
          }));
          setTimeout(() => {
            setIsLoading(false);
          }, 100);
        }, 100);
      }
    }

    loginCheck();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={layout.isNotchTranslucent ? [] : undefined}
    >
      <StatusBar style="dark" />
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: FirstPageUrl,
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
  );
}
