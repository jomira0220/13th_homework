import { useLibs } from "@/commons/hooks/useLibs";

export const useApis = (webviewRef: RefObject<WebView>) => {
  const APIS = { ...useLibs() };
  const onResponse = (result) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  const onRequest = async (query) => {
    const result = await APIS[query]();
    onResponse(result);
  };

  return { onResponse, onRequest };
};
