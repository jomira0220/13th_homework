"use client";

import { useParams, useSearchParams } from "next/navigation";
import { ISolplaceLogsDetailEditSchema } from "./form.schema";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useImageStore } from "@/commons/stores/image-store";
import { FETCH_SOLPLACE_LOG } from "@/commons/apis/graphql/queries/fetch-solplace-log.query";

export const useInitialize = (method: UseFormReturn<ISolplaceLogsDetailEditSchema>) => {
  const boardId = useParams();
  const id = boardId.solplaceLogId.toString();
  const { data } = useQuery(FETCH_SOLPLACE_LOG, {
    variables: { id },
  });

  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const images = useImageStore((state) => state.images);
  const setImages = useImageStore((state) => state.setImages);

  useEffect(() => {
    if (!data) return;

    const { title, contents, images: initialImages, address, lat, lng } = data.fetchSolplaceLog;

    if (images.length === 0) {
      setImages(initialImages);
    }

    method.setValue("title", params.title || title);
    method.setValue("contents", params.contents || contents);
    method.setValue("images", images);
    method.setValue("address", params.address || address);
    method.setValue("lat", Number(params.lat) || lat);
    method.setValue("lng", Number(params.lng) || lng);

    if (searchParams.size !== 0) {
      method.trigger();
    }
  }, [data, searchParams]);

  const onSubmit = (data: ISolplaceLogsDetailEditSchema) => {
    console.log(data);
  };

  return {
    onSubmit,
  };
};
