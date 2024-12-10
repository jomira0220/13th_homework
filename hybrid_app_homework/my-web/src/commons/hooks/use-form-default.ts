"use client";

import { useKakaoMap } from "@/commons/hooks/use-kakao-map";
import type { UseFormReturn } from "react-hook-form";
import type { ISolplaceLogsSchema } from "@/commons/schema/solplace-logs/form.schema";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { FETCH_SOLPLACE_LOG } from "@/commons/apis/graphql/queries/fetch-solplace-log.query";
import { useEffect } from "react";
import { useImageUploadStore } from "@/commons/stores/image-upload";

export const useFormDefault = (
  methods?: UseFormReturn<ISolplaceLogsSchema>
) => {
  const { Id } = useParams();
  methods && useKakaoMap({ methods });

  if (!Id) return; // Id가 없을 경우 return 플레이스 수정 페이지에서만 사용되도록 처리
  const { data } = useQuery(FETCH_SOLPLACE_LOG, {
    variables: { id: Id },
  });
  // 이미지 업로드 글로벌 상태
  const { uploadImages, setUploadImages } = useImageUploadStore();

  useEffect(() => {
    if (!data) return;

    console.log("data", data);

    methods?.setValue("title", data?.fetchSolplaceLog.title ?? "");
    methods?.setValue("contents", data?.fetchSolplaceLog.contents ?? "");
    methods?.setValue("address", data?.fetchSolplaceLog.address ?? "");
    methods?.setValue("lat", data?.fetchSolplaceLog.lat ?? 37.5666);
    methods?.setValue("lng", data?.fetchSolplaceLog.lng ?? 126.978);

    setUploadImages(data?.fetchSolplaceLog.images ?? []);
    methods?.trigger();
  }, [data]);
};
