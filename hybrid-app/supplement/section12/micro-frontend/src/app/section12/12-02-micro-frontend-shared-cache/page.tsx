"use client";

import { useApolloClient } from "@apollo/client";

export default function MicroFrontEndSharedCachePage() {
  const client = useApolloClient();

  const onClickCacheCheck = () => {
    alert(JSON.stringify(client.cache.extract())); // 모든 캐시 확인용
  };

  return (
    <>
      <div>내설정메뉴</div>
      <button onClick={onClickCacheCheck}>진짜로 들어왔는지 캐시 확인</button>
    </>
  );
}
