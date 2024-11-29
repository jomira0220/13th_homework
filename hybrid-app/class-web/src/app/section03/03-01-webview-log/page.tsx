"use client";

import { webviewlog } from "@/commons/libraries/03-01-webview-log";

export default function WebViewLogPage() {
  const onClickButton = () => {
    console.log(
      "버튼이 클릭되었습니다. 이것은 웹 로그입니다. 크롬인스팩트에서 확인!"
    );
    webviewlog(); // 이것은 Next 서버에서 실행되는 로그입니다.
  };
  return <button onClick={onClickButton}>버튼 클릭하기</button>;
}
