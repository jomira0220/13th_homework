"use client";

import { IoIosArrowForward } from "react-icons/io";
import { Input } from "@/components/commons/input";
import { useKakaoMap } from "@/commons/hooks/use-kakao-map";
import { useFormContext } from "react-hook-form";
import type { ISolplaceLogsSchema } from "@/commons/schema/solplace-logs";

export default function AddressInput() {
  const { getValues } = useFormContext<ISolplaceLogsSchema>();
  const { mapOpenClick } = useKakaoMap();

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Input<ISolplaceLogsSchema>
          title="플레이스 주소"
          type="text"
          name="address"
          required
          hidden
          readOnly
        />
        <Input<ISolplaceLogsSchema> type="number" name="lng" hidden readOnly />
        <Input<ISolplaceLogsSchema> type="number" name="lat" hidden readOnly />
      </div>

      <button
        type="button"
        className="flex items-center justify-between w-full h-11 px-3 border-black border border-solid rounded-lg font-bold whitespace-nowrap truncate"
        onClick={mapOpenClick}
      >
        {getValues("address") ? getValues("address") : "플레이스 주소 입력"}
        <IoIosArrowForward size={24} />
      </button>
    </div>
  );
}
