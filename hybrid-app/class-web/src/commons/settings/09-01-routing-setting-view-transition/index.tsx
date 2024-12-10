"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoutingSettingViewTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  // useEffect(() => {
  //   // <Link /> (<a />: a태그)를 클릭했다면? 뷰-트랜지션 애니메이션 적용 처리
  //   const viewTransition = (event) => {
  //     // event.preventDefault();
  //     const isAnchor = (event.target as Element).closest("a");
  //     if (isAnchor) {
  //       document.startViewTransition(() => {
  //         router.push(isAnchor.href);
  //       });
  //     }
  //   };

  //   window.addEventListener("click", viewTransition);

  //   return () => {
  //     window.removeEventListener("click", viewTransition);
  //   };
  // }, []);

  return <>{children}</>;
}

/*
01. 방법1 : 비효율적인 방법
document.startViewTransition(() => {
     router.push(event.target.href);
})

02. 방법2: 나만의 커스텀 링크 만들기
a태그를 렌더링하는 컴포넌트를 새로 만들어서 사용하는 방법
*/
