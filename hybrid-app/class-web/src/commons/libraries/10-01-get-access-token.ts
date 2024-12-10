// main캠프 => commons/lib/26-01-get-access-token.ts

// 1. 쿠키가 제거되었으므로, credentials: "include" 부분을 아래와 같이 변경
export const getAccessToken = ({ refreshToken }) => {
  try {
    const graphQlClient = new GraphQlClient("주소", {
      headers: { Authorization: `Bearer ${refreshToken}` },
      credentials: "include",
    });
    // 하위 동일
  } catch {
    // 동일
  }
};
