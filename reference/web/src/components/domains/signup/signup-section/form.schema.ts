"use client";

import { Path } from "react-hook-form";
import { z } from "zod";

export interface IInputBaseProps<T> {
  path: Path<T>;
}

export interface ISignupSchema {
  email: string;
  name: string;
  password: string;
  passwordCheck: string;
}

export const signupSchema = z.object({
  email: z.string().min(1, { message: "이메일을 입력해 주세요." }),
  name: z.string().min(1, { message: "이름을 입력해 주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해 주세요." }),
  passwordCheck: z.string().min(1, { message: "비밀번호를 입력해 주세요." }),
});
