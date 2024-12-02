"use client";

import { string, z } from "zod";

// 스키마 타입 정의 - 추후 method에서 리턴해주는 값 타입 지정을 위해 사용됨
export interface ISolplaceLogsSchema {
  title: string;
  address: string;
  images: string[];
  lat: number;
  lng: number;
  contents: string;
}

// 폼 양식 검사 스키마
export const solplaceLogsSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  images: z.array(z.string()).default([]),
  address: z.string().min(1, { message: "주소를 입력해주세요." }),
  lat: z.number(),
  lng: z.number(),
  contents: z.string().min(1, { message: "내용을 입력해주세요." }),
});
