"use client";

import { useEffect } from "react";

export const FETCH_DEVICE_KEY: any = {
  // fetchDeviceSystemForAppSet: resolve
  // ...
  // ...
};

export default function DeviceSetting({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. 안드로이드에서 수신 대기
    document.addEventListener("message", (message: any) => {
      if (!message.data) return;
      const response = JSON.parse(message.data);
      const query = Object.keys(response)[0];
      const resolve = FETCH_DEVICE_KEY[query];
      resolve({ data: response });
      delete FETCH_DEVICE_KEY[query];
    });

    // 2. IOS에서 수신 대기
    window.addEventListener("message", (message: any) => {
      if (!message.data) return;
      const response = JSON.parse(message.data);
      const query = Object.keys(response)[0];
      const resolve = FETCH_DEVICE_KEY[query];
      resolve({ data: response });
      delete FETCH_DEVICE_KEY[query];
    });
  }, []);

  return <>{children}</>;
}
