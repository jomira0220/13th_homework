import { SafeAreaView, StatusBar, StyleSheet, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { useRef } from "react";
import { useApis } from "@/commons/hooks/useApis";

// const computerAddress = "http://172.16.0.66:3000"; // 내 핸드폰에서 접속하기
const androidEmulatorAddress = "http://10.0.2.2:3000"; // 안드로이드 에뮬레이터에서 접속하기
const iosEmulatorAddress = "http://127.0.0.1:3000"; // IOS 에뮬레이터에서 접속하기

export default function IndexPage() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest } = useApis(webviewRef);

  return (
    <>
      {/* 이 설정을 사용시 아이폰에서 노치 겹치기 안됨 - 아이폰에서 노치 겹치려면 view 사용 */}
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent={false} // 상태 표시줄 투명하게
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <WebView
          style={styles.content}
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
            onRequest(data.query);
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
