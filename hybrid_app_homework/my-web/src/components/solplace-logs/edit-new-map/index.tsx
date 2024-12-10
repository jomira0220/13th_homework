"use client";

import KaKaoMap from "@/components/kakao-map";
import { useKakaoMap } from "@/commons/hooks/use-kakao-map";
import { useParamsControl } from "@/commons/hooks/use-params-control";
import Headers from "@/commons/layout/header";

export default function SolplaceLogsMap() {
  const { addOrUpdateQueryParams } = useParamsControl();
  const { address, position, openMap } = useKakaoMap();

  if (openMap)
    return (
      <>
        <div className="fixed left-0 top-0 z-10 w-screen h-screen flex flex-col justify-between">
          <Headers />
          <KaKaoMap className="w-screen flex flex-1" />
          <div className="bg-white flex flex-col gap-5 p-5">
            <input
              className="rounded-3xl text-center h-12 shadow-[0px_0px_8px_0px_#00000029]"
              value={address}
              readOnly
            />

            <button
              className="bg-[var(--primary)] h-12 text-white font-bold text-lg leading-6 rounded-lg"
              onClick={() => {
                addOrUpdateQueryParams({
                  showmap: "false",
                  // lat: String(position.lat),
                  // lng: String(position.lng),
                  // address: address,
                });
              }}
            >
              이 위치로 등록
            </button>
          </div>
        </div>
      </>
    );
}
