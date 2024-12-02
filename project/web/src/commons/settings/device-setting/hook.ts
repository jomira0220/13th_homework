import { FETCH_DEVICE_KEY } from ".";

declare const window: Window & {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
};

// 각 쿼리 응답 타입 정의
export interface DeviceSystemForAppSetResponse {
  data: {
    fetchDeviceSystemForAppSet: {
      appVersion: string;
    };
  };
}

export interface DeviceSystemForPlatformSetResponse {
  data: {
    fetchDeviceSystemForPlatformSet: {
      modelName: string;
    };
  };
}

export interface DeviceLocationForLatLngSetResponse {
  data: {
    fetchDeviceLocationForLatLngSet: {
      lat: number;
      lng: number;
    };
  };
}

export const useDeviceSetting = () => {
  const fetchApp = <T>({ query }: { query: string }): Promise<T> => {
    return new Promise((resolve) => {
      FETCH_DEVICE_KEY[query] = resolve;

      window.ReactNativeWebView.postMessage(JSON.stringify({ query }));
    });
  };

  return {
    fetchApp,
  };
};
