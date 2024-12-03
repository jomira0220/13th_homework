import { useDeviceSystem } from "./01-use-device-system";
import { useDeviceLocation } from "./02-use-device-location";
import { useDeviceNotifications2 } from "./03-use-device-notifications2";

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

  // APIS = {
  //   ...useDeviceSystem(onResponse),
  //   ...useDeviceLocation(onResponse),
  //   ...useDeviceNotifications2(onResponse),
  // };

  // refactoring 한번에 주입하기
  [
    useDeviceSystem, //
    useDeviceLocation,
    useDeviceNotifications2,
  ].forEach((useApi) => {
    APIS = { ...APIS, ...useApi(onResponse) };
  });

  return { onResponse, onRequest };
};
