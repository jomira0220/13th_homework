"use client";

import { useSearchParams } from "next/navigation";
import { ISolplaceLogsNewSchema } from "./form.schema";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useImageStore } from "@/commons/stores/image-store";

export const useInitialize = (method: UseFormReturn<ISolplaceLogsNewSchema>) => {
  const onSubmit = (data: ISolplaceLogsNewSchema) => {
    console.log(data);
  };

  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const images = useImageStore((state) => state.images);

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
