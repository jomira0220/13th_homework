"use client";

import { useEffect } from "react";

declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

export default function PostMessageDeviceApiPage() {
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

  const onClickSystemVersion = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        query: "fetchDeviceSystemForAppSet",
      })
    );
  };

  const onClickSystemPlatform = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        query: "fetchDeviceSystemPlatformSet",
      })
    );
  };

  const onClickLocationLatLng = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        query: "fetchDeviceSystemLocationLatLngSet",
      })
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={onClickSystemVersion}
        className="bg-black text-white rounded-lg p-3"
      >
        App아! 내 핸드폰 버전 정보 좀 알려줘!
      </button>

      <button
        onClick={onClickSystemPlatform}
        className="bg-black text-white rounded-lg p-3"
      >
        App아! 내 핸드폰 기종 정보 좀 알려줘!
      </button>

      <button
        onClick={onClickLocationLatLng}
        className="bg-black text-white rounded-lg p-3"
      >
        App아! 내 핸드폰 위치 정보 알려줘!
      </button>
    </div>
  );
}
