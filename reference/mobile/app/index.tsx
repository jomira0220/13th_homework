import { useApis } from "@/apis";
import { useCallback, useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import * as SecureStore from "expo-secure-store";

const URI = "172.16.0.26";

export default function 나의시작화면() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest, layout, setLayout } = useApis(webviewRef);

  const [url, setUrl] = useState(`http://${URI}:3000/splash`);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        //  로그인여부 판단해서
        const token = await SecureStore.getItemAsync("refreshToken");

        // refreshToken 이 있는경우 => 로그인이 되어있어!
        if (token) setUrl(`http://${URI}:3000/solplace-logs`);
        // refreshToken이 없는경우 => 로그인이 되어있지 않아!
        else if (!token) setUrl(`http://${URI}:3000/login`);

        setIsLoading(true);
        setTimeout(() => {
          setLayout((prev) => ({ ...prev, isNotchTranslucent: false }));
          setTimeout(() => {
            setIsLoading(false);
          }, 100);
        }, 100);
      }
    }

    prepare();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      edges={layout.isNotchTranslucent ? [] : undefined}
    >
      <StatusBar />

      <WebView
        ref={webviewRef}
        source={{ uri: url }}
        onMessage={(e) => {
          if (!e.nativeEvent.data) return;

          const request = JSON.parse(e.nativeEvent.data);
          onRequest(request.query, request.variables);
        }}
        setBuiltInZoomControls={layout?.isPinchZoom}
        style={{ display: isLoading ? "none" : "flex" }}
      />
    </SafeAreaView>
  );
}
