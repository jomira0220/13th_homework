"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { print } from "graphql";
import { useDeviceSettingMicroFrontendSharedCache } from "../12-02-device-setting-micro-frontend-shared-cache/hook";

const GLOBAL_STORAGE = new InMemoryCache();

export default function ApolloSettingMicroFrontendSharedCache({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchApp } = useDeviceSettingMicroFrontendSharedCache();

  const deviceLink = new ApolloLink((operation, forward) => {
    // 1. 요청해줘!
    return forward(operation).map((response) => {
      // 2. 응답 처리해줘!
      const operationName = operation.operationName; //api 이름
      const isSharedCache = operationName === "fetchSolplaceLogs"; // 캐시를 공유해야 하는 api 인지 확인
      if (isSharedCache) {
        // 앱에게 캐시를 전달
        fetchApp({
          query: "createDeviceCacheForApolloSet",
          variables: {
            operationName,
            variables: operation.variables,
            printedQuery: print(operation.query), // print 함수를 사용해서 graphql의 query문을 문자열로 변환하여 전달
            data: response.data, // 결과로 받은 데이터를 보내기
          },
        });
      }
      return response;
    });
  });

  const httpLink = new HttpLink({
    uri: "https://main-hybrid.codebootcamp.co.kr/graphql",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([deviceLink, httpLink]),
    cache: GLOBAL_STORAGE,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
