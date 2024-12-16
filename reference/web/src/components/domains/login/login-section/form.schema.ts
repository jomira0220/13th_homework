"use client";

import { Path } from "react-hook-form";
import { z } from "zod";

export interface IInputBaseProps<T> {
  path: Path<T>;
}

export interface ILoginSchema {
  email: string;
  password: string;
}

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "아이디 또는 비밀번호를 확인해 주세요." }),
  password: z
    .string()
    .min(1, { message: "아이디 또는 비밀번호를 확인해 주세요." }),
});
