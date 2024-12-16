"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDeviceSetting } from "./hook";

export const FETCH_DEVICE_KEY: { [key: string]: any } = {};

export default function DeviceSetting({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { onRoutingBack } = useDeviceSetting();
  // web으로만 봤을때 나오는 response JSON 오류는 무시해줘도 됨.
  useEffect(() => {
    const messageHandler = (message: any) => {
      if (!message.data) return;
      const response = JSON.parse(message.data);

      if (response.redirect) {
        return router.push(response.redirect);
      }

      if (response.back) {
        return onRoutingBack();
      }

      const query = Object.keys(response)[0];
      const resolve = FETCH_DEVICE_KEY[query];
      if (typeof resolve === "function") {
        resolve({ data: response });
        delete FETCH_DEVICE_KEY[query];
      } else {
        console.warn(`No function found for key: ${query}`);
      }
    };
    // 1. 안드로이드에서 수신 대기
    document.addEventListener("message", messageHandler);
    // 2. IOS에서 수신 대기
    window.addEventListener("message", messageHandler);
    return () => {
      document.removeEventListener("message", messageHandler);
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  return <>{children}</>;
}
