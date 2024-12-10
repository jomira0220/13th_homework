"use client";

import { useEffect, useState } from "react";

export const useMyCustomHook = () => {
  const [count, setCount] = useState(0);
  console.log(`현재카운트: ${count}`);

  const onClickCountCheck = () => {
    alert(`현재카운트: ${count}`);
  };

  useEffect(() => {
    setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  }, []); // 초기에만 실행

  return {
    onClickCountCheck,
  };
};
