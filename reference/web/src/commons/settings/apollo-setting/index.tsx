"use client";

// import { initMockAPI } from "@/mocks";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import { useEffect, useState } from "react";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { onError } from "@apollo/client/link/error";
import {
  useAccessTokenStore,
  useRefreshTokenStore,
} from "@/commons/stores/token-store";
import { useDeviceSetting } from "../device-setting/hook";
import { getAccessToken } from "@/commons/libraries/get-access-token";
const inMemoryCache = new InMemoryCache();

interface IApolloSetting {
  children: React.ReactNode;
}

export default function ApolloSetting(props: IApolloSetting) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { accessToken, setAccessToken } = useAccessTokenStore();
  const { refreshToken } = useRefreshTokenStore();
  const { fetchApp } = useDeviceSetting();

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === "UNAUTHENTICATED") {
          return fromPromise(
            getAccessToken({ refreshToken }).then((newAccessToken) => {
              if (typeof newAccessToken === "string") {
                setAccessToken(newAccessToken);
                fetchApp({
                  query: "updateDeviceAuthForAccessTokenSet",
                  variables: { accessToken },
                });

                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${newAccessToken}`,
                  },
                });
              }
            })
          ).flatMap(() => forward(operation));
        }
      }
    }
  });
  const uploadLink = createUploadLink({
    uri: "https://main-hybrid.codebootcamp.co.kr/graphql",
    headers: {
      "Apollo-Require-Preflight": "true",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: inMemoryCache,
  });

  // 위 실제 API주소로 요청을 보내는 대신, 미리 준비된 목데이터를 반환하는 환경을 설정합니다.
  // 실 데이터를 보고 싶으면 initMockAPI().then(() => {}) 함수를 무력화시키면 실제 데이터를 볼 수 있습니다.
  // useEffect(() => {
  //   initMockAPI().then(() => {
  //     setIsLoaded(true);
  //   });
  // }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (isLoaded === false) return <></>;

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
