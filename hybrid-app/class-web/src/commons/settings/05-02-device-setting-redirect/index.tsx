"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const 나의요청중인API들 = {};

export default function DeviceSettingRedirect({ children }) {
  const router = useRouter();

  useEffect(() => {
    //
    // 1. 안드로이드에서 수신 대기
    document.addEventListener("message", (message: any) => {
      if (!message.data) return; // 메시지가 없으면 무시

      const response = JSON.parse(message.data); // 받은 데이터를 JSON으로 변환
      if (response.redirect) return router.push(response.redirect); // 받은 데이터에 redirect가 있으면 페이지 이동

      const queryName = `${Object.keys(response)[0]}`;
      const resolve = 나의요청중인API들[queryName];
      resolve({ data: response });
      delete 나의요청중인API들[queryName];
    });

    // 2. ios에서 수신 대기
    window.addEventListener("message", (message: any) => {
      if (!message.data) return; // 메시지가 없으면 무시

      const response = JSON.parse(message.data); // 받은 데이터를 JSON으로 변환
      if (response.redirect) return router.push(response.redirect); // 받은 데이터에 redirect가 있으면 페이지 이동

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
