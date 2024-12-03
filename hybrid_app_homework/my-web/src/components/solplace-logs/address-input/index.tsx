"use client";

import { IoIosArrowForward } from "react-icons/io";
import Input from "@/components/commons/input";
import { useSearchParams } from "next/navigation";
import { useDataSetting } from "@/commons/settings/hook";

export default function AddressInput() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const { fetchApp } = useDataSetting();

  const onSearchMap = async () => {
    const result = await fetchApp({ query: "fetchDeviceLocationLatLngSet" }); // 위치 정보 권한 요청 및 정보 가져오기
    console.log(result);

    result.data &&
      method.setValue("lat", result.data.fetchDeviceLocationLatLngSet.lat);
    result.data &&
      method.setValue("lng", result.data.fetchDeviceLocationLatLngSet.lng);

    window.history.pushState(
      null,
      "",
      `?lng=37.56682&lat=126.97865&showmap=true`
    );
    window.history.replaceState(
      null,
      "",
      `?lng=37.56682&lat=126.97865&showmap=true`
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Input
          title="플레이스 주소"
          type="text"
          keyname="address"
          required
          hidden
          readOnly
        />
        <Input type="number" keyname="zonecode" hidden readOnly />
        <Input type="number" keyname="lng" hidden readOnly />
        <Input type="number" keyname="lat" hidden readOnly />
      </div>

      <button
        className="flex items-center justify-between w-full h-11 px-3 border border-black rounded-lg font-bold whitespace-nowrap truncate"
        type="button"
        onClick={() => onSearchMap()}
      >
        {params.address || "플레이스 주소 입력"}
        <IoIosArrowForward size={24} />
      </button>
    </div>
  );
}
