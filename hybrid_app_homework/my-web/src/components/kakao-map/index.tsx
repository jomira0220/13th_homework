"use client";

import {
  Map,
  MapTypeControl,
  ZoomControl,
  MapMarker,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import { useKakaoLoader } from "@/commons/hooks/use-kakao-loader";
import { useKakaoMap } from "@/commons/hooks/use-kakao-map";
import styles from "./style.module.css";

interface IKakaoMap {
  lat?: number;
  lng?: number;
  className?: string;
}

export default function KaKaoMap({ lat, lng, className }: IKakaoMap) {
  useKakaoLoader();
  const { address, position, mapClick, mapMarkerClick, overPopupVisible } =
    useKakaoMap({
      lat,
      lng,
    });

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
        <MapMarker
          key={`marker__${lat}-${lng}`}
          position={position}
          onClick={mapMarkerClick}
        />
        <CustomOverlayMap position={position}>
          {overPopupVisible && <div id={styles.mapInfoWindow}>{address}</div>}
        </CustomOverlayMap>
      </Map>
    </>
  );
}
