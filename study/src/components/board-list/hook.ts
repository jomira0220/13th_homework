import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import {
  LIST_DELETE_BOARD,
  LIST_FETCH_BOARDS,
} from "@/components/board-list/queries";

export const useBoardList = () => {
  const router = useRouter();
  const params = useParams();
  // console.log(params);

  const { data } = useQuery(FETCH_BOARDS, {
    variables: {
      endDate: "2024-10-30T18:54:33Z",
      startDate: "2021-09-03T09:54:33Z",
      search: "",
      page: Number(params.pageNum) || 1,
    },
  });
  // console.log(params.pageNum, data?.fetchBoards);

  const [deleteBoard] = useMutation(DELETE_BOARD);
  const postDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    postId: string
  ) => {
    console.log(postId);
    e.stopPropagation();
    try {
      await deleteBoard({
        variables: {
          boardId: postId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARDS,
          },
        ],
      });
      alert("게시글이 삭제되었습니다.");
      // router.refresh();
    } catch (error) {
      alert("게시글 삭제에 실패했습니다.");
      console.log(error);
    }
  };

  const listItemMouseHandler = (
    e: React.MouseEvent<HTMLTableRowElement>,
    type: string
  ) => {
    const target = e.currentTarget;
    const childTarget =
      target.lastElementChild?.firstElementChild?.firstElementChild?.classList;
    if (type === "over") {
      childTarget?.remove("hidden");
    } else {
      childTarget?.add("hidden");
    }
  };

  const detailPageHandler = (
    e: React.MouseEvent<HTMLTableRowElement>,
    postId: string
  ) => {
    // console.log("detail", postId);
    router.push(`/boards/${postId}`);
  };

  return { data, postDelete, listItemMouseHandler, detailPageHandler };
};
