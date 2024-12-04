"use client";

import { useDeviceSetting } from "@/commons/settings/05-02-device-setting-redirect/hook"; // 현재 레이아웃에 셋팅된 페이지의 훅인지 확인 필요
import Image from "next/image";
import { useState } from "react";

export default function PictureFullScreenPage() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { fetchApp } = useDeviceSetting();

  const onClickFullScreen = async () => {
    setIsFullScreen(true); // 전체화면보기 상태값 true 저장
    await fetchApp({ query: "toggleDeviceLayoutForNotchTranslucentSet" });
  };

  const onClickClose = async () => {
    setIsFullScreen(false); // 전체화면보기 상태값 false 저장
    await fetchApp({ query: "toggleDeviceLayoutForNotchTranslucentSet" });
  };

  return (
    <>
      {isFullScreen ? (
        <>
          {/* 프로젝트시 모달페이지 만들고 페러렐라우팅하기 */}
          <div className="fixed w-screen h-screen left-0 top-0 z-50 bg-black flex flex-col justify-center items-center">
            {/* 프로젝트시 글로벌 헤더에 hasExit 추가하기 */}
            <button
              className="bg-black text-white rounded-lg p-2 fixed top-10 right-7 z-20"
              onClick={onClickClose}
            >
              닫기
            </button>
            <Image
              src="/images/sample.jpg"
              width={500}
              height={500}
              className="fixed top-0 z-0"
              alt="sample"
            />
          </div>
        </>
      ) : (
        <Image
          src="/images/sample.jpg"
          width={500}
          height={500}
          className="object-cover"
          alt="sample"
        />
      )}

      <button
        className="bg-black text-white rounded-lg p-2"
        onClick={onClickFullScreen}
      >
        사진 전체보기
      </button>
    </>
  );
}
