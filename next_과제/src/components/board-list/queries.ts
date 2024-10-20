import { gql } from "@apollo/client";

export const LIST_FETCH_BOARDS = gql`
  query fetchBoardsList(
    $endDate: DateTime
    $startDate: DateTime
    $search: String
    $page: Int
  ) {
    fetchBoards(
      endDate: $endDate
      startDate: $startDate
      search: $search
      page: $page
    ) {
      _id
      writer
      title
      createdAt
      images
      youtubeUrl
    }
  }
`;

export const LIST_DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export const LIST_FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount(
    $endDate: DateTime
    $startDate: DateTime
    $search: String
  ) {
    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)
  }
`;
