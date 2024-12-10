import * as Location from "expo-location";

export const useDeviceLocation = (onResponse) => {
  const fetchDeviceLocationLatLngSet = async () => {
    const result = await Location.requestForegroundPermissionsAsync(); // 사용자에게 위치 권한 요청하는 팝업을 띄움
    if (result.status === "granted") {
      // 사용자가 권한을 준 경우
      const location = await Location.getCurrentPositionAsync(); // 사용자가 권한을 준 경우 현재 위치 정보 가져오기
      return onResponse({
        fetchDeviceLocationLatLngSet: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });
    } else {
      // 권한을 주지 않은 경우
      return onResponse({
        fetchDeviceLocationLatLngSet: {
          lat: 37.5665,
          lng: 126.978,
        },
      });
    }
  };

  return { fetchDeviceLocationLatLngSet };
};
