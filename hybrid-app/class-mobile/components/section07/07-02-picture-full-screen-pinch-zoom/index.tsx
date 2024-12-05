import { useApis } from "@/apis/section07/07-02-picture-full-screen-pinch-zoom";
import { useRef } from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar"; // react-native 에도 StatusBar가 있지만, ios와 android 모두를 지원하는 expo-status-bar를 사용
import { SafeAreaView } from "react-native-safe-area-context"; // react-native 에도 SafeAreaView가 있지만, ios와 android 모두를 지원하는 react-native-safe-area-context를 사용
import { WebView } from "react-native-webview";

const computerAddress = "http://172.31.98.146:3000"; // 내 핸드폰에서 접속하기
const androidEmulatorAddress = "http://10.0.2.2:3000"; // 안드로이드 에뮬레이터에서 접속하기
const iosEmulatorAddress = "http://127.0.0.1:3000"; // IOS 에뮬레이터에서 접속하기

export default function PictureFullScreenPinchZoomPage() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest, layout } = useApis(webviewRef);

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white" }} // 노치의 배경색을 설정
        edges={layout.isNotchTranslucent ? [] : undefined} // 노치에 태그들 겹치는 상태값 처리
      >
        {/* 
        SafeAreaView => 안드로이드 + ios 노치 배경색 및 겹치기 변경 담당
        style={{ flex: 1 }} => 스타일을 통해 화면 전체를 차지하도록 설정, 또한 backgroundColor 속성을 통해 노치의 배경색을 설정할 수 있음
        edges={["top"]} => 노치 어떤 부분을 겹치게 할건지 설정 가능, option) top, bottom, left, right
        layout.isNotchTranslucent => 노치에 태그들 겹치는 상태값 처리 내가 만든 함수로 처리
      */}

        {/* StatusBar => 안드로이드 + ios 노치 글자색 변경 담당 */}
        <StatusBar style="dark" />

        <WebView
          ref={webviewRef}
          source={{
            uri: `${
              // Platform.OS === "android"
              //   ? androidEmulatorAddress
              //   : iosEmulatorAddress
              computerAddress
            }/section07/07-02-picture-full-screen-pinch-zoom`,
          }}
          // source의 uri를 변경하면 웹뷰 전체가 리렌더링됨
          onMessage={(event) => {
            if (!event.nativeEvent.data) return;

            const request = JSON.parse(event.nativeEvent.data);
            onRequest(request.query, request.variables);
          }}
          // textZoom={100} => 웹뷰 내부 글자 크기 강제 고정 설정, 사용자 앱 내 브라우저 폰트 크기 등 개별 설정 막기 위함
          textZoom={100}
          // setBuiltInZoomControls={false} => 웹뷰 내부 줌 컨트롤러 설정
          setBuiltInZoomControls={layout.isPinchZoom}
        />
      </SafeAreaView>
    </>
  );
}
