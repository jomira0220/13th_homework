"use client";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineCreate } from "react-icons/md";
import KaKaoMap from "@/components/kakao-map";
import SolPlaceDetailSlide from "@/components/solplace-logs/detail-slide";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_SOLPLACE_LOG } from "@/commons/apis/graphql/queries/fetch-solplace-log.query";

export default function SolPlaceDetail() {
  const [isMapVisible, setIsMapVisible] = useState<boolean>(false);
  const showMap = () => {
    setIsMapVisible((prev) => !prev);
  };
  const { Id } = useParams();

  const { data } = useQuery(FETCH_SOLPLACE_LOG, {
    variables: { id: Id },
  });

  if (!data) return <></>;
  return (
    <>
      <SolPlaceDetailSlide images={data?.fetchSolplaceLog.images} />

      <div className="flex flex-col gap-4 p-[1.25rem_1.5rem]">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-[1.5rem] font-bold">
              {data?.fetchSolplaceLog.title}
            </h3>
            <Link href={`/solplace-logs/${Id}/edit`}>
              <MdOutlineCreate size={24} color="#777" />
            </Link>
          </div>
          <div className="flex gap-2">
            <div className="text-[0.8125rem] leading-5 font-semibold text-[#777] flex items-center gap-1 whitespace-nowrap">
              <FiMapPin size={14} color="#777" />
              {data?.fetchSolplaceLog.address}
            </div>
            <button
              className="text-[0.8125rem] leading-5 font-semibold text-gray-800 flex items-center whitespace-nowrap"
              onClick={() => showMap()}
            >
              {!isMapVisible ? (
                <>
                  지도보기
                  <IoMdArrowDropdown size={19} />
                </>
              ) : (
                <>
                  지도접기
                  <IoMdArrowDropup size={19} />
                </>
              )}
            </button>
          </div>
          {isMapVisible && (
            <KaKaoMap
              className="rounded-xl w-[calc(100vw - 2.5rem)] h-[10rem]"
              lat={data?.fetchSolplaceLog.lat}
              lng={data?.fetchSolplaceLog.lng}
            />
          )}
        </div>
        <hr />
        <p className="text-sm leading-5">{data?.fetchSolplaceLog.contents}</p>
      </div>
    </>
  );
}
