"use client";

import { useDeviceSetting } from "@/commons/settings/device-setting/hook";
import ToggleInput from "@/components/commons/input/toggle-input";
import { webviewLog } from "@/commons/libraries/webview-log";
import { useEffect, useState } from "react";

export default function MyPageComponent() {
  const { fetchApp } = useDeviceSetting();

  const [toggleRows, setToggleRows] = useState([
    { title: "위치 권한", isChecked: false },
    { title: "알림 권한", isChecked: false },
  ]);

  // 위치정보, 알림설정 권한 요청
  const requestPermission = async () => {
    await fetchApp({
      query: "requestDeviceNotificationsForPermissionSolplaceLogNewSet",
    });
    await fetchApp({
      query: "requestDeviceLocationForPermissionSolplaceLogNewSet",
    });
  };

  // 권한 상태 업데이트
  const updatePermissionStatus = (title: string, status: string) => {
    setToggleRows((prevRows) =>
      prevRows.map((row) =>
        row.title === title ? { ...row, isChecked: status === "granted" } : row
      )
    );
  };

  // 체크박스 변경
  const handleCheckboxChange = async () => {
    // 1. 내설정 화면 진입했을때, 일단 위치허용 여부 물어보기
    webviewLog("노원두 천재");
    const locationPermissionResult = (await fetchApp({
      query: "fetchDeviceLocationForPermissionSet",
    })) as {
      data: { fetchDeviceLocationForPermissionSet: { status: string } };
    };
    // 알림 허용 물어보기
    const alertPermissionResult = (await fetchApp({
      query: "fetchDeviceNotificationsForPermissionSet",
    })) as {
      data: { fetchDeviceNotificationsForPermissionSet: { status: string } };
    };

    webviewLog(
      `locationPermissionResult:::${JSON.stringify(locationPermissionResult)}`
    );

    webviewLog(
      `alertPermissionResult::: ${JSON.stringify(alertPermissionResult)}`
    );
    // 2. 물어본게 끝나면, api 요청 해서 그 결과가 허용인지, 거절인지 가져올 수 있음
    // 그걸 통해서 toggle 그림을 바꿔주기
    // 위치 권한 업데이트
    updatePermissionStatus(
      "위치 권한",
      locationPermissionResult.data.fetchDeviceLocationForPermissionSet.status
    );
    // 알림 권한 업데이트
    updatePermissionStatus(
      "알림 권한",
      alertPermissionResult.data.fetchDeviceNotificationsForPermissionSet.status
    );
  };

  const startToggle = async () => {
    // setting화면 으로 이동
    const resultSettingset = fetchApp({
      query: "openDeviceSystemForSettingSet",
    });

    const toggleInterval = setInterval(async () => {
      const isForground = (await fetchApp({
        query: "fetchDeviceSystemForAppStateSet",
      })) as {
        data: { fetchDeviceSystemForAppStateSet: { isForeground: boolean } };
      };
      // setting 화면에서 우리 앱으로 다시 돌아왔을 경우,
      const isForegroundStatus =
        isForground.data.fetchDeviceSystemForAppStateSet.isForeground;

      if (!isForegroundStatus) return;
      if (isForegroundStatus) {
        handleCheckboxChange();
        clearInterval(toggleInterval);
      }
    }, 1000);
  };

  useEffect(() => {
    // 최초 한번 권한 요청
    requestPermission();
  }, []);

  const LocationPermissionChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    console.log(e.target.checked);
  };

  const NotificationPermissionChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    console.log(e.target.checked);
  };

  return (
    <div>
      <div className="p-[1.25rem_1.5rem] flex flex-col">
        {toggleRows.map((row, index) => (
          <label
            key={index}
            className="flex items-center justify-between border-b border-[#f2f2f2] last:border-b-0 pb-4 mb-4"
          >
            {row.title}
            <ToggleInput checked={row.isChecked} onChange={startToggle} />
          </label>
        ))}
      </div>
    </div>
  );
}
