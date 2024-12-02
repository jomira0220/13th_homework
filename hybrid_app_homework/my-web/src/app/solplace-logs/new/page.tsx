"use client";

import { IoIosArrowForward, IoIosAdd, IoIosClose } from "react-icons/io";
import Image from "next/image";
import Footer from "@/commons/layout/footer";
import Input from "@/components/commons/input";
import TextArea from "@/components/commons/textarea";

import KaKaoMap from "@/components/kakao-map";
import { useRouter, useSearchParams } from "next/navigation";
import { useDataSetting } from "@/commons/settings/hook";
import Form from "@/components/commons/form";
import { ISolplaceLogsSchema, solplaceLogsSchema } from "./form.schema";
import { useInitialize } from "./form.initialize";

import ImageUpload from "@/components/commons/image-upload";

export default function SolPlaceNewPage() {
  const searchParams = useSearchParams();
  const showmap = searchParams.get("showmap") === "true";

  const { fetchApp } = useDataSetting();

  const onSearchMap = async () => {
    // const result = await fetchApp({ query: "fetchDeviceLocationLatLngSet" }); // 위치 정보 권한 요청 및 정보 가져오기
    // console.log(result);

    // result.data &&
    //   method.setValue("lat", result.data.fetchDeviceLocationLatLngSet.lat);
    // result.data &&
    //   method.setValue("lng", result.data.fetchDeviceLocationLatLngSet.lng);

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
    <>
      <Form<ISolplaceLogsSchema>
        schema={solplaceLogsSchema}
        useInitialize={useInitialize}
        // className="px-5 flex flex-col gap-10 text-[0.875rem] leading-[1.25rem]"
      >
        <ImageUpload
          name="images"
          className="w-[6.25rem] h-[6.25rem] bg-gray-50 flex flex-col items-center justify-center text-[0.75rem] lading-[1.25rem] rounded-lg text-gray-600"
        />
        <div className="flex flex-col gap-5">
          <Input
            type="text"
            keyname="name"
            title="플레이스 이름"
            placeholder="플레이스 이름을 입력해 주세요"
            required
          />

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
              type="button"
              onClick={() => onSearchMap()}
              className="flex items-center justify-between w-full h-11 px-3 border border-black rounded-lg font-bold whitespace-nowrap truncate"
            >
              {method.watch("address") || "플레이스 주소 입력"}
              <IoIosArrowForward size={24} />
            </button>
          </div>

          <TextArea
            keyname="contents"
            title="플레이스 내용"
            required
            placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
          />
        </div>
        <Footer>
          <button className="w-full h-12 font-bold bg-[var(--primary)] text-white text-lg leading-[1.5rem] rounded-lg disabled:bg-gray-300 disabled:text-gray-100">
            로그 등록
          </button>
        </Footer>
      </Form>
    </>
  );
}
