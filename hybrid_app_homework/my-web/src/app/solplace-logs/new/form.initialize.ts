"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import type { ISolplaceLogsSchema } from "./form.schema";
import { useImageUploadStore } from "@/commons/stores/image-upload";

// 기본값 설정 및 결과값 반환
export const useInitialize = (method: UseFormReturn<ISolplaceLogsSchema>) => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries()); // URLSearchParams를 Object로 변환
  const images = useImageUploadStore((state) => state.uploadImages); // 이미지 업로드 스토어에서 이미지 가져오기

  const onSubmit = (data: ISolplaceLogsSchema) => {
    console.log("로그 등록", data, images);
  };

  // searchParams 이 있고 바뀔때마다 실행
  useEffect(() => {
    if (searchParams.size !== 0) {
      // URLSearchParams가 있을 경우
      method.setValue("title", params.title); // params.title 값을 title에 값으로 설정
      method.setValue("address", params.address); // params.address 값을 address에 값으로 설정
      method.setValue("lat", Number(params.lat)); // params.lat 값을 lat에 값으로 설정
      method.setValue("lng", Number(params.lng)); // params.lng 값을 lng에 값으로 설정
      method.setValue("contents", params.contents); // params.contents 값을 contents에 값으로 설정

      method.trigger(); // 셋팅한 값들을 셋팅함
    }
  }, [searchParams]);

  return {
    onSubmit,
  };
};
