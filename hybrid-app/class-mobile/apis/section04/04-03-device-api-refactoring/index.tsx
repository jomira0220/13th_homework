import { useDeviceSystem } from "./01-use-device-system";
import { useDeviceLocation } from "./02-use-device-location";

export const useApis = (webviewRef: any) => {
  const APIS = {
    ...useDeviceSystem(),
    ...useDeviceLocation(),
  };

  const onResponse = (result: any) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  const onRequest = async (query: any) => {
    const result = await APIS[query]();
    onResponse(result);
  };

  return { onResponse, onRequest };
};
