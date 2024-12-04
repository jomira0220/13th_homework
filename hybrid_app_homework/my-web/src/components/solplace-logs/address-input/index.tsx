"use client";

import { IoIosArrowForward } from "react-icons/io";
import Input from "@/components/commons/input";
import { useParamsControl } from "@/commons/hooks/use-params-control";

export default function AddressInput() {
  const { addOrUpdateQueryParams, getQueryParamValue } = useParamsControl();

  const onSearchMap = () => {
    addOrUpdateQueryParams({ showmap: "true" });
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Input
          title="플레이스 주소"
          type="text"
          name="address"
          required
          hidden
          readOnly
        />
        <Input type="number" name="lng" hidden readOnly />
        <Input type="number" name="lat" hidden readOnly />
      </div>

      <button
        type="button"
        className="flex items-center justify-between w-full h-11 px-3 border-black border border-solid rounded-lg font-bold whitespace-nowrap truncate"
        onClick={() => onSearchMap()}
      >
        {getQueryParamValue("address") ?? "플레이스 주소 입력"}
        <IoIosArrowForward size={24} />
      </button>
    </div>
  );
}
