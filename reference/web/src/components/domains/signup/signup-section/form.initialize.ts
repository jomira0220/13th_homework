"use client";

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { webviewlog } from "@/commons/libraries/webview-log";
import { ISignupSchema } from "./form.schema";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const SIGNUP = gql`
  mutation signup($signupInput: SignupInput!) {
    signup(signupInput: $signupInput) {
      id
    }
  }
`;

export const useInitialize = (
  method: UseFormReturn<ISignupSchema>,
  setModalOpen: (open: boolean) => void
) => {
  const router = useRouter();
  const [signup] = useMutation(SIGNUP);

  const onSubmit = async (data: ISignupSchema) => {
    try {
      const email = data?.email;
      const password = data?.password;
      const passwordCheck = data?.passwordCheck;
      const name = data?.name;

      if (password !== passwordCheck) {
        alert("비밀번호가 일치하지 않습니다!");
        return;
      }

      const result = await signup({
        variables: {
          signupInput: { email, password, name },
        },
      });

      if (!result?.data?.signup)
        alert("회원가입에 실패 했습니다. 다시 시도해주세요");

      webviewlog(`회원가입 요청 완료: ${data}`);
      setModalOpen(true); // 여기서 모달을 열도록 설정
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    method.setValue("email", "");
    method.setValue("name", "");
    method.setValue("password", "");
    method.setValue("passwordCheck", "");

    // method.trigger();
  }, []);

  return {
    onSubmit,
  };
};
