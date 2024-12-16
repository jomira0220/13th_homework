import { useState } from "react";

export const useDeviceCache = (onResponse) => {
  const [apolloCache, setApolloCache] = useState({});

  const createDeviceCacheForApolloSet = (variables) => {
    const { operationName, printedQuery, data } = variables; // 웹에서 전달받은 데이터 구조 분해
    // 앱의 스테이트에 저장
    setApolloCache((prev) => ({
      ...prev,
      [operationName]: {
        printedQuery,
        data,
      },
    }));

    onResponse({
      createDeviceCacheForApolloSet: {
        message: "저장완료",
      },
    });
  };

  // 저장된 캐시를 웹에 전달
  const fetchDeviceCacheForApolloSet = () => {
    onResponse({
      fetchDeviceCacheForApolloSet: apolloCache,
    });
  };

  return {
    createDeviceCacheForApolloSet,
    fetchDeviceCacheForApolloSet,
  };
};
