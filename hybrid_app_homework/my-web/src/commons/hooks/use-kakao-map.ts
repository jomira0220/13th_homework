"use client";

import { useEffect, useState } from "react";
import { useParamsControl } from "@/commons/hooks/use-params-control";
import type { UseFormReturn } from "react-hook-form";
import type { ISolplaceLogsSchema } from "@/commons/schema/solplace-logs/form.schema";
import { useDeviceSetting } from "@/commons/settings/device-setting/hook";

interface IUseKakaoMapProps {
  methods?: UseFormReturn<ISolplaceLogsSchema>;
  lat?: number; // kakap map에서 직접 지정한 기본값
  lng?: number;
}

export function useKakaoMap({ methods, lat, lng }: IUseKakaoMapProps = {}) {
  const { fetchApp } = useDeviceSetting();

  const { addOrUpdateQueryParams, queryParams, searchParams } =
    useParamsControl();
  const [overPopupVisible, setOverPopupVisible] = useState<boolean>(false); // 마커 클릭 시 인포윈도우 표시 여부
  const [openMap, setOpenMap] = useState<boolean>(false);
  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: lat ?? 37.5666,
    lng: lng ?? 126.979,
  });
  const [address, setAddress] =
    useState<string>("서울특별시 중구 세종대로 110");

  // params.showmap 의 값에 따라서 지도를 열거나 닫음
  useEffect(() => {
    if (!queryParams.showmap) return;

    // 쿼리 파라미터에 showmap이 true일 경우 지도를 열고, false일 경우 지도를 닫음
    setOpenMap(queryParams.showmap === "true");

    if (queryParams.lat && queryParams.lng) {
      setPosition({
        lat: Number(queryParams.lat),
        lng: Number(queryParams.lng),
      });
    }
    if (queryParams.address) {
      setAddress(queryParams.address);
    }
    methods?.setValue("lat", Number(queryParams.lat));
    methods?.setValue("lng", Number(queryParams.lng));
    methods?.setValue("address", queryParams.address);
    methods?.trigger();
  }, [searchParams]);

  // useEffect(() => {
  //   if (params.showmap === "false" || !params.showmap) return;
  //   if (!position.lat || !position.lng) {
  //     // 위치 정보가 없을 경우, 서울 시청을 기본 위치로 설정
  //     setPosition({ lat: lat ?? 37.56682, lng: lng ?? 126.97865 });
  //     // 기본 위치의 주소를 가져옴
  //     fetchAddress(lat ?? 37.56682, lng ?? 126.97865);
  //   } else {
  //     // 현재 위치 정보가 있을 경우, 해당 위치로 설정
  //     setPosition({ lat: position.lat, lng: position.lng });
  //     // 해당 위치의 주소를 가져옴
  //     fetchAddress(position.lat, position.lng);
  //   }
  // }, []);

  // 클릭한 좌표로 주소를 반환하는 함수
  const fetchAddress = async (lat: number, lng: number) => {
    if (!window.kakao) return;
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(lat, lng);
    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const address = result[0]?.address?.address_name;
        addOrUpdateQueryParams({ address });
      }
    });
  };

  // 지도 클릭 이벤트 - 클릭한 위치 좌표 저장
  const mapClick = (mouseEvent: any) => {
    if (queryParams.showmap === "false" || !queryParams.showmap) return; // 지도가 열려있지 않거나 숨겨져있을 경우 - 상세페이지에서 노출중인 경우
    const lat = mouseEvent.latLng.getLat();
    const lng = mouseEvent.latLng.getLng();
    fetchAddress(lat, lng);
    addOrUpdateQueryParams({ lat, lng });
  };

  // 지도 열기 클릭 이벤트 - 쿼리 파라미터에 showmap: true 추가
  const mapOpenClick = () => {
    addOrUpdateQueryParams({ showmap: "true" });
  };

  // 마커 클릭 이벤트 - 마커 클릭 시 주소 정보 가져와서 마커위 인포윈도우에 표시
  const mapMarkerClick = () => {
    fetchAddress(position.lat, position.lng); // 마커 클릭 시 해당 위치의 주소를 가져옴
    setAddress(address);
    setOverPopupVisible(true);
  };

  return {
    position,
    mapClick,
    address,
    openMap,
    setOpenMap,
    setAddress,
    setPosition,
    mapMarkerClick,
    overPopupVisible,
    mapOpenClick,
  };
}
