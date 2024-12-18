"use client";

import { z } from "zod";

// 사용할 수 없는 특수문자를 제외하는 정규식 (특정 문자 포함 시 실패)
const forbiddenCharsRegex = /^[^;&%=\-+<>＼]*$/;

const password = z
  .string()
  .min(8, {
    message: "비밀번호는 영문/숫자/특수문자 조합으로 8~15자리 입니다.",
  })
  .max(15, {
    message: "비밀번호는 영문/숫자/특수문자 조합으로 8~15자리 입니다.",
  })
  .regex(forbiddenCharsRegex, {
    message: "특수문자 중 ; & % = - + < > ＼ 는 사용할 수 없습니다.",
  });

export interface ISignUpSchema {
  email: string;
  name: string;
  password: string;
  passwordCheck: string;
}

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "이메일 형식이 아닙니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
    password: password,
    passwordCheck: password,
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "비밀번호가 일치하지 않습니다.",
  });
