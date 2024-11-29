import { useRef } from "react";
import { StatusBar, SafeAreaView, Platform, Button } from "react-native";
import { WebView } from "react-native-webview";

// const computerAddress = "http://172.16.0.66:3000"; // 내 핸드폰에서 접속하기
const androidEmulatorAddress = "http://10.0.2.2:3000"; // 안드로이드 에뮬레이터에서 접속하기
const iosEmulatorAddress = "http://127.0.0.1:3000"; // IOS 에뮬레이터에서 접속하기

export default function PostMessageAppToWebPage() {
  const webviewRef = useRef<WebView>(null);

  const onPressButton = () => {
    webviewRef.current?.postMessage(`안녕하세요! 바나나!`);
  };

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
            }/section03/03-03-post-message-app-to-web`,
          }}
        />
        <Button onPress={onPressButton} title="web아! 데이터 보내줄께!" />
      </SafeAreaView>
    </>
  );
}
