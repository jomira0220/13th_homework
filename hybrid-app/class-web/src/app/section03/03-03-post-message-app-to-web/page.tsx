"use client";

import { useEffect } from "react";

export default function PostMessageAppToWebPage() {
  useEffect(() => {
    // 1. 안드로이드에서 수신 대기
    document.addEventListener("message", (message: any) => {
      alert(`안드로이드 앱에서 보낸 데이터: ${message.data}`);
    });

    // 2. ios에서 수신 대기
    window.addEventListener("message", (message: any) => {
      alert(`ios 앱에서 보낸 데이터: ${message.data}`);
    });
  }, []);
  return <div>저는 웹입니다!</div>;
}
