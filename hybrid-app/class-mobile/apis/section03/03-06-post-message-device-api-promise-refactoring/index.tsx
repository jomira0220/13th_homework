export const useApis = (webviewRef: any) => {
  const onResponse = (result: any) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  const onRequest = (query: any) => {
    switch (query) {
      case "fetchDeviceSystemForAppSet": {
        onResponse({
          fetchDeviceSystemForAppSet: {
            appVersion: "V1.0.0",
          },
        });
        break;
      }
      case "fetchDevicePlatformSet": {
        onResponse({
          fetchDevicePlatformSet: {
            modalName: "삼성 갤럭시 S21",
          },
        });
        break;
      }
      case "fetchDeviceLocationLatLngSet": {
        onResponse({
          fetchDeviceLocationLatLngSet: {
            lat: 37.5665,
            lng: 126.978,
          },
        });
        break;
      }
    }
  };

  return { onResponse, onRequest };
};
