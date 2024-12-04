"use client";

import { useKakaoMap } from "@/commons/hooks/use-kakao-map";
import type { UseFormReturn } from "react-hook-form";
import type { ISolplaceLogsSchema } from "@/commons/schema/solplace-logs/form.schema";
import { useParams } from "next/navigation";

export const useFormDefault = (
  methods?: UseFormReturn<ISolplaceLogsSchema>
) => {
  const { id } = useParams();

  methods && useKakaoMap({ methods });
};
