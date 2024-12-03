"use client";

import { useDeviceSetting } from "@/commons/settings/05-02-device-setting-redirect/hook";
import { useEffect } from "react";

export default function ScheduleNotificationsPage() {
  const { fetchApp } = useDeviceSetting();

  useEffect(() => {
    fetchApp({ query: "requestDeviceNotificationsForPermissionSet" });
    fetchApp({
      query: "createDeviceNotificationsForScheduleSet",
      variables: {
        name: "철수",
        page: "/section05/05-02-schedule-notifications-click-moved",
      },
    });
  }, []);

  return <div>처음으로 방문해주셨군요! 회원가입을 환영합니다!</div>;
}
