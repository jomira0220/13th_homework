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

export interface ILoginSchema {
  email: string;
  password: string;
}

export const loginSchema = z.object({
  email: z.string().email({ message: "이메일 형식이 아닙니다." }),
  password: password,
});
