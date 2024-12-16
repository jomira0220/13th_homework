"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ISolplaceLogsDetailEditSchema } from "./form.schema";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useImageStore } from "@/commons/stores/image-store";
import { FETCH_SOLPLACE_LOG } from "@/commons/apis/graphql/queries/fetch-solplace-log.query";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";
import { UPDATE_SOLPLACE_LOG } from "@/commons/apis/graphql/mutations/update-solplace-log";
import { UPLOAD_FILE } from "@/commons/apis/graphql/mutations/upload-file";
import { imageToFile } from "@/commons/libraries/image-to-file";

export const useInitialize = (method: UseFormReturn<ISolplaceLogsDetailEditSchema>) => {
  const { fetchApp } = useDeviceSetting();

  const router = useRouter();
  const boardId = useParams();
  const id = boardId.solplaceLogId.toString();
  const { data } = useQuery(FETCH_SOLPLACE_LOG, {
    variables: { id },
  });
  const [updateSolplaceLog] = useMutation(UPDATE_SOLPLACE_LOG);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const images = useImageStore((state) => state.images);
  const setImages = useImageStore((state) => state.setImages);
  const clearImages = useImageStore((state) => state.clearImages);

  const onSubmit = async (data: ISolplaceLogsDetailEditSchema) => {
    // 이미지 수정 관련 로직
    // 나중에 Promise.all 안에서 이미지 수정하는 방법으로 리팩토링 진행해야 함
    const initialImages = data.images.filter((item) => !item.includes("base64"));
    const newImages = images.filter((item) => item.includes("base64"));

    const imageDecoded = newImages.map((newImage) => {
      return imageToFile(newImage);
    });

    const imageResult = await Promise.all(
      imageDecoded.filter((item) => item !== undefined).map(async (el) => await uploadFile({ variables: { file: el } }))
    );
    const imageResultUrls = imageResult.map((el) => el.data?.uploadFile.url ?? "");
    const finalImages = [...initialImages, ...imageResultUrls];

    //  솔플레이스 수정 로직
    const result = await updateSolplaceLog({
      variables: {
        id,
        updateSolplaceLogInput: {
          title: data.title,
          contents: data.contents,
          address: data.address,
          lat: data.lat,
          lng: data.lng,
          images: imageResultUrls.length > 0 ? finalImages : images,
        },
      },
    });

    console.log(result);

    router.push(`/solplace-logs/${id}?toastMessage=${encodeURIComponent("플레이스 수정 완료")}`);

    fetchApp({ query: "requestDeviceNotificationsForPermissionSolplaceLogNewSet" });
    fetchApp({ query: `createDeviceNotificationsForSolplaceLogNewSet`, variables: { solplaceLogId: id } });

    clearImages();
  };

  useEffect(() => {
    if (!data) return;

    const { title, contents, images: initialImages, address, lat, lng } = data.fetchSolplaceLog;

    if (images.length === 0) {
      setImages(initialImages);
    }

    method.setValue("title", params.title || title);
    method.setValue("contents", params.contents || contents);
    method.setValue("images", initialImages);
    method.setValue("address", params.address || address);
    method.setValue("lat", Number(params.lat) || lat);
    method.setValue("lng", Number(params.lng) || lng);

    method.trigger();
  }, [data, searchParams]);

  return {
    onSubmit,
    data,
  };
};
