import { useDeviceSystem } from "./01-use-device-system";
import { useDeviceLocation } from "./02-use-device-location";
import { useDeviceNotifications } from "./03-use-device-notifications";
import { useDeviceLayout } from "./04-use-device-layout";
import { useDeviceRouting } from "./05-use-device-routing";

export const useApis = (webviewRef) => {
  let APIS = {};

  const onResponse = (result) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  const onRequest = (query, variables) => {
    // query : 호출할 api 이름
    // variables : api에 전달할 변수
    APIS[query](variables);
  };

  // refactoring 한번에 주입하기
  [
    useDeviceSystem, //
    useDeviceLocation,
    useDeviceNotifications,
    useDeviceLayout,
    useDeviceRouting,
  ].forEach((useApi) => {
    APIS = { ...APIS, ...useApi(onResponse) };
  });

  return { onResponse, onRequest, layout: APIS.layout };
};
