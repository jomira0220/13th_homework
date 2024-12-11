import { useApis } from "@/apis/section12/12-01-micro-frontend";
import { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Text, View } from "react-native";

const 내게시판_서비스_접속주소 = "http://10.0.2.2:3000"; // 안드로이드 에뮬레이터에서 접속하기
const 내설정_서비스_접속주소 = "http://10.0.2.2:3500"; // 안드로이드 에뮬레이터에서 접속하기

export default function PullToRefreshPage() {
  const webviewRef = useRef<WebView>(null);
  const { onRequest, layout } = useApis(webviewRef);

  const [menuState, setMenuState] = useState("게시판");

  const onPressMenu = (menuName: string) => () => {
    setMenuState(menuName);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }} // 안드로이드 + IOS 노치 배경색
      edges={layout.isNotchTranslucent ? [] : undefined} // 안드로이드 + IOS 노치 겹치기
    >
      <StatusBar
        style="dark" // 안드로이드 + IOS 노치 글자색
      />

      {/* 12-01-micro-frontend => 메뉴1: [ 게시판 ] */}
      <WebView
        ref={menuState === "게시판" ? webviewRef : null} // 12-01-micro-frontend에서 수정
        source={{
          uri: `${내게시판_서비스_접속주소}/section12/12-01-micro-frontend`,
        }}
        onMessage={(event) => {
          if (!event.nativeEvent.data) return;

          const request = JSON.parse(event.nativeEvent.data);
          onRequest(request.query, request.variables);
        }}
        style={{ display: menuState === "게시판" ? "flex" : "none" }} // 12-01-micro-frontend에서 추가
      />

      {/* 12-01-micro-frontend => 메뉴2: [ 내설정 ] */}
      <WebView
        ref={menuState === "내설정" ? webviewRef : null} // 12-01-micro-frontend에서 수정
        source={{
          uri: `${내설정_서비스_접속주소}/section12/12-01-micro-frontend`,
        }}
        onMessage={(event) => {
          if (!event.nativeEvent.data) return;

          const request = JSON.parse(event.nativeEvent.data);
          onRequest(request.query, request.variables);
        }}
        style={{ display: menuState === "내설정" ? "flex" : "none" }} // 12-01-micro-frontend에서 추가
      />

      {/* 12-01-micro-frontend => 바텀네비게이션 추가 */}
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text onPress={onPressMenu("게시판")}>[ 게시판 ]</Text>
        <Text onPress={onPressMenu("내설정")}>[ 내설정 ]</Text>
      </View>
    </SafeAreaView>
  );
}
