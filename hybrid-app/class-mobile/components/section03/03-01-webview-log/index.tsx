import { StatusBar, SafeAreaView, Button } from "react-native";
import { WebView } from "react-native-webview";

// const computerAddress = "http://172.16.0.66:3000"; // 내 핸드폰에서 접속하기
const androidEmulatorAddress = "http://10.0.2.2:3000"; // 안드로이드 에뮬레이터에서 접속하기
// const iosEmulatorAddress = "http://127.0.0.1:3000"; // IOS 에뮬레이터에서 접속하기

export default function WebViewLogPage() {
  const onPressButton = () => {
    console.log("버튼이 눌렸습니다. 이것은 모바일 로그입니다.");
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent={false} />
        <WebView
          source={{
            uri: `${androidEmulatorAddress}/section03/03-01-webview-log`,
          }}
        />
        <Button onPress={onPressButton} title="모바일 로그를 확인하세요!" />
      </SafeAreaView>
    </>
  );
}
