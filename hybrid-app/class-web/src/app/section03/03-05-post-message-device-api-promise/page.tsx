"use client";

import { useEffect } from "react";

declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

const 나의요청중인API들 = {
  // fetchDeviceSystemForAppSet: null, => API 요청시 추후에 null 대신에 resolve가 들어옴
  // fetchDeviceSystemForAppSet: resolve111
  // fetchDeviceSystemForAppSet: resolve222
  // fetchDeviceSystemForAppSet: resolve333 => 각 요청한 API에 대한 resolve가 들어옴
};

export default function PostMessageDeviceApiPromisePage() {
  useEffect(() => {
    // 1. 안드로이드에서 수신 대기
    document.addEventListener("message", (message: any) => {
      const response = JSON.parse(message.data);
      const queryName = `${Object.keys(response)[0]}`;
      const resolve = 나의요청중인API들[queryName];
      resolve({
        data: response,
      });
      delete 나의요청중인API들[queryName];
    });

    // 2. ios에서 수신 대기
    window.addEventListener("message", (message: any) => {
      const response = JSON.parse(message.data);
      const queryName = `${Object.keys(response)[0]}`;
      const resolve = 나의요청중인API들[queryName];
      resolve({
        data: response,
      });
      delete 나의요청중인API들[queryName];
    });
  }, []);

  const onClickSystemVersion = async () => {
    const result = await new Promise((resolve) => {
      나의요청중인API들["fetchDeviceSystemForAppSet"] = resolve;

      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          query: "fetchDeviceSystemForAppSet",
        })
      );
    });

    alert(result.data.fetchDeviceSystemForAppSet.appVersion);
  };

  const onClickSystemPlatform = async () => {
    const result = await new Promise((resolve) => {
      나의요청중인API들["fetchDevicePlatformSet"] = resolve;

      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          query: "fetchDevicePlatformSet",
        })
      );
    });
    alert(result.data.fetchDevicePlatformSet.modalName);
  };

  const onClickLocationLatLng = async () => {
    const result = await new Promise((resolve) => {
      나의요청중인API들["fetchDeviceLocationLatLngSet"] = resolve;

      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          query: "fetchDeviceLocationLatLngSet",
        })
      );
    });
    alert(
      `${result.data.fetchDeviceLocationLatLngSet.lat}, ${result.data.fetchDeviceLocationLatLngSet.lng}`
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
