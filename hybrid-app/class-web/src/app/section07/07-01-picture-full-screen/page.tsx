"use client";

import { useDeviceSetting } from "@/commons/settings/05-02-device-setting-redirect/hook"; // 현재 레이아웃에 셋팅된 페이지의 훅인지 확인 필요
import Image from "next/image";
import { useState } from "react";

export default function PictureFullScreenPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { fetchApp } = useDeviceSetting();

  const onClickFullScreen = () => {
    // 로딩 처리하기
    setIsLoading(true);

    //! 같은 함수내에서 실행 순서를 조정하기 위한 수단으로 window.setTimeout 사용
    //! (콜스택 처리 방식에 대한 이해 필요 - 매크로큐(setTimeout, setInterval ...), 마이크로큐)
    //! 다음 틱으로 넘기기 위해 0ms로 설정

    window.setTimeout(() => {
      setIsFullScreen(true); // 전체화면보기 상태값 true 저장
      fetchApp({ query: "toggleDeviceLayoutForNotchTranslucentSet" });

      window.setTimeout(() => {
        // 로딩 해제하기
        setIsLoading(false);
      }, 100);
    }, 0);
  };

  const onClickClose = async () => {
    setIsFullScreen(false); // 전체화면보기 상태값 false 저장
    await fetchApp({ query: "toggleDeviceLayoutForNotchTranslucentSet" });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-2xl w-screen h-screen"></div>
    );
  }
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
