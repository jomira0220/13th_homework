/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation logoutUser {\n    logoutUser\n  }\n": types.LogoutUserDocument,
    "\n  query fetchPointTransactions($search: String, $page: Int) {\n    fetchPointTransactions(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct\n      # user\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchPointTransactionsDocument,
    "\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      # travelproductAddress\n      # buyer\n      # seller\n      soldAt\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchTravelproductsDocument,
    "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n        picture\n        # userPoint\n        # createdAt\n        # updatedAt\n        # deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  mutation deleteBoardComment($password: String, $boardCommentId: ID!) {\n    deleteBoardComment(password: $password, boardCommentId: $boardCommentId)\n  }\n": types.DeleteBoardCommentDocument,
    "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n    }\n  }\n": types.UpdateBoardCommentDocument,
    "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      # user {\n      #   picture\n      #   email\n      #   name\n      # }\n      # createdAt\n      # updatedAt\n      # deletedAt\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardDetailDocument,
    "\n  query fetchBoardsList(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n    $page: Int\n  ) {\n    fetchBoards(\n      endDate: $endDate\n      startDate: $startDate\n      search: $search\n      page: $page\n    ) {\n      _id\n      writer\n      title\n      createdAt\n      images\n      youtubeUrl\n    }\n  }\n": types.FetchBoardsListDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  query fetchBoardsCount(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n  ) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n": types.FetchBoardsCountDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      _id\n      url\n    }\n  }\n": types.UploadFileDocument,
    "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardDocument,
    "\n  query fetchBoardsOfTheBest {\n    fetchBoardsOfTheBest {\n      _id\n      title\n      images\n      user {\n        picture\n        name\n      }\n      writer\n      createdAt\n      likeCount\n    }\n  }\n": types.FetchBoardsOfTheBestDocument,
    "\n  query fetchBoardLikeCount($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      likeCount\n      dislikeCount\n    }\n  }\n": types.FetchBoardLikeCountDocument,
    "\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n": types.LikeBoardDocument,
    "\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n": types.DislikeBoardDocument,
    "\n  query fetchPointTransactionsOfBuying($search: String, $page: Int) {\n    fetchPointTransactionsOfBuying(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchPointTransactionsOfBuyingDocument,
    "\n  query fetchPointTransactionsCountOfBuying {\n    fetchPointTransactionsCountOfBuying\n  }\n": types.FetchPointTransactionsCountOfBuyingDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation logoutUser {\n    logoutUser\n  }\n"): (typeof documents)["\n  mutation logoutUser {\n    logoutUser\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchPointTransactions($search: String, $page: Int) {\n    fetchPointTransactions(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct\n      # user\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchPointTransactions($search: String, $page: Int) {\n    fetchPointTransactions(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct\n      # user\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      # travelproductAddress\n      # buyer\n      # seller\n      soldAt\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      # travelproductAddress\n      # buyer\n      # seller\n      soldAt\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n        picture\n        # userPoint\n        # createdAt\n        # updatedAt\n        # deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        email\n        name\n        picture\n        # userPoint\n        # createdAt\n        # updatedAt\n        # deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoardComment($password: String, $boardCommentId: ID!) {\n    deleteBoardComment(password: $password, boardCommentId: $boardCommentId)\n  }\n"): (typeof documents)["\n  mutation deleteBoardComment($password: String, $boardCommentId: ID!) {\n    deleteBoardComment(password: $password, boardCommentId: $boardCommentId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      # user {\n      #   picture\n      #   email\n      #   name\n      # }\n      # createdAt\n      # updatedAt\n      # deletedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoardComment(\n    $createBoardCommentInput: CreateBoardCommentInput!\n    $boardId: ID!\n  ) {\n    createBoardComment(\n      createBoardCommentInput: $createBoardCommentInput\n      boardId: $boardId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      # user {\n      #   picture\n      #   email\n      #   name\n      # }\n      # createdAt\n      # updatedAt\n      # deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsList(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n    $page: Int\n  ) {\n    fetchBoards(\n      endDate: $endDate\n      startDate: $startDate\n      search: $search\n      page: $page\n    ) {\n      _id\n      writer\n      title\n      createdAt\n      images\n      youtubeUrl\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardsList(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n    $page: Int\n  ) {\n    fetchBoards(\n      endDate: $endDate\n      startDate: $startDate\n      search: $search\n      page: $page\n    ) {\n      _id\n      writer\n      title\n      createdAt\n      images\n      youtubeUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsCount(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n  ) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n"): (typeof documents)["\n  query fetchBoardsCount(\n    $endDate: DateTime\n    $startDate: DateTime\n    $search: String\n  ) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      _id\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      _id\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard(\n    $updateBoardInput: UpdateBoardInput!\n    $password: String\n    $boardId: ID!\n  ) {\n    updateBoard(\n      updateBoardInput: $updateBoardInput\n      password: $password\n      boardId: $boardId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      likeCount\n      dislikeCount\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      user {\n        picture\n        deletedAt\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsOfTheBest {\n    fetchBoardsOfTheBest {\n      _id\n      title\n      images\n      user {\n        picture\n        name\n      }\n      writer\n      createdAt\n      likeCount\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardsOfTheBest {\n    fetchBoardsOfTheBest {\n      _id\n      title\n      images\n      user {\n        picture\n        name\n      }\n      writer\n      createdAt\n      likeCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardLikeCount($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      likeCount\n      dislikeCount\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardLikeCount($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      likeCount\n      dislikeCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchPointTransactionsOfBuying($search: String, $page: Int) {\n    fetchPointTransactionsOfBuying(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchPointTransactionsOfBuying($search: String, $page: Int) {\n    fetchPointTransactionsOfBuying(search: $search, page: $page) {\n      _id\n      impUid\n      amount\n      balance\n      status\n      statusDetail\n      # travelproduct {\n      #   _id\n      #   name\n      #   remarks\n      #   contents\n      #   price\n      #   tags\n      #}\n      user {\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchPointTransactionsCountOfBuying {\n    fetchPointTransactionsCountOfBuying\n  }\n"): (typeof documents)["\n  query fetchPointTransactionsCountOfBuying {\n    fetchPointTransactionsCountOfBuying\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;