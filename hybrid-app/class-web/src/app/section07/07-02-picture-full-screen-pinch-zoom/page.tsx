"use client";

import { useDeviceSetting } from "@/commons/settings/05-02-device-setting-redirect/hook"; // 현재 레이아웃에 셋팅된 페이지의 훅인지 확인 필요
import Image from "next/image";
import { useState } from "react";

export default function PictureFullScreenPinchZoomPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { fetchApp } = useDeviceSetting();

  // 사진 전체보기 클릭 이벤트
  const onClickFullScreen = () => {
    // 로딩 처리하기
    setIsLoading(true);

    //! 같은 함수내에서 실행 순서를 조정하기 위한 수단으로 window.setTimeout 사용
    //! (콜스택 처리 방식에 대한 이해 필요 - 매크로큐(setTimeout, setInterval ...), 마이크로큐)
    //! 다음 틱으로 넘기기 위해 0ms로 설정

    window.setTimeout(() => {
      setIsFullScreen(true); // 전체화면보기 상태값 true 저장
      fetchApp({ query: "toggleDeviceLayoutForNotchTranslucentSet" }); // 노치 겹침 가능하도록 설정 변경
      fetchApp({ query: "toggleDeviceLayoutForPinchZoomSet" }); // 핀치 줌 가능 하도록 설정 변경 - 안드로이드만 됨

      // ios에서 전체보기 클릭 시 핀치 줌 가능 하도록 설정 변경 처리를 위해 meta viewport 설정 변경 필요
      document
        .querySelector("meta[name=viewport]")
        ?.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=3.0, user-scalable=yes"
        );

      window.setTimeout(() => {
        // 로딩 해제하기
        setIsLoading(false);
      }, 100);
    }, 100);
  };

  // 사진 전체보기 닫기 클릭 이벤트
  const onClickClose = async () => {
    setIsLoading(true); // 로딩 처리하기

    window.setTimeout(() => {
      setIsFullScreen(false); // 전체화면보기 상태값 false 저장
      fetchApp({ query: "toggleDeviceLayoutForNotchTranslucentSet" }); // 노치 겹침 불가능 하도록 설정 변경
      fetchApp({ query: "toggleDeviceLayoutForPinchZoomSet" }); // 핀치 줌 불가능 하도록 설정 변경

      // ios에서 전체보기 클릭 시 핀치 줌 불가능 하도록 설정 변경 처리를 위해 meta viewport 설정 변경 필요
      document
        .querySelector("meta[name=viewport]")
        ?.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0, minimum-scale=1.0 maximum-scale=1.0, user-scalable=no"
        );

      window.setTimeout(() => {
        setIsLoading(false); // 로딩 해제하기
      }, 100);
    }, 100);
  };

  if (isLoading) return <></>;

  return (
    <>
      {isFullScreen ? (
        <>
          {/* 프로젝트시 모달페이지 만들고 페러렐라우팅하기 */}
          <div className="fixed w-screen h-screen left-0 top-0 z-50 bg-gray-500 flex flex-col justify-center items-center">
            {/* 프로젝트시 글로벌 헤더에 hasExit 추가하기 */}
            <button
              className="bg-blue-600 text-white rounded-lg p-2 fixed top-10 right-7 z-20"
              onClick={onClickClose}
            >
              닫기
            </button>
            <Image
              src="/images/dog.jpg"
              width={500}
              height={500}
              alt="sample"
              className="object-cover"
            />
          </div>
        </>
      ) : (
        <Image
          src="/images/dog.jpg"
          width={500}
          height={500}
          alt="sample"
          className="object-cover"
        />
      )}

      <button
        className="bg-blue-600 text-white rounded-lg p-2"
        onClick={onClickFullScreen}
      >
        사진 전체보기
      </button>
    </>
  );
}
