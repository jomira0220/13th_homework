import * as Notifications from "expo-notifications";
import { useEffect } from "react";

// 1. 알람 수신 대기(IOS 필수)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const useDeviceNotifications = (onResponse: ) => {
  // 2. 알람 스케줄 생성
  const createDeviceNotificationsForSolplaceLogNewSet = async (variables: {
    title: string;
    body: string;
    data: { page: string };
  }) => {
    await Notifications.scheduleNotificationAsync({
      content: variables,
      trigger: null,
    });
    onResponse({
      createDeviceNotificationsForSolplaceLogNewSet: {
        message: "등록완료",
      },
    });
  };

  // 3. 알람 권한 요청
  const requestDeviceNotificationsForPermissionSolplaceLogNewSet = async () => {
    await Notifications.requestPermissionsAsync();
    onResponse({
      requestDeviceNotificationsForPermissionSolplaceLogNewSet: {
        message: "요청완료",
      },
    });
  };

  // 알림 권한 허용 헀는지 여부를 확인하는 함수
  const fetchDeviceNotificationsForPermissionSet = async () => {
    const result = await Notifications.getPermissionsAsync();
    onResponse({
      fetchDeviceNotificationsForPermissionSet: {
        status: result.status,
      },
    });
  };

  useEffect(() => {
    // 알림 응답을 수신하고, 해당 응답 데이터를 기반으로 특정 페이지로 리디렉션하는 기능
    Notifications.addNotificationResponseReceivedListener((response) => {
      const notificationData = response.notification.request.content.data; // 알람 데이터
      onResponse({ redirect: notificationData.page });
    });
  }, []);

  return {
    createDeviceNotificationsForSolplaceLogNewSet,
    requestDeviceNotificationsForPermissionSolplaceLogNewSet,
    fetchDeviceNotificationsForPermissionSet,
  };
};
