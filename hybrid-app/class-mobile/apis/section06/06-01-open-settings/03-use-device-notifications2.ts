import * as Notifications from "expo-notifications";
import { useEffect } from "react";
// https://docs.expo.dev/versions/v51.0.0/sdk/notifications/ 참조

// 1. 알림 핸들러 설정 - 없으면 알림이 뜨지 않음 (ios 필수)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const useDeviceNotifications2 = (onResponse) => {
  //
  // 2. 알림 스케줄 생성
  const createDeviceNotificationsForScheduleSet = async (variables) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: `알림이 왔어요! ${variables.name}님!`,
        body: "알림이 도착하였습니다. 여기는 알림 내용입니다.",
        // 05-02-schedule-notifications-click에서 추가된 코드
        // 알림 클릭시 제공할 데이터 여기서 보내는 내용이 아래 response.data에 담겨서 전달됨
        data: {
          // page: "/section05/05-02-schedule-notifications-click-moved",
          // 이동할 페이지 - 웹뷰 페이지 경로 variable로 받아서 사용하거나 직접 입력
          page: `${variables.page}`,
        },
      },
      trigger: null,
    });

    return onResponse({
      createDeviceNotificationsForScheduleSet: {
        message: "알림 스케줄 생성이 완료됐습니다.",
      },
    });
  };

  // 3. 알림 권한을 요청
  const requestDeviceNotificationsForPermissionSet = async () => {
    await Notifications.requestPermissionsAsync();
    return onResponse({
      requestDeviceNotificationsForPermissionSet: {
        message: "알림 권한 요청이 완료됐습니다.",
      },
    });
  };

  // 05-02-schedule-notifications-click에서 추가된 코드
  // 4. 알림 클릭 시 실행할 이벤트 대기
  useEffect(() => {
    Notifications.addNotificationResponseReceivedListener((response) => {
      // 알림 클릭시 받아오는 데이터 확인
      const notificationData = response.notification.request.content.data;

      // 앱에 응답 보내기
      // 1. 요청없이 응답만 보내기
      onResponse({ redirect: notificationData.page });
      // 2. 응답만 보낸 경우도 웹뷰에서 수신 가능하도록 만들기 - 아래 경로에 작성
      // class-web/src/commons/settings/05-02-device-setting-redirect/index.tsx 참조
    });
  }, []);

  return {
    createDeviceNotificationsForScheduleSet,
    requestDeviceNotificationsForPermissionSet,
  };
};
