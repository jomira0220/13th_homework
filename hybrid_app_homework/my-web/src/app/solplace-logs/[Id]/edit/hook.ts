"use client";

import { useKakaoMap } from "@/commons/hooks/use-kakao-map";
import type { UseFormReturn } from "react-hook-form";
import type { ISolplaceLogsSchema } from "@/commons/schema/solplace-logs";
import { useParams, useRouter } from "next/navigation";
import { FETCH_SOLPLACE_LOG } from "@/commons/apis/graphql/queries/fetch-solplace-log";
import { UPDATE_SOLPLACE_LOG } from "@/commons/apis/graphql/mutations/update-solplace-log";
import { UPLOAD_FILE } from "@/commons/apis/graphql/mutations/upload-file";
import { useEffect } from "react";
import { useImageUploadStore } from "@/commons/stores/image-upload";
import { imageToFile } from "@/commons/libraries/image-to-file";
import { useQuery, useMutation } from "@apollo/client";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";

export const useSolplaceEdit = (
  methods: UseFormReturn<ISolplaceLogsSchema>
) => {
  const { fetchApp } = useDeviceSetting();
  const router = useRouter();
  const { Id } = useParams();

  useKakaoMap({ methods });

  // 기존 데이터 불러오기
  const { data } = useQuery(FETCH_SOLPLACE_LOG, {
    variables: { id: Id },
  });

  // 파일 업로드 및 솔플레이스 수정 뮤테이션
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [updateSolplaceLog] = useMutation(UPDATE_SOLPLACE_LOG);

  // 이미지 업로드 글로벌 상태
  const { setUploadImages } = useImageUploadStore();

  // 기존 데이터가 있을 경우, 데이터를 폼에 기본값으로 채워넣음
  useEffect(() => {
    if (!data) return;

    console.log("data", data);
    const { title, contents, address, lat, lng, images } =
      data.fetchSolplaceLog;

    methods.setValue("title", title ?? "");
    methods.setValue("contents", contents ?? "");
    methods.setValue("address", address ?? "");
    methods.setValue("lat", lat ?? 37.5666);
    methods.setValue("lng", lng ?? 126.978);

    setUploadImages(images ?? []);

    methods.trigger();
  }, [data]);

  // 솔플레이스 수정 로직
  const onSubmit = async (data: ISolplaceLogsSchema) => {
    console.log("data", data);
    // 업로드하지 않을 기존 업로드 되어있던 이미지들
    const filterStringImages = data.images.filter(
      (el) => typeof el === "string"
    );

    // 업로드할 파일 형식의 이미지만 추출후 디코드
    const filterFileImages = data.images.filter((el) => typeof el !== "string");
    const filterFileImagesDecoded = filterFileImages.map((el) => {
      return imageToFile(el);
    });

    // 신규 등록한 파일 형식의 이미지 업로드 처리
    const imageUploadResult = await Promise.all(
      filterFileImagesDecoded.map(async (el) => {
        return await uploadFile({ variables: { file: el } });
      })
    );

    // 업로드한 이미지들 url 추출
    const imageResultUrls = imageUploadResult
      .map((el) => el.data?.uploadFile.url ?? "")
      .filter((el) => el);

    // 기존 이미지와 신규 이미지 합치기
    const resultImages = [...filterStringImages, ...imageResultUrls];

    const result = await updateSolplaceLog({
      variables: {
        id: Id,
        updateSolplaceLogInput: {
          title: data.title,
          contents: data.contents,
          address: data.address,
          lat: data.lat,
          lng: data.lng,
          images: resultImages,
        },
      },
    });

    console.log("result", result);
    if (!result.data) return;

    // 알림 권한 요청
    await fetchApp({
      query: "requestDeviceNotificationsForPermissionSolplaceLogNewSet",
    });

    // 솔플레이스 수정 완료 알림 생성
    await fetchApp({
      query: `createDeviceNotificationsForSolplaceLogNewSet`,
      variables: {
        title: "솔플레이스 수정 완료",
        body: "솔플레이스 로그가 수정되었습니다.",
        data: {
          page: `/solplace-logs/${result.data.id}`,
        },
      },
    });

    router.push(
      `/solplace-logs/${result.data.id}?toastMessage=${encodeURIComponent(
        "플레이스 수정 완료"
      )}`
    );
  };

  return {
    onSubmit,
  };
};
