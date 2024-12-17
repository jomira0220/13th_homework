import * as Location from "expo-location";

export const useDeviceLocation = (onResponse: any) => {
  // 위치(위도, 경도) 정보를 가져오는 훅
  const fetchDeviceLocationForLatLngSet = async () => {
    const result = await Location.requestForegroundPermissionsAsync();
    if (result.status === "granted") {
      const location = await Location.getCurrentPositionAsync();
      onResponse({
        fetchDeviceLocationForLatLngSet: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });
    } else {
      onResponse({ fetchDeviceLocationForLatLngSet: { lat: 37, lng: 128 } });
    }
  };

  // 위치 정보 제공 권한 상태를 가져오는 훅
  const fetchDeviceLocationForPermissionSet = async () => {
    const result = await Location.getForegroundPermissionsAsync(); // getForegroundPermissionsAsync
    onResponse({
      fetchDeviceLocationForPermissionSet: {
        status: result.status,
      },
    });
  };

  // 위치 정보 제공 권한을 요청하는 훅
  const requestDeviceLocationForPermissionSet = async () => {
    const result = await Location.requestForegroundPermissionsAsync(); // requestForegroundPermissionsAsync
    onResponse({
      requestDeviceLocationForPermissionSet: {
        status: result.status,
      },
    });
  };

  return {
    fetchDeviceLocationForLatLngSet,
    fetchDeviceLocationForPermissionSet,
    requestDeviceLocationForPermissionSet,
  };
};
