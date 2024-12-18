"use client";

import { webviewLog } from "@/commons/libraries/webview-log";
import { FETCH_DEVICE_KEY } from ".";
import { useRouter, usePathname } from "next/navigation";

declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

// 종료되어야할 페이지
const closePage = ["/solplace-logs", "/mypage"];

export const useDeviceSetting = () => {
  const fetchApp = async <T>({
    query,
    variables = {},
  }: {
    query: string;
    variables?: any;
  }): Promise<T> => {
    const result = await new Promise<T>((resolve) => {
      FETCH_DEVICE_KEY[query] = resolve;
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ query, variables })
      );
    });
    return result;
  };

  const router = useRouter();
  const pathname = usePathname();

  // 뒤로가기 이벤트 => 종료되어야할 페이지인지 확인 후 종료되어야할 페이지라면 앱 종료 이벤트 호출
  const onRoutingBack = (backUrl?: string) => {
    const isExitPage = closePage.includes(pathname);
    if (isExitPage) return fetchApp({ query: "exitDeviceRoutingForBackSet" });

    // 뒤로가기 이벤트 발생시 html에 backMove 클래스 추가
    document.documentElement.classList.add("backMove");

    if (document.startViewTransition) {
      return document
        .startViewTransition(() => {
          webviewLog("startViewTransition 실행");
          // 뒤로가기 이벤트 발생시 backUrl이 있으면 해당 페이지로 이동, 없으면 뒤로가기
          backUrl ? router.push(backUrl) : router.back();
        })
        .finished.finally(() => {
          document.documentElement.classList.remove("backMove");
        });
    } else {
      router.back();
    }
  };

  return {
    fetchApp,
    onRoutingBack,
  };
};
