"use client";

import { set, type UseFormReturn } from "react-hook-form";
import type { ISignUpSchema } from "@/commons/schema/signup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { webviewLog } from "@/commons/libraries/webview-log";

const SIGNUP = gql`
  mutation signup($signupInput: SignupInput!) {
    signup(signupInput: $signupInput) {
      id
    }
  }
`;

export const useSignUp = (
  methods: UseFormReturn<ISignUpSchema>,
  setModalOpen: (open: boolean) => void
) => {
  const [signup] = useMutation(SIGNUP);

  const onSubmit = async (data: ISignUpSchema) => {
    setModalOpen(true);

    const { email, name, password } = data;
    try {
      const result = await signup({
        variables: {
          signupInput: {
            email,
            name,
            password,
          },
        },
      });

      if (!result?.data?.signup) {
        alert("회원가입에 실패했습니다.");
      }

      if (result?.data?.signup) {
        webviewLog(`회원가입 요청 완료:${JSON.stringify(data)}`);
        setModalOpen(true); // 회원가입 완료 모달 오픈
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { onSubmit };
};
