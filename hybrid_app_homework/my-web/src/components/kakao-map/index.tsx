"use client";

import {
  Map,
  MapTypeControl,
  ZoomControl,
  MapMarker,
} from "react-kakao-maps-sdk";
import useKakaoLoader from "./hooks";
import { useEffect, useState } from "react";

interface IKakaoMap {
  lat: number;
  lng: number;
  className?: string;
}

export default function KaKaoMap({ lat, lng, className }: IKakaoMap) {
  useKakaoLoader();

  const [position, setPosition] = useState({ lat, lng });

  return (
    <>
      <Map
        className={className}
        center={{ lat, lng }}
        level={3}
        onTileLoaded={(map) =>
          setPosition({
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          })
        }
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
