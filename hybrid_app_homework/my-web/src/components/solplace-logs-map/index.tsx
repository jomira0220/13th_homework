import KaKaoMap from "@/components/kakao-map";

export default function SolplaceLogsMap() {
  return (
    <div className="fixed left-0 top-0 z-auto w-screen h-screen flex flex-col justify-between">
      <KaKaoMap
        className="w-screen flex flex-1"
        lat={method.getValues("lat") ?? null}
        lng={method.getValues("lng") ?? null}
        setAddress={(value) => {
          method.setValue("address", value);
          method.trigger("address");
        }}
      />
      <div className="bg-white flex flex-col gap-5 p-5">
        <input
          className="rounded-3xl text-center h-12 shadow-[0px_0px_8px_0px_#00000029]"
          value={method.watch("address")}
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
