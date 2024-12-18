import { useDeviceLocation } from "./use-device-location";
import { useDeviceNotifications } from "./use-device-notifications";
import { useDeviceSystem } from "./use-device-system";
import { useDeviceLayout } from "./use-device-layout";
import { useDeviceOpenSettings } from "./use-open-settings";
import { useDeviceAuth } from "./use-device-auth";
import { useDeviceRouting } from "./use-device-routing";
import type { WebView } from "react-native-webview";
import type { ILayout } from "./use-device-layout";

interface IAPIS {
  [key: string]: any;
}

export const useApis = (webviewRef: React.RefObject<WebView>) => {
  let APIS: IAPIS = {};

  const onResponse = (result: any) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  const onRequest = (query: any, variables: any) => {
    APIS[query](variables);
  };

  [
    useDeviceSystem,
    useDeviceLocation,
    useDeviceNotifications,
    useDeviceOpenSettings,
    useDeviceLayout,
    useDeviceRouting,
    useDeviceAuth,
  ].forEach((el) => {
    APIS = { ...APIS, ...el(onResponse) };
  });

  return {
    onRequest,
    onResponse,
    layout: APIS.layout,
    setLayout: APIS.setLayout,
  };
};
