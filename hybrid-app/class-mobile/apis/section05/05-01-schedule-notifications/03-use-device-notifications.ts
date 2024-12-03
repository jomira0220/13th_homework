import * as Notifications from "expo-notifications";
// https://docs.expo.dev/versions/v51.0.0/sdk/notifications/ 참조

// 1. 알림 핸들러 설정 - 없으면 알림이 뜨지 않음 (ios 필수)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const useDeviceNotifications = () => {
  // 2. 알림 스케줄 생성
  const createDeviceNotificationsForScheduleSet = async (variables) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: `알림이 왔어요! ${variables.name}님!`,
        body: "알림이 도착하였습니다. 여기는 알림 내용입니다.",
      },
      trigger: null,
    });

    return {
      createDeviceNotificationsForScheduleSet: {
        message: "알림 스케줄 생성이 완료됐습니다.",
      },
    };
  };

  // 3. 알림 권한을 요청
  const requestDeviceNotificationsForPermissionSet = async () => {
    await Notifications.requestPermissionsAsync();
    return {
      requestDeviceNotificationsForPermissionSet: {
        message: "알림 권한 요청이 완료됐습니다.",
      },
    };
  };

  return {
    createDeviceNotificationsForScheduleSet,
    requestDeviceNotificationsForPermissionSet,
  };
};
