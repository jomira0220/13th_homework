import WebView from "react-native-webview";

type APIS = {
  [key: string]: () => void;
};

type ApiResponse = {
  [K in keyof APIS]: Record<string, any>;
};

type UseApisReturnType = {
  onRequest: (query: keyof APIS) => void;
  onResponse: (result: ApiResponse[keyof APIS]) => void;
};

export const useApis = (webviewRef: React.RefObject<WebView<{}>>): UseApisReturnType => {
  const onResponse = (result: ApiResponse[keyof APIS]) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  const onRequest = (query: keyof APIS) => {
    switch (query) {
      case "fetchDeviceSystemForAppSet": {
        onResponse({ fetchDeviceSystemForAppSet: { appVersion: "v1.0" } }); // expo-constants 라이브러리 설치하면 조회 가능
        break;
      }

      case "fetchDeviceSystemForPlatformSet": {
        onResponse({
          fetchDeviceSystemForPlatformSet: { modelName: "iPhone 7 Plus" }, // expo-device 라이브러리 설치하면 조회 가능
        });
        break;
      }

      case "fetchDeviceLocationForLatLngSet": {
        onResponse({
          fetchDeviceLocationForLatLngSet: { lat: 37, lng: 128 }, // expo-device 라이브러리 설치하면 조회 가능
        });
        break;
      }
    }
  };

  return {
    onRequest,
    onResponse,
  };
};
