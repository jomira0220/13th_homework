"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ISolplaceLogsNewSchema } from "./form.schema";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useImageStore } from "@/commons/stores/image-store";
// import { useDeviceSetting } from "@/commons/settings/device-setting/hook";
// import { useDeviceSettingRedirect } from "@/commons/settings/device-setting-redirect/hook";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";
import { useMutation } from "@apollo/client";
import { CREATE_SOLPLACE_LOG } from "@/commons/apis/graphql/mutations/create-solplace-log";
import { UPLOAD_FILE } from "@/commons/apis/graphql/mutations/upload-file";
import { imageToFile } from "@/commons/libraries/image-to-file";

export const useInitialize = (method: UseFormReturn<ISolplaceLogsNewSchema>) => {
  const { fetchApp } = useDeviceSetting();
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const images = useImageStore((state) => state.images);
  const clearImages = useImageStore((state) => state.clearImages);

  const [createSolplaceLog] = useMutation(CREATE_SOLPLACE_LOG);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onSubmit = async (data: ISolplaceLogsNewSchema) => {
    const imageDecoded = images.map((el) => {
      return imageToFile(el);
    });

    const imageResult = await Promise.all(
      imageDecoded.map(async (el) => await uploadFile({ variables: { file: el } }))
    );

    const imageResultUrls = imageResult.map((el) => el.data?.uploadFile.url ?? "");

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

    router.push(`/solplace-logs?toastMessage=${encodeURIComponent("플레이스 등록 완료")}`);

    fetchApp({ query: "requestDeviceNotificationsForPermissionSolplaceLogNewSet" });
    fetchApp({ query: `createDeviceNotificationsForSolplaceLogNewSet`, variables: { solplaceLogId: result.data.id } });

    clearImages();
  };

  useEffect(() => {
    if (searchParams.size !== 0) {
      method.setValue("title", params.title);
      method.setValue("images", images);
      method.setValue("address", params.address);
      method.setValue("lat", Number(params.lat));
      method.setValue("lng", Number(params.lng));
      method.setValue("contents", params.contents);

      method.trigger();
    }
  }, [searchParams]);

  return {
    onSubmit,
  };
};
