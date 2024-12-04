"use client";

import { useDeviceSetting } from "@/commons/settings/05-02-device-setting-redirect/hook"; // 현재 레이아웃에 셋팅된 페이지의 훅인지 확인 필요

export default function OpenSettingsPage() {
  // 1. 권한 설정 => 클릭시, 설정화면으로 이동
  // 2. 앱의 상태를 확인하는 함수 => 앱이 포그라운드인지 백그라운드인지 확인

  const { fetchApp } = useDeviceSetting();
  const onClickOpenSettings = () => {
    // 1. 셋팅화면을 보여주는 함수 실행
    fetchApp({ query: "openDeviceSystemForSettingSet" });

    // * 주의) 아래의 코드는 셋팅 화면에서 돌아온 후 실행되는 것이 아님! 셋팅화면이 내 앱위에 올라온 것일뿐, 내 앱은 백그라운드로 돌아가는 상황임
    // * 따라서, 현재 함수내의 코드들 모두 실행됨(셋팅화면이랑 상관없이)

    const interverSet = setInterval(async () => {
      const result = await fetchApp({
        query: "fetchDeviceSystemForAppStateSet",
      });
      const isForground = result.data.fetchDeviceSystemForAppStateSet.isForground; // prettier-ignore
      console.log(isForground);

      if (!isForground) return; // 포그라운드 상태가 아니라면 밑에 코드 실행하지 않음

      // 3. 포그라운드로 돌아왔다면? 변경된(위치 또는 알림 등) 권한 조회
      console.log("권한을 다시 조회할께요!");

      // 4. 다 끝난경우 인터벌 종료
      clearInterval(interverSet);
    }, 1000);
  };

  return (
    <>
      <button onClick={onClickOpenSettings}>권한설정</button>
      {/*
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Toggle me
        </span>
      </label>
      */}
    </>
  );
}
