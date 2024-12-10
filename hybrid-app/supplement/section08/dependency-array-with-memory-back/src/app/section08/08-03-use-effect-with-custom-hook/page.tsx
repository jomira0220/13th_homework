"use client";

import { useEffect } from "react";
import { useMyCustomHook } from "./hook";

export default function UseEffectWithCustomHookPage() {
  const { onClickCountCheck } = useMyCustomHook();

  useEffect(() => {
    window.addEventListener("click", onClickCountCheck);

    return () => {
      window.removeEventListener("click", onClickCountCheck);
    };
  }, [onClickCountCheck]); // 컴포넌트는 리렌더되었지만, useEffect는 재실행 안되므로 의존성배열에 넣어줘야함

  return <div>아무데나 클릭하면 카운트를 확인할 수 있어요</div>;
}
