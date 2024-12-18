"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ILoginSchema } from "@/commons/schema/login";
import {
  useAccessTokenStore,
  useRefreshTokenStore,
} from "@/commons/stores/token-store";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/commons/apis/graphql/mutations/login";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";
import { useRouter } from "next/navigation";
import { webviewLog } from "@/commons/libraries/webview-log";

export const useLogin = (methods: UseFormReturn<ILoginSchema>) => {
  const router = useRouter();
  const { fetchApp } = useDeviceSetting();
  const [login] = useMutation(LOGIN);

  const { setAccessToken } = useAccessTokenStore();
  const { setRefreshToken } = useRefreshTokenStore();

  const onSubmit = async (data: ILoginSchema) => {
    try {
      const { email, password } = data;
      const result = await login({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });

      if (!result?.data?.login) {
        alert("로그인에 실패했습니다.");
        return;
      }

      const { accessToken, refreshToken } = result.data.login;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // 리액트 네이티브에 엑세스 토큰 저장
      fetchApp({
        query: "updateDeviceAuthForAccessTokenSet",
        variables: { accessToken },
      });

      // 리액트 네이티브의 secureStore에 리프레시 토큰 저장
      fetchApp({
        query: "updateDeviceAuthForRefreshTokenSet",
        variables: { refreshToken },
      });

      // 로그인 성공시, 목록 페이지로 이동
      router.push("/solplace-logs");
      webviewLog(`로그인 요청 완료:${JSON.stringify(data)}`);
    } catch (e) {
      console.error(e);
    }
  };

  return { onSubmit };
};
