"use client";

import {
  Map,
  MapTypeControl,
  ZoomControl,
  MapMarker,
} from "react-kakao-maps-sdk";
import { useKakaoLoader } from "@/commons/hooks/use-kakao-loader";
import { useKakaoMap } from "@/commons/hooks/use-kakao-map";

interface IKakaoMap {
  lat?: number;
  lng?: number;
  className?: string;
}

export default function KaKaoMap({ lat, lng, className }: IKakaoMap) {
  useKakaoLoader();
  const { position, mapClick } = useKakaoMap({ lat, lng });

  return (
    <>
      <Map
        className={className}
        center={position}
        level={3}
        onClick={(_, mouseEvent) => {
          mapClick(mouseEvent);
        }}
      >
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
        <MapMarker key={`marker__${lat}-${lng}`} position={position} />
      </Map>
    </>
  );
}
