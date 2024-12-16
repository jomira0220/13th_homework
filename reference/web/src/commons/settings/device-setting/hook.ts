import { FETCH_DEVICE_KEY } from ".";
import { usePathname, useRouter } from "next/navigation";
import { webviewlog } from "@/commons/libraries/webview-log";
declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};
const 종료되어야하는페이지들 = ["/solplace-logs", "/mypage"];
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

  const onRoutingBack = (backUrl) => {
    // // 1. 종료되어야하는 페이지라면? => 종료요청

    const isExitPage = 종료되어야하는페이지들.includes(pathname);
    if (isExitPage) return fetchApp({ query: "exitDeviceRoutingForBackSet" });

    //  2. 뒤로가야하는 페이지라면? => 뒤로가기
    // 강제로 뒤로 가야할 주소가 존재한다면,

    // if (backUrl) router.push(backUrl);
    // // 뒤로 가야할 주소가 없는 경우,
    // else {
    //   router.back();
    // }
    document.documentElement.classList.add("뒤로가기");

    //  ios 18 버전 미만에서는 startviewtransition 사용 불가

    if (document.startViewTransition) {
      return document
        .startViewTransition(() => {
          webviewlog(`노원두천재2`);
          router.back();
        })
        .finished.finally(() => {
          webviewlog(`노원두천재3`);
          document.documentElement.classList.remove("뒤로가기");
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
