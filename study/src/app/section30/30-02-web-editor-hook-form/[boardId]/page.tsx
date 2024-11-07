"use client";

import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function DetailPage() {
  const { boardId } = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId },
  });

  console.log(data);
  return (
    <div>
      <h1>Detail Page</h1>
      <div>작성자: {data?.fetchBoard.writer}</div>
      <div>제목: {data?.fetchBoard.title}</div>
      <div dangerouslySetInnerHTML={{ __html: data?.fetchBoard.contents }} />
    </div>
  );
}
