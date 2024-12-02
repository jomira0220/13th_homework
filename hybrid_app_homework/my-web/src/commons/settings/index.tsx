"use client";

import { useEffect } from "react";

export const requestedApis: { [key: string]: (response: any) => void } = {};

export default function DataSetting({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 01. 안드로이드
    document.addEventListener("message", (message: any) => {
      const response = JSON.parse(message.data);
      const queryName = `${Object.keys(response)[0]}`;
      const resolve = requestedApis[queryName];
      resolve({
        data: response,
      });
      delete requestedApis[queryName];
    });

    // 2. ios에서 수신 대기
    window.addEventListener("message", (message: any) => {
      const response = JSON.parse(message.data);
      const queryName = `${Object.keys(response)[0]}`;
      const resolve = requestedApis[queryName];
      resolve({
        data: response,
      });
      delete requestedApis[queryName];
    });
  }, []);

  return <>{children}</>;
}
