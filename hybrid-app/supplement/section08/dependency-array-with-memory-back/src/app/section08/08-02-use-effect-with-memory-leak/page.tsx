"use client";

import { useEffect, useState } from "react";

export default function UseEffectMemoryLeakPage() {
  const [count, setCount] = useState(0);

  // useState를 통하여 페이지 리랜더링시 셋인터벌을 종료하지 않으면 계속 실행중이기 때문에 계층적으로 쌓이는 메모리 누수를 확인할 수 있다!
  // 그래서 리렌더링시에는 이전에 실행중이던 setInterval을 종료시켜주는 작업이 필요하다.

  useEffect(() => {
    // 1. [문제상황]
    // => 대기하는 기능들(ex: setInterval, addEventListener 등)이 실행중인 상태에서,
    //    페이지가 이동되거나, state가 변경되어 리렌더되거나, useEffect의 의존성 배열을 감지하여 재실행 될 때,
    //    해당 대기하는 기능들은 여전히 작동 중이므로 메모리에서 삭제되지 않음 => 메모리 누수 발생
    const countInterval = setInterval(() => {
      alert(`현재 카운트: ${count}`);
    }, 5000);

    // 2. [해결방법]
    //    => 대기하는 기능들을 useEffect에서 사용할때,
    //       클린업함수(기존의 componentwillUnmount)를 통해 해당 기능을 종료시켜주는 작업이 필요함
    //    useEffect의 return을 통해 재실행시 대기하는 기능이 없도록 처리하여 계층 구조가 발생되지 않도록 메모리 누수 방지

    return () => {
      clearInterval(countInterval);
    };
  }, [count]);

  const onClickCountUp = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <button onClick={onClickCountUp}>카운트 올리기</button>
    </>
  );
}
