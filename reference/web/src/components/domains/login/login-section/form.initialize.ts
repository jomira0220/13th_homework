"use client";

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { ILoginSchema } from "./form.schema";
import { webviewlog } from "@/commons/libraries/webview-log";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import {
  useAccessTokenStore,
  useRefreshTokenStore,
} from "@/commons/stores/token-store";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";

const LOGIN = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      refreshToken
    }
  }
`;

export const useInitialize = (method: UseFormReturn<ILoginSchema>) => {
  const router = useRouter();
  const [login] = useMutation(LOGIN);

  const { setAccessToken } = useAccessTokenStore();
  const { setRefreshToken } = useRefreshTokenStore();
  const { fetchApp } = useDeviceSetting();
  const onSubmit = async (data: ILoginSchema) => {
    try {
      const email = data?.email;
      const password = data?.password;
      const result = await login({
        variables: {
          loginInput: { email, password },
        },
      });

      if (!result?.data?.login)
        alert("로그인에 실패하였습니다. 다시 시도해주세요");

      const { accessToken, refreshToken } = result.data.login;

      if (!accessToken || !refreshToken) {
        alert("로그인에 실패했습니다! 다시 시도해 주세요!");
        return;
      }

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // React-native 메모리에다가 저장해줘!
      fetchApp({
        query: "updateDeviceAuthForAccessTokenSet",
        variables: { accessToken },
      });

      // secureStore 에도 저장해줘!
      fetchApp({
        query: "updateDeviceAuthForRefreshTokenSet",
        variables: { refreshToken },
      });
    } catch (err) {
      alert(err.message);
    }

    webviewlog(`로그인 요청 완료: ${JSON.stringify(data)}`);
    router.push("/solplace-logs");
  };

  useEffect(() => {
    method.setValue("email", "");
    method.setValue("password", "");

    // method.trigger();
  }, []);

  return {
    onSubmit,
  };
};
