"use client";

import { useRouter } from "next/navigation";
import { dateViewSet } from "@/commons/utils/dateViewSet";
import type { TableProps } from "antd";
import type { DataType } from "@/components/board-list/types";
import { useMutation, useQuery, useApolloClient } from "@apollo/client";
import { useCallback, useState } from "react";
import { KeywordActiveString } from "@/commons/ui/keyword-active-string";
import {
  DeleteBoardDocument,
  FetchBoardsListDocument,
  FetchBoardsCountDocument,
  FetchBoardDetailDocument,
  FetchBoardsListQuery,
} from "@/commons/graphql/graphql";
import Icon from "@/components/icon-factory";
import { VideoCameraTwoTone, FileImageTwoTone } from "@ant-design/icons";
import { useSearch } from "@/commons/stores/search-store";
import { useSearchDate } from "@/commons/stores/search-date-store";
import _ from "lodash";

export const useBoardList = () => {
  const router = useRouter();
  const { startDate, endDate } = useSearchDate();
  const { search } = useSearch();
  const [page, setPage] = useState(1);

  const { data, refetch } = useQuery(FetchBoardsListDocument);

  const { data: countData, refetch: countDataRefetch } = useQuery(
    FetchBoardsCountDocument
  );

  const fetchBoardsCount = countData?.fetchBoardsCount; // !게시글 총 갯수

  // ! 페이지 변경시 데이터 다시 불러오기
  const pageChangeHandler = async (page: number) => {
    await refetch({ startDate, endDate, search, page });
    setPage(page);
  };

  // ! 게시글 삭제 처리
  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const postDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    boardId: string
  ) => {
    e.stopPropagation();
    try {
      await deleteBoard({
        variables: { boardId },
        // refetchQueries: [
        //   {
        //     query: FetchBoardsListDocument,
        //     variables: {
        //       page: page,
        //     },
        //   },
        // ],
        update(cache) {
          cache.modify({
            fields: {
              fetchBoards: (prev, { readField }) =>
                // 기존 게시글 리스트는 readField를 이용하여 _id를 비교하여 삭제
                prev.filter(
                  (board: FetchBoardsListQuery) =>
                    readField("_id", board) !== boardId
                ),
            },
          });
        },
      });
      alert("게시글이 삭제되었습니다.");
      refetch();
      // router.refresh();
    } catch (error) {
      alert("게시글 삭제에 실패했습니다.");
      console.log(error);
    }
  };

  // ! 마우스 1초 동안 오버시 게시글 아이템의 상세 내용 미리 리패치 처리
  const client = useApolloClient();
  const prefetchBoardDebounce = _.debounce((boardId: string) => {
    client.query({
      query: FetchBoardDetailDocument,
      variables: { boardId },
    });
  }, 1000);

  // ! 마우스 오버시 삭제버튼 보이기
  const listItemMouseHandler = useCallback(
    (
      e: React.MouseEvent<HTMLTableRowElement>,
      type: string,
      boardId: string
    ) => {
      const target = e.currentTarget;
      const childTarget = target.lastElementChild?.firstElementChild?.classList;

      if (type === "over") {
        childTarget?.add("flex");
        childTarget?.remove("hidden");
        prefetchBoardDebounce(boardId);
      } else {
        childTarget?.add("hidden");
        childTarget?.remove("flex");
      }
    },
    []
  );

  // ! 게시글 상세페이지 이동 처리
  const tableItemOnClick = (postId: string) => {
    router.push(`/boards/${postId}`);
  };

  const dataSource = Array.from({
    length: data?.fetchBoards.length || 0,
  }).map<DataType>((_, idx) => ({
    key: String(idx + 1 + (page - 1) * 10),
    _id: data?.fetchBoards[idx]._id || "",
    title: data?.fetchBoards[idx].title || "",
    writer: data?.fetchBoards[idx].writer || "",
    createdAt: dateViewSet(data?.fetchBoards[idx].createdAt),
    youtubeUrl: data?.fetchBoards[idx].youtubeUrl || "",
    images: data?.fetchBoards[idx].images || [],
  }));

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "번호",
      dataIndex: "key",
      key: "key",
      width: "5%",
      align: "center",
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      render: (value, record) => (
        <div className="flex gap-2">
          <span>
            <KeywordActiveString value={value} />
          </span>
          {record.youtubeUrl && <VideoCameraTwoTone twoToneColor="#ff4848" />}
          {(record.images?.length ?? 0) > 0 && (
            <FileImageTwoTone twoToneColor="#2e53fc" />
          )}
        </div>
      ),
      width: "66%",
    },
    {
      title: "작성자",
      dataIndex: "writer",
      key: "writer",
      width: "10%",
      align: "center",
    },
    {
      title: "날짜",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      align: "center",
    },
    {
      title: "",
      key: "deleteBoard",
      render: (_, record) => (
        <button
          className="items-center justify-center w-full hidden"
          onClick={(e) => postDelete(e, record._id || "")}
        >
          <Icon
            icon="delete"
            className="fill-gray-500 w-5 h-5"
            viewBox="-3 -3 24 24"
          />
        </button>
      ),
      width: "4%",
      align: "center",
    },
  ];

  return {
    data,
    page,
    pageChangeHandler,
    postDelete,
    listItemMouseHandler,
    tableItemOnClick,
    dataSource,
    columns,
    fetchBoardsCount,
    router,
    refetch,
    countDataRefetch,
  };
};
