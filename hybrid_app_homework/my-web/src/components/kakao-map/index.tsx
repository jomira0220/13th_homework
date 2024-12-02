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
  setAddress: (address: string) => void;
}

interface IPosition {
  lat: number;
  lng: number;
}

export default function KaKaoMap({
  lat,
  lng,
  className,
  setAddress,
}: IKakaoMap) {
  useKakaoLoader();

  const [position, setPosition] = useState<IPosition>();

  useEffect(() => {
    if (!lat || !lng) {
      // 위치 정보가 없을 경우, 서울 시청을 기본 위치로 설정
      setPosition({
        lat: 37.56682,
        lng: 126.97865,
      });
      fetchAddress(37.56682, 126.97865);
    } else {
      // 현재 위치 정보가 있을 경우, 해당 위치로 설정
      setPosition({ lat, lng });
      fetchAddress(lat, lng);
    }
  }, []);

  // 클릭한 좌표로 주소를 반환하는 함수
  const fetchAddress = async (lat: number, lng: number) => {
    if (!window.kakao) return;
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(lat, lng);
    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const address = result[0]?.address?.address_name;
        setAddress(address || "주소를 찾을 수 없습니다.");
        console.log(address);
      }
    });
  };

  // 지도 클릭 이벤트 - 클릭한 위치 좌표 저장
  const mapClick = (mouseEvent: any) => {
    const lat = mouseEvent.latLng.getLat();
    const lng = mouseEvent.latLng.getLng();
    setPosition({ lat, lng });
    fetchAddress(lat, lng);
  };

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
