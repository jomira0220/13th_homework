"use client";

import { useEffect } from "react";

export const 나의요청중인API들 = {};

export default function DeviceSetting({ children }) {
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

  return <>{children}</>;
}
