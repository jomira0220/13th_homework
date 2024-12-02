"use client";

import {
  Map,
  MapTypeControl,
  ZoomControl,
  MapMarker,
} from "react-kakao-maps-sdk";
import useKakaoLoader from "@/commons/hooks/use-kakao-loader";
import { useKakaoMap } from "@/commons/hooks/use-kakao-map";

interface IKakaoMap {
  lat: number;
  lng: number;
  className?: string;
  setAddress: (address: string) => void;
}

export default function KaKaoMap({
  lat,
  lng,
  className,
  setAddress,
}: IKakaoMap) {
  useKakaoLoader();

  const { position, address, mapClick } = useKakaoMap({
    position: { lat, lng },
    address: "",
  });

  return (
    <>
      <Map
        className={className}
        center={position || { lat, lng }}
        level={3}
        onClick={(_, mouseEvent) => mapClick(mouseEvent)}
      >
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
        {!!position && (
          <MapMarker key={`marker__${lat}-${lng}`} position={position} />
        )}
      </Map>
    </>
  );
}
