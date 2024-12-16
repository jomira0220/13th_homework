"use client";

import { useApolloClient, gql } from "@apollo/client";

import { useDeviceSettingMicroFrontendSharedCache } from "../12-02-device-setting-micro-frontend-shared-cache/hook";

export const useApolloSettingMicroFrontendSharedCache = () => {
  const { fetchApp } = useDeviceSettingMicroFrontendSharedCache();
  const client = useApolloClient();

  const onLoadSharedCache = async () => {
    const result = await fetchApp({
      query: "fetchDeviceCacheForApolloSet",
    });
    const entries = Object.entries(result.data.fetchDeviceCacheForApolloSet);
    if (!entries.length) return;

    // 공유해야할 캐시가 있으면 아래 실행
    // operationName은 중복을 막기 위한 key 관리용 값
    entries.map(([operationName, { printedQuery, data }]) => {
      client.writeQuery({
        query: gql`
          ${printedQuery}
        `,
        data,
      });
    });
  };

  const onLoadSharedToken = async () => {
    const accessToken = await fetchApp({
      query: "fetchDeviceAuthForAccessTokenSet",
    });
    const refreshToken = await fetchApp({
      query: "fetchDeviceAuthForRefreshTokenSet",
    });
    // setAccessToken(accessToken);
    // setRefreshToken(refreshToken);
  };

  return {
    onLoadSharedCache,
    onLoadSharedToken,
  };
};
