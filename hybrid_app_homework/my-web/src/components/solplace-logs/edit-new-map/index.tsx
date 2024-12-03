import KaKaoMap from "@/components/kakao-map";
import { useSearchParams } from "next/navigation";
import { useKakaoMap } from "@/commons/hooks/use-kakao-map";

export default function SolplaceLogsMap() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const { mapClick, address, position } = useKakaoMap({
    address: params.address || "서울특별시 중구 세종대로 110",
    position: {
      lat: Number(params.lat) || 37.5666,
      lng: Number(params.lng) || 126.979,
    },
  });

  return (
    <div className="fixed left-0 top-0 z-auto w-screen h-screen flex flex-col justify-between">
      <KaKaoMap
        className="w-screen flex flex-1"
        lat={position?.lat ?? null}
        lng={position?.lng ?? null}
      />
      <div className="bg-white flex flex-col gap-5 p-5">
        <input
          className="rounded-3xl text-center h-12 shadow-[0px_0px_8px_0px_#00000029]"
          value={params.address || address}
          readOnly
        />

        <button
          className="bg-[var(--primary)] h-12 text-white font-bold text-lg leading-6 rounded-lg"
          onClick={() => {
            window.history.pushState(null, "", `?showmap=false`);
            window.history.replaceState(null, "", `?showmap=false`);
          }}
        >
          이 위치로 등록
        </button>
      </div>
    </div>
  );
}
