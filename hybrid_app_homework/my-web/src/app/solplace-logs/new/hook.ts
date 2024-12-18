"use client";

import { useKakaoMap } from "@/commons/hooks/use-kakao-map";
import type { UseFormReturn } from "react-hook-form";
import type { ISolplaceLogsSchema } from "@/commons/schema/solplace-logs";
import { useImageUploadStore } from "@/commons/stores/image-upload";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CREATE_SOLPLACE_LOG } from "@/commons/apis/graphql/mutations/create-solplace-log";
import { UPLOAD_FILE } from "@/commons/apis/graphql/mutations/upload-file";
import { imageToFile } from "@/commons/libraries/image-to-file";

export const useSolplaceNew = (methods: UseFormReturn<ISolplaceLogsSchema>) => {
  const { fetchApp } = useDeviceSetting();
  const router = useRouter();

  // const images = useImageUploadStore((state) => state.uploadImages);
  // const clearImages = useImageUploadStore((state) => state.clearImages);
  const { uploadImages, clearImages } = useImageUploadStore();

  const [createSolplaceLog] = useMutation(CREATE_SOLPLACE_LOG);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  useKakaoMap({ methods }); // 카카오맵에서 위치 정보 저장 처리를 위한 hook

  // 솔플레이스 신규 등록 로직
  const onSubmit = async (data: ISolplaceLogsSchema) => {
    console.log("data", data);

    // 이미지들 디코드 처리
    const imageDecoded = uploadImages.map((el) => {
      return imageToFile(el);
    });

    // 디코드한 이미지들 업로드 처리
    const imageResult = await Promise.all(
      imageDecoded.map(
        async (el) => await uploadFile({ variables: { file: el } })
      )
    );

    // 업로드한 이미지들 url 추출
    const imageResultUrls = imageResult.map(
      (el) => el.data?.uploadFile.url ?? ""
    );

    // 솔플레이스 등록 로직
    const result = await createSolplaceLog({
      variables: {
        createSolplaceLogInput: {
          title: data.title,
          contents: data.contents,
          address: data.address,
          lat: data.lat,
          lng: data.lng,
          images: imageResultUrls,
        },
      },
    });

    console.log("result", result);

    router.push(
      `/solplace-logs?toastMessage=${encodeURIComponent("플레이스 등록 완료")}`
    );

    // 알림 권한 요청
    await fetchApp({
      query: "requestDeviceNotificationsForPermissionSolplaceLogNewSet",
    });

    // 솔플레이스 등록 완료 알림 생성
    await fetchApp({
      query: `createDeviceNotificationsForSolplaceLogNewSet`,
      variables: {
        title: "솔플레이스 등록 완료",
        body: "신규 솔플레이스 로그가 등록되었습니다.",
        data: {
          page: `/solplace-logs/${result.data.id}`,
        },
      },
    });

    clearImages(); // 이미지 초기화
  };

  return {
    onSubmit,
  };
};
