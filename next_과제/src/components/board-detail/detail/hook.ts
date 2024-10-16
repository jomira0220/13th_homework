import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
// import { DETAIL_FETCH_BOARD } from "@/components/board-detail/queries";
import { FetchBoardDocument } from "@/commons/graphql/graphql";

export const useBoardDetail = () => {
  const params = useParams();
  // 주소에서 값을 가져온 params.id는 문자이므로 Number로 변환해주고
  // FETCH_BOARD 쿼리에 넣어준다.
  const { data, error, loading } = useQuery(FetchBoardDocument, {
    variables: { boardId: String(params.boardId) },
  });
  const detailData = data?.fetchBoard;

  return { detailData, params, error, loading };
};
