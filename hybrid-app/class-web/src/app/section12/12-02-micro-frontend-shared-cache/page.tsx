"use client";

import { gql, useApolloClient } from "@apollo/client";

const FETCH_SOLPLACE_LOGS = gql`
  query fetchSolplaceLogs {
    fetchSolplaceLogs {
      id
      title
      contents
    }
  }
`;

export default function MicroFrontEndSharedCachePage() {
  const client = useApolloClient();

  const onClickButton = () => {
    client.query({
      query: FETCH_SOLPLACE_LOGS,
      fetchPolicy: "network-only", // 캐시를 사용하지 않고 서버에서 직접 데이터를 가져옴 - 테스트를 위해서 설정
    });
  };

  return (
    <>
      <div>게시판메뉴</div>
      <button
        onClick={onClickButton}
        className="bg-black text-white p-2 rounded-lg"
      >
        여행로그 게시글 조회하기
      </button>
    </>
  );
}
