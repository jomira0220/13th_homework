"use client";

import Footer from "@/commons/layout/footer";
import {
  DeviceLocationForLatLngSetResponse,
  DeviceSystemForAppSetResponse,
  DeviceSystemForPlatformSetResponse,
  useDeviceSetting,
} from "@/commons/settings/device-setting/hook";

export default function Mypage() {
  const { fetchApp } = useDeviceSetting();

  const onClickSystemVersion = async () => {
    const result = await fetchApp<DeviceSystemForAppSetResponse>({ query: "fetchDeviceSystemForAppSet" });
    alert(result.data.fetchDeviceSystemForAppSet.appVersion);
  };

  const onClickSystemPlatform = async () => {
    const result = await fetchApp<DeviceSystemForPlatformSetResponse>({ query: "fetchDeviceSystemForPlatformSet" });
    alert(result.data.fetchDeviceSystemForPlatformSet.modelName);
  };

  const onClickLocationLatLng = async () => {
    const result = await fetchApp<DeviceLocationForLatLngSetResponse>({ query: "fetchDeviceLocationForLatLngSet" });
    alert(
      `lat: ${result.data.fetchDeviceLocationForLatLngSet.lat}, lng: ${result.data.fetchDeviceLocationForLatLngSet.lng}`
    );
  };

  return (
    <>
      <button onClick={onClickSystemVersion}>App아 내 핸드폰 버전정보 알려줘</button>
      <button onClick={onClickSystemPlatform}>App아 내 핸드폰 기종정보 알려줘</button>
      <button onClick={onClickLocationLatLng}>App아 내 위치정보 알려줘</button>
      <Footer buttonText="" />
    </>
  );
}
