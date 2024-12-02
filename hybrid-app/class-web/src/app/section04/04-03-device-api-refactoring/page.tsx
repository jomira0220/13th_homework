"use client";

import { useDeviceSetting } from "@/commons/settings/03-06-device-setting/hook"; // 셋팅은 그대로 사용

export default function DeviceApiRefactoringPage() {
  const { fetchApp } = useDeviceSetting();

  const onClickSystemVersion = async () => {
    const result = await fetchApp({ query: "fetchDeviceSystemForAppSet" });
    alert(result.data.fetchDeviceSystemForAppSet.appVersion);
  };

  const onClickSystemPlatform = async () => {
    const result = await fetchApp({ query: "fetchDevicePlatformSet" });
    alert(result.data.fetchDevicePlatformSet.modalName);
  };

  const onClickLocationLatLng = async () => {
    const result = await fetchApp({ query: "fetchDeviceLocationLatLngSet" });
    alert(
      `${result.data.fetchDeviceLocationLatLngSet.lat}, ${result.data.fetchDeviceLocationLatLngSet.lng}`
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={onClickSystemVersion}
        className="bg-black text-white rounded-lg p-3"
      >
        App아! 내 핸드폰 버전 정보 좀 알려줘!
      </button>

      <button
        onClick={onClickSystemPlatform}
        className="bg-black text-white rounded-lg p-3"
      >
        App아! 내 핸드폰 기종 정보 좀 알려줘!
      </button>

      <button
        onClick={onClickLocationLatLng}
        className="bg-black text-white rounded-lg p-3"
      >
        App아! 내 핸드폰 위치 정보 알려줘!
      </button>
    </div>
  );
}
